import {delay} from '@alwatr/delay';
import {HttpStatusCodes} from '@alwatr/http-primer';
import {FetchError} from './error.js';
import {globalThis_, logger_} from './options.js';
import {handleTimeout_} from './timeout.js';

import type {FetchOptions__} from './type.js';

/**
 * Implements a retry mechanism for the fetch request.
 * If the request fails due to a server error (status >= 500) or a timeout,
 * it will be retried up to the specified number of times.
 *
 * @param {FetchOptions__} options - The fully configured fetch options.
 * @returns {Promise<Response>} A promise that resolves to the final `Response` after all retries.
 * @private
 */
export async function handleRetryPattern_(options: FetchOptions__): Promise<Response> {
  if (!(options.retry > 1)) {
    return handleTimeout_(options);
  }
  // else

  DEV_MODE && logger_.logMethod?.('handleRetryPattern_');
  options.retry--;

  const externalAbortSignal = options.signal;

  try {
    const response = await handleTimeout_(options);

    if (!response.ok && response.status >= HttpStatusCodes.Error_Server_500_Internal_Server_Error) {
      // only retry for server errors (5xx)
      throw new FetchError('http_error', `HTTP error! status: ${response.status} ${response.statusText}`, response);
    }

    return response;
  } catch (err) {
    DEV_MODE && logger_.accident('fetch', 'fetch_failed_retry', err);

    // Do not retry if the browser is offline.
    if (globalThis_.navigator?.onLine === false) {
      DEV_MODE && logger_.accident('handleRetryPattern_', 'offline', 'Skip retry because offline');
      throw err;
    }

    await delay.by(options.retryDelay);

    // Restore the original signal for the next attempt.
    options.signal = externalAbortSignal;
    return handleRetryPattern_(options);
  }
}
