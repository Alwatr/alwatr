import {FetchError, httpStatusToErrorReason} from './error.js';
import {handleCacheStrategy_} from './cache.js';
import {processOptions_, logger_} from './options.js';

import type {FetchJsonOptions, FetchJsonResponse, FetchOptions, FetchResponse} from './type.js';

/**
 * An enhanced wrapper for the native `fetch` function.
 *
 * Provides:
 * - **Deterministic Errors**: Semantic `FetchError` reasons (e.g. `unauthorized`, `forbidden`, `not_found`, `server_error`, `timeout`, `aborted`, `rate_limited`).
 * - **Go-Style Tuple Return**: Never throws, returns `[response, null]` on success or `[null, FetchError]` on failure.
 * - **Automatic Timeout**: Aborts the request if it exceeds `timeout` duration.
 * - **Configurable Retry**: Automatically retries transient 5xx, 429, 408, or network errors with `retryDelay` and `Retry-After` support.
 * - **Parallel Deduplication**: Collapses identical concurrent in-flight requests.
 * - **Cache Strategies**: Integrates with Cache API (`cache_first`, `stale_while_revalidate`, etc.).
 * - **Isolated Headers & Query Params**: Safely formats query parameters and authorization credentials without mutating caller objects.
 *
 * @param url - The URL to fetch.
 * @param options - Configuration options for the fetch request.
 * @returns A promise resolving to `[Response, null]` on success, or `[null, FetchError]` on failure.
 *
 * @example
 * ```typescript
 * import {fetch} from '@alwatr/fetch';
 *
 * const [response, error] = await fetch('/api/products', {
 *   queryParams: { limit: 10 },
 *   timeout: '5s',
 * });
 *
 * if (error) {
 *   if (error.reason === 'not_found') {
 *     console.warn('Product not found');
 *   }
 *   return;
 * }
 *
 * const data = await response.json();
 * ```
 */
export async function fetch(url: string, options: FetchOptions = {}): Promise<FetchResponse> {
  const options_ = processOptions_(url, options);
  DEV_MODE && logger_.logMethodArgs?.('fetch', options_);

  try {
    const response = await handleCacheStrategy_(options_);

    if (!response.ok) {
      const reason = httpStatusToErrorReason(response.status);
      throw new FetchError(reason, `HTTP error! status: ${response.status} ${response.statusText}`, response);
    }

    return [response, null];
  } catch (err) {
    let error: FetchError;

    if (err instanceof FetchError) {
      error = err;

      if (error.response !== undefined && error.data === undefined) {
        const bodyText = await error.response.text().catch(() => '');

        if (bodyText.trim().length > 0) {
          try {
            error.data = JSON.parse(bodyText);
          } catch {
            error.data = bodyText;
          }
        }
      }
    } else if (err instanceof Error) {
      if (err.name === 'AbortError') {
        error = new FetchError('aborted', err.message);
      } else {
        error = new FetchError('network_error', err.message);
      }
    } else {
      error = new FetchError('unknown_error', String(err ?? 'unknown_error'));
    }

    DEV_MODE && logger_.error('fetch', error.reason, {error});
    return [null, error];
  }
}

/**
 * An enhanced wrapper for `fetch` that automatically parses JSON responses.
 *
 * Accepts unconstrained generic interfaces, DTOs, and arrays without requiring index signatures.
 *
 * @template T - The expected type of the JSON response payload.
 *
 * @param url - The URL to fetch.
 * @param options - Configuration options for the fetch request.
 * @returns A promise resolving to `[data, null]` where data is typed as `T`, or `[null, FetchError]`.
 *
 * @example
 * ```typescript
 * import {fetchJson} from '@alwatr/fetch';
 *
 * interface User {
 *   id: string;
 *   name: string;
 * }
 *
 * const [users, error] = await fetchJson<User[]>('/api/users');
 * if (error) {
 *   console.error('Failed to load users:', error.reason);
 *   return;
 * }
 * console.log('Users count:', users.length);
 * ```
 */
export async function fetchJson<T = unknown>(
  url: string,
  options: FetchJsonOptions = {},
): Promise<FetchJsonResponse<T>> {
  DEV_MODE && logger_.logMethod?.('fetchJson');

  const [response, error] = await fetch(url, options);

  if (error) {
    return [null, error];
  }

  const bodyText = await response.text().catch(() => '');
  if (bodyText.trim().length === 0) {
    const parseError = new FetchError(
      'json_parse_error',
      'Response body is empty, cannot parse JSON',
      response,
      bodyText,
    );
    DEV_MODE && logger_.error('fetchJson', parseError.reason, {error: parseError});
    return [null, parseError];
  }

  try {
    const data = JSON.parse(bodyText) as T;

    if (
      options.requireJsonResponseWithOkTrue
      && (typeof data !== 'object' || data === null || (data as Record<string, unknown>).ok !== true)
    ) {
      const parseError = new FetchError(
        'json_response_error',
        'Response JSON "ok" property is not true',
        response,
        data,
      );
      DEV_MODE && logger_.error('fetchJson', parseError.reason, {error: parseError});
      return [null, parseError];
    }

    return [data, null];
  } catch (err) {
    const parseError = new FetchError(
      'json_parse_error',
      err instanceof Error ? err.message : 'Failed to parse JSON response',
      response,
      bodyText,
    );
    DEV_MODE && logger_.error('fetchJson', parseError.reason, {error: parseError});
    return [null, parseError];
  }
}

fetchJson.version = fetch.version = __package_version__;
