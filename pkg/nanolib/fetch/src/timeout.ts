import {parseDuration} from '@alwatr/parse-duration';
import {FetchError} from './error.js';
import {globalThis_, logger_} from './options.js';

import type {FetchOptions__} from './type.js';

/**
 * Wraps the native fetch call with a timeout mechanism.
 *
 * It uses an `AbortController` to abort the request if it does not complete
 * within the specified `timeout` duration. It also respects external abort signals.
 *
 * @param {FetchOptions__} options - The fully configured fetch options.
 * @returns {Promise<Response>} A promise that resolves with the `Response` or rejects on timeout.
 * @private
 */
export function handleTimeout_(options: FetchOptions__): Promise<Response> {
  if (options.timeout === 0) {
    // If timeout is disabled, call fetch directly.
    return globalThis_.fetch(options.url, options);
  }

  DEV_MODE && logger_.logMethod?.('handleTimeout_');

  return new Promise((resolved, reject) => {
    const abortController = typeof AbortController === 'function' ? new AbortController() : null;
    const externalAbortSignal = options.signal;
    options.signal = abortController?.signal;

    // If an external AbortSignal is provided, listen to it and propagate the abort.
    if (abortController !== null && externalAbortSignal != null) {
      externalAbortSignal.addEventListener('abort', () => abortController.abort(), {once: true});
    }

    const timeoutId = setTimeout(() => {
      reject(new FetchError('timeout', 'fetch_timeout'));
      abortController?.abort('fetch_timeout');
    }, parseDuration(options.timeout!));

    globalThis_
      .fetch(options.url, options)
      .then((response) => resolved(response))
      .catch((reason) => reject(reason))
      .finally(() => {
        // Clean up the timeout to prevent it from firing after the request has completed.
        clearTimeout(timeoutId);
      });
  });
}
