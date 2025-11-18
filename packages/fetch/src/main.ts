/**
 * @module @alwatr/fetch
 *
 * An enhanced, lightweight, and dependency-free wrapper for the native `fetch`
 * API. It provides modern features like caching strategies, request retries,
 * timeouts, and duplicate request handling.
 */

import {_processOptions, handleCacheStrategy_, logger_, cacheSupported} from './core.js';
import {FetchError} from './error.js';

import type {FetchJsonOptions, FetchOptions, FetchResponse} from './type.js';

export {cacheSupported};
export * from './error.js';
export type * from './type.js';

/**
 * An enhanced wrapper for the native `fetch` function.
 *
 * This function extends the standard `fetch` with additional features such as:
 * - **Timeout**: Aborts the request if it takes too long.
 * - **Retry Pattern**: Automatically retries the request on failure (e.g., server errors or network issues).
 * - **Duplicate Request Handling**: Prevents sending multiple identical requests in parallel.
 * - **Cache Strategies**: Provides various caching mechanisms using the browser's Cache API.
 * - **Simplified API**: Offers convenient options for adding query parameters, JSON bodies, and auth tokens.
 *
 * @see {@link FetchOptions} for a detailed list of available options.
 *
 * @param {string} url - The URL to fetch.
 * @param {FetchOptions} options - Optional configuration for the fetch request.
 * @returns {Promise<FetchResponse>} A promise that resolves to a tuple. On
 * success, it returns `[response, null]`. On failure, it returns `[null,
 * FetchError]`.
 *
 * @example
 * ```typescript
 * import {fetch} from '@alwatr/fetch';
 *
 * async function fetchProducts() {
 *   const [response, error] = await fetch('/api/products', {
 *     queryParams: { limit: 10 },
 *     timeout: 5_000,
 *   });
 *
 *   if (error) {
 *     console.error('Request failed:', error.reason);
 *     return;
 *   }
 *
 *   // At this point, response is guaranteed to be valid and ok.
 *   const data = await response.json();
 *   console.log('Products:', data);
 * }
 *
 * fetchProducts();
 * ```
 */
export async function fetch(url: string, options: FetchOptions = {}): Promise<FetchResponse> {
  logger_.logMethodArgs?.('fetch', {url, options});

  const options_ = _processOptions(url, options);

  try {
    // Start the fetch lifecycle, beginning with the cache strategy.
    const response = await handleCacheStrategy_(options_);

    if (!response.ok) {
      throw new FetchError('http_error', `HTTP error! status: ${response.status} ${response.statusText}`, response);
    }

    return [response, null];
  }
  catch (err) {
    let error: FetchError;

    if (err instanceof FetchError) {
      error = err;

      if (error.response !== undefined && error.data === undefined) {
        const bodyText = await error.response.text().catch(() => '');

        if (bodyText.trim().length > 0) {
          try {
            // Try to parse as JSON
            error.data = JSON.parse(bodyText);
          }
          catch {
            error.data = bodyText;
          }
        }
      }
    }
    else if (err instanceof Error) {
      if (err.name === 'AbortError') {
        error = new FetchError('aborted', err.message);
      }
      else {
        error = new FetchError('network_error', err.message);
      }
    }
    else {
      error = new FetchError('unknown_error', String(err ?? 'unknown_error'));
    }

    logger_.error('fetch', error.reason, {error});
    return [null, error];
  }
}
