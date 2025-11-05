/**
 * @module @alwatr/fetch
 *
 * An enhanced, lightweight, and dependency-free wrapper for the native `fetch`
 * API. It provides modern features like caching strategies, request retries,
 * timeouts, and duplicate request handling.
 */

import {delay} from '@alwatr/delay';
import {getGlobalThis} from '@alwatr/global-this';
import {hasOwn} from '@alwatr/has-own';
import {HttpStatusCodes, MimeTypes} from '@alwatr/http-primer';
import {createLogger} from '@alwatr/logger';
import {parseDuration} from '@alwatr/parse-duration';

import {FetchError} from './error.js';

import type {AlwatrFetchOptions_, FetchOptions, FetchResponse} from './type.js';

export {cacheSupported};
export type * from './type.js';
export * from './error.js';

const logger_ = createLogger('@alwatr/fetch');
const globalThis_ = getGlobalThis();

/**
 * A boolean flag indicating whether the browser's Cache API is supported.
 */
const cacheSupported = /* #__PURE__ */ hasOwn(globalThis_, 'caches');

/**
 * A simple in-memory storage for tracking and managing duplicate in-flight requests.
 * The key is a unique identifier for the request (e.g., method + URL + body),
 * and the value is the promise of the ongoing fetch operation.
 */
const duplicateRequestStorage_: Record<string, Promise<Response>> = {};

/**
 * Default options for all fetch requests. These can be overridden by passing
 * a custom `options` object to the `fetch` function.
 */
const defaultFetchOptions: AlwatrFetchOptions_ = {
  method: 'GET',
  headers: {},
  timeout: 8_000,
  retry: 3,
  retryDelay: 1_000,
  removeDuplicate: 'never',
  cacheStrategy: 'network_only',
  cacheStorageName: 'fetch_cache',
};

/**
 * Internal-only fetch options type, which includes the URL and ensures all
 * optional properties from AlwatrFetchOptions_ are present.
 */
type FetchOptions__ = AlwatrFetchOptions_ & Omit<RequestInit, 'headers'> & {url: string};

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
 * error]`. The `error` can be a standard `Error` for network issues or a
 * `FetchError` for HTTP errors, which includes the response data.
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
 *     console.error('Request failed:', error.message);
 *     if (error instanceof FetchError) {
 *       // Access detailed error info
 *       console.error('Status:', error.response.status);
 *       console.error('Server response:', error.data);
 *     }
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
export async function fetch(url: string, options: FetchOptions): Promise<FetchResponse> {
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

/**
 * Processes and sanitizes the fetch options.
 *
 * @param {string} url - The URL to fetch.
 * @param {FetchOptions} options - The user-provided options.
 * @returns {FetchOptions__} The processed and complete fetch options.
 * @private
 */
function _processOptions(url: string, options: FetchOptions): FetchOptions__ {
  logger_.logMethodArgs?.('_processOptions', {url, options});

  const options_: FetchOptions__ = {
    ...defaultFetchOptions,
    ...options,
    url,
  };

  options_.window ??= null;

  if (options_.removeDuplicate === 'auto') {
    options_.removeDuplicate = cacheSupported ? 'until_load' : 'always';
  }

  // Append query parameters to the URL if they are provided and the URL doesn't already have them.
  if (options_.url.lastIndexOf('?') === -1 && options_.queryParams != null) {
    const queryParams = options_.queryParams;
    // prettier-ignore
    const queryArray = Object
      .keys(queryParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(String(queryParams[key]))}`);

    if (queryArray.length > 0) {
      options_.url += '?' + queryArray.join('&');
    }
  }

  // If `bodyJson` is provided, stringify it and set the appropriate 'Content-Type' header.
  if (options_.bodyJson !== undefined) {
    options_.body = JSON.stringify(options_.bodyJson);
    options_.headers['content-type'] = MimeTypes.JSON;
  }

  // Set the 'Authorization' header for bearer tokens or Alwatr's authentication scheme.
  if (options_.bearerToken !== undefined) {
    options_.headers.authorization = `Bearer ${options_.bearerToken}`;
  }
  else if (options_.alwatrAuth !== undefined) {
    options_.headers.authorization = `Alwatr ${options_.alwatrAuth.userId}:${options_.alwatrAuth.userToken}`;
  }

  logger_.logProperty?.('fetch.options', options_);

  return options_;
}

/**
 * Manages caching strategies for the fetch request.
 * If the strategy is `network_only`, it bypasses caching and proceeds to the next step.
 * Otherwise, it interacts with the browser's Cache API based on the selected strategy.
 *
 * @param {FetchOptions__} options - The fully configured fetch options.
 * @returns {Promise<Response>} A promise resolving to a `Response` object, either from the cache or the network.
 * @private
 */
async function handleCacheStrategy_(options: FetchOptions__): Promise<Response> {
  if (options.cacheStrategy === 'network_only') {
    return handleRemoveDuplicate_(options);
  }
  // else

  logger_.logMethod?.('handleCacheStrategy_');

  if (!cacheSupported) {
    logger_.incident?.('fetch', 'fetch_cache_strategy_unsupported', {
      cacheSupported,
    });
    // Fallback to network_only if Cache API is not available.
    options.cacheStrategy = 'network_only';
    return handleRemoveDuplicate_(options);
  }
  // else

  const cacheStorage = await caches.open(options.cacheStorageName);

  const request = new Request(options.url, options);

  switch (options.cacheStrategy) {
    case 'cache_first': {
      const cachedResponse = await cacheStorage.match(request);
      if (cachedResponse != null) {
        return cachedResponse;
      }
      // else

      const response = await handleRemoveDuplicate_(options);
      if (response.ok) {
        cacheStorage.put(request, response.clone());
      }
      return response;
    }

    case 'cache_only': {
      const cachedResponse = await cacheStorage.match(request);
      if (cachedResponse == null) {
        throw new FetchError('cache_not_found', 'Resource not found in cache');
      }
      // else

      return cachedResponse;
    }

    case 'network_first': {
      try {
        const networkResponse = await handleRemoveDuplicate_(options);
        if (networkResponse.ok) {
          cacheStorage.put(request, networkResponse.clone());
        }
        return networkResponse;
      }
      catch (err) {
        const cachedResponse = await cacheStorage.match(request);
        if (cachedResponse != null) {
          return cachedResponse;
        }
        // else

        throw err;
      }
    }

    case 'update_cache': {
      const networkResponse = await handleRemoveDuplicate_(options);
      if (networkResponse.ok) {
        cacheStorage.put(request, networkResponse.clone());
      }
      return networkResponse;
    }

    case 'stale_while_revalidate': {
      const cachedResponse = await cacheStorage.match(request);
      const fetchedResponsePromise = handleRemoveDuplicate_(options).then((networkResponse) => {
        if (networkResponse.ok) {
          cacheStorage.put(request, networkResponse.clone());
          if (typeof options.revalidateCallback === 'function') {
            setTimeout(options.revalidateCallback, 0, networkResponse.clone());
          }
        }
        return networkResponse;
      });

      return cachedResponse ?? fetchedResponsePromise;
    }

    default: {
      return handleRemoveDuplicate_(options);
    }
  }
}

/**
 * Handles duplicate request elimination.
 *
 * It creates a unique key based on the request method, URL, and body. If a request with the
 * same key is already in flight, it returns the promise of the existing request instead of
 * creating a new one. This prevents redundant network calls for identical parallel requests.
 *
 * @param {FetchOptions__} options - The fully configured fetch options.
 * @returns {Promise<Response>} A promise resolving to a cloned `Response` object.
 * @private
 */
async function handleRemoveDuplicate_(options: FetchOptions__): Promise<Response> {
  if (options.removeDuplicate === 'never') {
    return handleRetryPattern_(options);
  }
  // else

  logger_.logMethod?.('handleRemoveDuplicate_');

  // Create a unique key for the request. Including the body is crucial to differentiate
  // between requests to the same URL but with different payloads (e.g., POST requests).
  const bodyString = typeof options.body === 'string' ? options.body : '';
  const cacheKey = `${options.method} ${options.url} ${bodyString}`;

  // If a request with the same key doesn't exist, create it and store its promise.
  duplicateRequestStorage_[cacheKey] ??= handleRetryPattern_(options);

  try {
    // Await the shared promise to get the response.
    const response = await duplicateRequestStorage_[cacheKey];

    // Clean up the stored promise based on the removal strategy.
    if (duplicateRequestStorage_[cacheKey] != null) {
      if (response.ok !== true || options.removeDuplicate === 'until_load') {
        // Remove after completion for 'until_load' or if the request failed.
        delete duplicateRequestStorage_[cacheKey];
      }
    }

    // Return a clone of the response, so each caller can consume the body independently.
    return response.clone();
  }
  catch (err) {
    // If the request fails, remove it from storage to allow for retries.
    delete duplicateRequestStorage_[cacheKey];
    throw err;
  }
}

/**
 * Implements a retry mechanism for the fetch request.
 * If the request fails due to a server error (status >= 500) or a timeout,
 * it will be retried up to the specified number of times.
 *
 * @param {FetchOptions__} options - The fully configured fetch options.
 * @returns {Promise<Response>} A promise that resolves to the final `Response` after all retries.
 * @private
 */
async function handleRetryPattern_(options: FetchOptions__): Promise<Response> {
  if (!(options.retry > 1)) {
    return handleTimeout_(options);
  }
  // else

  logger_.logMethod?.('handleRetryPattern_');
  options.retry--;

  const externalAbortSignal = options.signal;

  try {
    const response = await handleTimeout_(options);

    if (!response.ok && response.status >= HttpStatusCodes.Error_Server_500_Internal_Server_Error) {
      // only retry for server errors (5xx)
      throw new FetchError('http_error', `HTTP error! status: ${response.status} ${response.statusText}`, response);
    }

    return response;
  }
  catch (err) {
    logger_.accident('fetch', 'fetch_failed_retry', err);

    // Do not retry if the browser is offline.
    if (globalThis_.navigator?.onLine === false) {
      logger_.accident('handleRetryPattern_', 'offline', 'Skip retry because offline');
      throw err;
    }

    await delay.by(options.retryDelay);

    // Restore the original signal for the next attempt.
    options.signal = externalAbortSignal;
    return handleRetryPattern_(options);
  }
}

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
function handleTimeout_(options: FetchOptions__): Promise<Response> {
  if (options.timeout === 0) {
    // If timeout is disabled, call fetch directly.
    return globalThis_.fetch(options.url, options);
  }

  logger_.logMethod?.('handleTimeout_');

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
