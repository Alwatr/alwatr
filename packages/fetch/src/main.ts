import {delay} from '@alwatr/delay';
import {getGlobalThis} from '@alwatr/global-this';
import {HttpStatusCodes, MimeTypes} from '@alwatr/http-primer';
import {createLogger} from '@alwatr/logger';
import {packageTracer} from '@alwatr/package-tracer';
import {parseDuration} from '@alwatr/parse-duration';

import type {FetchOptions} from './type.js';

export {cacheSupported};
export type * from './type.js';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

const logger_ = /* #__PURE__ */ createLogger('@alwatr/fetch');

const globalThis_ = /* #__PURE__ */ getGlobalThis();

let cacheStorage_: Cache;
const cacheSupported = /* #__PURE__ */ Object.hasOwn(globalThis_, 'caches');

const duplicateRequestStorage_: Record<string, Promise<Response>> = {};

const defaultFetchOptions: FetchOptions = {
  method: 'GET',
  timeout: 8_000,
  retry: 3,
  retryDelay: 1_000,
  cacheStrategy: 'network_only',
  removeDuplicate: 'never',
  window: null,
};

/**
 * It's a wrapper around the browser's `fetch` function that adds retry pattern, timeout, cacheStrategy,
 * remove duplicates, etc.
 *
 * @see {@link FetchOptions}
 *
 * @param options Fetch options.
 *
 * @returns A promise that resolves to the Response to that request, whether it is successful or not.
 *
 * @example
 * ```typescript
 * const response = await fetch({
 *   url: '/api/products',
 *   queryParameters: {limit: 10},
 *   timeout: 8_000,
 *   retry: 3,
 *   cacheStrategy: 'stale_while_revalidate',
 *   cacheDuplicate: 'auto',
 * });
 * ```
 */
export function fetch(url: string, options: FetchOptions): Promise<Response> {
  logger_.logMethodArgs?.('fetch', {url, options});

  options = {...defaultFetchOptions, ...options};

  if (options.cacheStrategy !== 'network_only' && cacheSupported !== true) {
    logger_.incident?.('fetch', 'fetch_cache_strategy_unsupported', {
      cacheSupported,
    });
    options.cacheStrategy = 'network_only';
  }

  if (options.removeDuplicate === 'auto') {
    options.removeDuplicate = cacheSupported ? 'until_load' : 'always';
  }

  if (url.lastIndexOf('?') === -1 && options.queryParams != null) {
    const queryParams = options.queryParams;
    // prettier-ignore
    const queryArray = Object
      .keys(queryParams)
      .map(key => `${key}=${String(queryParams[key])}`);

    if (queryArray.length > 0) {
      url += '?' + queryArray.join('&');
    }
  }

  options.headers ??= {};

  if (options.bodyJson !== undefined) {
    options.body = JSON.stringify(options.bodyJson);
    options.headers['content-type'] = MimeTypes.JSON;
  }

  if (options.bearerToken !== undefined) {
    options.headers.authorization = `Bearer ${options.bearerToken}`;
  }
  else if (options.alwatrAuth !== undefined) {
    options.headers.authorization = `Alwatr ${options.alwatrAuth.userId}:${options.alwatrAuth.userToken}`;
  }

  return handleCacheStrategy_(options as Required<FetchOptions>);
}

/**
 * Handle Cache Strategy over `handleRemoveDuplicate_`.
 */
async function handleCacheStrategy_(options: Required<FetchOptions>): Promise<Response> {
  if (options.cacheStrategy === 'network_only') {
    return handleRemoveDuplicate_(options);
  }
  // else handle cache strategies!
  logger_.logMethod?.('_handleCacheStrategy');

  if (cacheStorage_ == null && options.cacheStorageName == null) {
    cacheStorage_ = await caches.open('fetch_cache');
  }

  const cacheStorage = options.cacheStorageName != null ? await caches.open(options.cacheStorageName) : cacheStorage_;

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
        logger_.accident('_handleCacheStrategy', 'fetch_cache_not_found', {url: request.url});
        throw new Error('fetch_cache_not_found');
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
 * Handle Remove Duplicates over `_handleRetryPattern`.
 */
async function handleRemoveDuplicate_(options: Required<FetchOptions>): Promise<Response> {
  if (options.removeDuplicate === 'never') return handleRetryPattern_(options);

  logger_.logMethod?.('handleRemoveDuplicate_');

  const cacheKey = options.method + ' ' + options.url;

  // We must cache fetch promise without await for handle other parallel requests.
  duplicateRequestStorage_[cacheKey] ??= handleRetryPattern_(options);

  try {
    // For all requests need to await for clone responses.
    const response = await duplicateRequestStorage_[cacheKey];

    if (duplicateRequestStorage_[cacheKey] != null) {
      if (response.ok !== true || options.removeDuplicate === 'until_load') {
        delete duplicateRequestStorage_[cacheKey];
      }
    }

    return response.clone();
  }
  catch (err) {
    // clean cache on any error.
    delete duplicateRequestStorage_[cacheKey];
    throw err;
  }
}

/**
 * Handle retry pattern over `handleTimeout_`.
 */
async function handleRetryPattern_(options: Required<FetchOptions>): Promise<Response> {
  if (!(options.retry > 1)) return handleTimeout_(options);

  logger_.logMethod?.('_handleRetryPattern');
  options.retry--;

  const externalAbortSignal = options.signal;

  try {
    const response = await handleTimeout_(options);

    if (response.status < HttpStatusCodes.Error_Server_500_Internal_Server_Error) {
      return response;
    }
    // else
    throw new Error('fetch_server_error');
  }
  catch (err) {
    logger_.accident('fetch', 'fetch_failed_retry', err);

    if (globalThis_.navigator?.onLine === false) {
      logger_.accident('handleRetryPattern_', 'offline', 'Skip retry because offline');
      throw err;
    }

    await delay.by(options.retryDelay);

    options.signal = externalAbortSignal;
    return handleRetryPattern_(options);
  }
}

/**
 * It's a wrapper around the browser's `fetch` with timeout.
 */
function handleTimeout_(options: FetchOptions): Promise<Response> {
  if (options.timeout === 0) {
    return globalThis_.fetch(options.url, options);
  }
  // else
  logger_.logMethod?.('handleTimeout_');
  return new Promise((resolved, reject) => {
    const abortController = typeof AbortController === 'function' ? new AbortController() : null;
    const externalAbortSignal = options.signal;
    options.signal = abortController?.signal;

    if (abortController !== null && externalAbortSignal != null) {
      // Respect external abort signal
      externalAbortSignal.addEventListener('abort', () => abortController.abort(), {once: true});
    }

    const timeoutId = setTimeout(() => {
      reject(new Error('fetch_timeout'));
      abortController?.abort('fetch_timeout');
    }, parseDuration(options.timeout!));

    // abortController.signal.addEventListener('abort', () => {
    //   logger.incident('fetch', 'fetch_abort_signal', {
    //     reason: abortController.signal.reason,
    //   });
    // });

    globalThis_
      .fetch(options.url, options)
      .then((response) => resolved(response))
      .catch((reason) => reject(reason))
      .finally(() => {
        delete options.signal; // try to avoid memory leak in nodejs!
        clearTimeout(timeoutId);
      });
  });
}
