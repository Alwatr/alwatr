import {delay} from '@alwatr/delay';
import {getGlobalThis} from '@alwatr/global-this';
import {HttpStatusCodes} from '@alwatr/http-primer';
import {FetchError} from './error.js';
import {logger_} from './options.js';
import {handleTimeout_} from './timeout.js';

import type {InternalFetchOptions_} from './type.js';

const globalThis_ = getGlobalThis();

/**
 * Checks whether an HTTP response status code is retryable.
 *
 * Retryable statuses:
 * - Any 5xx Server Error (500, 502, 503, 504, ...)
 * - 408 Request Timeout
 * - 429 Too Many Requests
 */
export function isRetryableStatus_(status: number): boolean {
  return (
    status >= HttpStatusCodes.Error_Server_500_Internal_Server_Error
    || status === HttpStatusCodes.Error_Client_408_Request_Timeout
    || status === HttpStatusCodes.Error_Client_429_Too_Many_Requests
  );
}

/**
 * Parses the `Retry-After` header value (in seconds or HTTP-date) if present.
 *
 * @param response - The HTTP Response object.
 * @returns Delay duration in milliseconds, or undefined if absent/invalid.
 */
export function parseRetryAfterHeader_(response?: Response): number | undefined {
  const retryAfter = response?.headers?.get('retry-after');
  if (!retryAfter) return undefined;

  const seconds = Number(retryAfter);
  if (!isNaN(seconds) && seconds > 0) {
    return seconds * 1000;
  }

  const dateMs = Date.parse(retryAfter);
  if (!isNaN(dateMs)) {
    const diff = dateMs - Date.now();
    return diff > 0 ? diff : 0;
  }

  return undefined;
}

/**
 * Executes a fetch request with automatic retries on transient errors (5xx, 429, 408, network failures, timeouts).
 *
 * @param options - Processed internal fetch options.
 * @returns A promise resolving to the final `Response` after retry cycles.
 * @internal
 */
export async function handleRetryPattern_(options: InternalFetchOptions_): Promise<Response> {
  if (options.retry <= 1) {
    return handleTimeout_(options);
  }

  DEV_MODE && logger_.logMethod?.('handleRetryPattern_');
  options.retry--;

  const externalAbortSignal = options.signal;

  let response: Response;
  try {
    response = await handleTimeout_(options);

    if (response.ok || !isRetryableStatus_(response.status)) {
      return response;
    }
  } catch (err) {
    DEV_MODE && logger_.accident('fetch', 'fetch_failed_retry', err);

    // Never retry if the request was intentionally aborted
    if (externalAbortSignal?.aborted || (err instanceof FetchError && err.reason === 'aborted')) {
      throw err;
    }

    // Do not retry if the runtime is offline
    if (globalThis_.navigator?.onLine === false) {
      DEV_MODE && logger_.accident('handleRetryPattern_', 'offline', 'Skip retry because offline');
      throw err;
    }

    await delay.by(options.retryDelay);

    // Restore original signal for subsequent attempts
    options.signal = externalAbortSignal;
    return handleRetryPattern_(options);
  }

  // Handle transient retryable HTTP status (5xx, 429, 408)
  DEV_MODE && logger_.accident('fetch', 'fetch_failed_retry', {status: response.status});

  if (globalThis_.navigator?.onLine === false) {
    DEV_MODE && logger_.accident('handleRetryPattern_', 'offline', 'Skip retry because offline');
    return response;
  }

  const retryDelay = parseRetryAfterHeader_(response) ?? options.retryDelay;

  await delay.by(retryDelay);

  options.signal = externalAbortSignal;
  return handleRetryPattern_(options);
}
