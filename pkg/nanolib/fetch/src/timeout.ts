import {getGlobalThis} from '@alwatr/global-this';
import {FetchError} from './error.js';
import {logger_} from './options.js';

import type {InternalFetchOptions_} from './type.js';

const globalThis_ = getGlobalThis();

/**
 * Executes a native `fetch` wrapped with an `AbortController` timeout.
 *
 * Checks for pre-aborted external signals, respects external cancellation,
 * and guarantees listener and timer cleanup on completion.
 *
 * @param options - Processed internal fetch options.
 * @returns A promise resolving to the native `Response` or rejecting with `FetchError`.
 * @internal
 */
export function handleTimeout_(options: InternalFetchOptions_): Promise<Response> {
  const externalSignal = options.signal;

  // Immediate abort check: If signal is already aborted, reject immediately without network overhead
  if (externalSignal?.aborted) {
    DEV_MODE && logger_.incident?.('handleTimeout_', 'already_aborted', {reason: externalSignal.reason});
    return Promise.reject(new FetchError('aborted', 'The operation was aborted'));
  }

  // If timeout is disabled (0), invoke native fetch directly with external signal
  if (options.timeout === 0) {
    return globalThis_.fetch(options.url, options as RequestInit);
  }

  DEV_MODE && logger_.logMethod?.('handleTimeout_');

  return new Promise((resolve, reject) => {
    const abortController = typeof AbortController === 'function' ? new AbortController() : null;

    let onExternalAbort: (() => void) | undefined;

    if (abortController !== null) {
      options.signal = abortController.signal;

      if (externalSignal != null) {
        onExternalAbort = () => {
          abortController.abort(externalSignal.reason);
        };
        externalSignal.addEventListener('abort', onExternalAbort, {once: true});
      }
    }

    let timeoutFired = false;

    const timeoutId = setTimeout(() => {
      timeoutFired = true;
      abortController?.abort('fetch_timeout');
      reject(new FetchError('timeout', 'fetch_timeout'));
    }, options.timeout);

    globalThis_
      .fetch(options.url, options as RequestInit)
      .then((response) => {
        if (!timeoutFired) {
          resolve(response);
        }
      })
      .catch((err: unknown) => {
        if (timeoutFired) {
          return;
        }

        if (externalSignal?.aborted || (err instanceof Error && err.name === 'AbortError')) {
          reject(new FetchError('aborted', 'The operation was aborted'));
        } else {
          reject(err);
        }
      })
      .finally(() => {
        clearTimeout(timeoutId);
        options.signal = externalSignal;
        if (externalSignal != null && onExternalAbort !== undefined) {
          externalSignal.removeEventListener('abort', onExternalAbort);
        }
      });
  });
}
