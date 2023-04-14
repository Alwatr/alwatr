import {createLogger, globalAlwatr, NODE_MODE} from '@alwatr/logger';
import {contextProvider, type DispatchOptions} from '@alwatr/signal';
import {getClientId} from '@alwatr/util';

import type {FetchOptions} from './type.js';
import type {AlwatrServiceResponseSuccessWithMeta} from '@alwatr/type';

export type * from './type.js';

const logger = createLogger('alwatr/fetch');

globalAlwatr.registeredList.push({
  name: '@alwatr/fetch',
  version: _ALWATR_VERSION_,
});

let alwatrCacheStorage: Cache;
const cacheSupported = 'caches' in globalThis;

const duplicateRequestStorage: Record<string, Promise<Response>> = {};

export async function fetchContext(
    contextName: string,
    fetchOption: FetchOptions,
    dispatchOptions: Partial<DispatchOptions> = {debounce: 'Timeout'},
): Promise<void> {
  logger.logMethodArgs?.('fetchContext', {contextName});
  if (cacheSupported && contextProvider.getValue(contextName) == null) {
    try {
      fetchOption.cacheStrategy = 'cache_only';
      const response = await serviceRequest(fetchOption);
      contextProvider.setValue<typeof response>(contextName, response, dispatchOptions);
      if (navigator.onLine === false) {
        logger.logOther?.('fetchContext:', 'offline');
        // retry on online
        return;
      }
    }
    catch (err) {
      if ((err as Error).message === 'fetch_cache_not_found') {
        logger.logOther?.('fetchContext:', 'fetch_cache_not_found');
      }
      else {
        logger.error('fetchContext', 'fetch_failed', err);
        throw err;
      }
    }
  }

  try {
    fetchOption.cacheStrategy = 'update_cache';
    const response = await serviceRequest(fetchOption);
    if (
      response.meta?.lastUpdated === undefined || // skip lastUpdated check
      response.meta?.lastUpdated !== contextProvider.getValue<typeof response>(contextName)?.meta?.lastUpdated
    ) {
      logger.logOther?.('fetchContext:', 'contextProvider.setValue(new-received-context)', {contextName});
      contextProvider.setValue<typeof response>(contextName, response, dispatchOptions);
    }
  }
  catch (err) {
    logger.error('fetchContext', 'fetch_failed', err);
    throw err;
  }
}

/**
 * Fetch from alwatr services and return standard response.
 */
export async function serviceRequest<
  T extends AlwatrServiceResponseSuccessWithMeta = AlwatrServiceResponseSuccessWithMeta
>(options: FetchOptions): Promise<T> {
  logger.logMethodArgs?.('serviceRequest', {url: options.url});

  if (!NODE_MODE) {
    options.headers ??= {};
    if (!options.headers['client-id']) {
      options.headers['client-id'] = getClientId();
    }
  }

  let response: Response;
  try {
    response = await fetch(options);
  }
  catch (err) {
    logger.error('serviceRequest', (err as Error).message || 'fetch_failed', err, options);
    throw err;
  }

  let responseText: string;
  try {
    responseText = await response.text();
  }
  catch (err) {
    logger.error('serviceRequest', 'invalid_response', err, {
      response,
    });
    throw err;
  }

  let responseJson: T;
  try {
    responseJson = JSON.parse(responseText);
  }
  catch (err) {
    logger.error('serviceRequest', 'invalid_json', err, {responseText});
    throw err;
  }

  if (responseJson.ok !== true) {
    if (typeof responseJson.errorCode === 'string') {
      logger.accident('serviceRequest', responseJson.errorCode, 'fetch response not ok', {responseJson});
      throw new Error(responseJson.errorCode);
    }
    else {
      logger.error('serviceRequest', 'fetch_nok', 'fetch response not ok', {responseJson});
      throw new Error('fetch_nok');
    }
  }

  // TODO: generate fetch signals hook (for easier handle loading and show error toast)

  return responseJson;
}

/**
 * It's a wrapper around the browser's `fetch` function that adds retry pattern, timeout, cacheStrategy,
 * remove duplicates, etc.
 *
 * Example:
 *
 * ```ts
 * const response = await fetch({
 *   url: '/api/products',
 *   queryParameters: {limit: 10},
 *   timeout: 10_000,
 *   retry: 3,
 *   cacheStrategy: 'stale_while_revalidate',
 *   cacheDuplicate: 'auto',
 * });
 * ```
 */
export function fetch(options: FetchOptions): Promise<Response> {
  options = _processOptions(options);
  logger.logMethodArgs?.('fetch', {options});
  return _handleCacheStrategy(options as Required<FetchOptions>);
}

/**
 * Process fetch options and set defaults, etc.
 */
function _processOptions(options: FetchOptions): Required<FetchOptions> {
  options.method ??= 'GET';
  options.window ??= null;

  options.timeout ??= 10_000;
  options.retry ??= 3;
  options.retryDelay ??= 1_000;
  options.cacheStrategy ??= 'network_only';
  options.removeDuplicate ??= 'never';
  options.headers ??= {};

  if (options.cacheStrategy !== 'network_only' && cacheSupported !== true) {
    logger.incident?.('fetch', 'fetch_cache_strategy_ignore', 'Cache storage not support in this browser', {
      cacheSupported,
    });
    options.cacheStrategy = 'network_only';
  }

  if (options.removeDuplicate === 'auto') {
    options.removeDuplicate = cacheSupported ? 'until_load' : 'always';
  }

  if (options.url.lastIndexOf('?') === -1 && options.queryParameters != null) {
    const queryParameters = options.queryParameters;
    // prettier-ignore
    const queryArray = Object
        .keys(queryParameters)
        .map((key) => `${key}=${String(queryParameters[key])}`);

    if (queryArray.length > 0) {
      options.url += '?' + queryArray.join('&');
    }
  }

  if (options.bodyJson != null) {
    options.body = JSON.stringify(options.bodyJson);
    options.headers['Content-Type'] = 'application/json';
  }

  if (options.token != null) {
    options.headers.Authorization = `Bearer ${options.token}`;
  }

  return options as Required<FetchOptions>;
}

/**
 * Handle Cache Strategy over `_handleRemoveDuplicate`.
 */
async function _handleCacheStrategy(options: Required<FetchOptions>): Promise<Response> {
  if (options.cacheStrategy === 'network_only') {
    return _handleRemoveDuplicate(options);
  }
  // else handle cache strategies!
  logger.logMethod?.('_handleCacheStrategy');

  if (alwatrCacheStorage == null && options.cacheStorageName == null) {
    alwatrCacheStorage = await caches.open('alwatr_fetch_cache');
  }

  const cacheStorage =
    options.cacheStorageName != null ? await caches.open(options.cacheStorageName) : alwatrCacheStorage;

  const request = new Request(options.url, options);

  switch (options.cacheStrategy) {
    case 'cache_first': {
      const cachedResponse = await cacheStorage.match(request);
      if (cachedResponse != null) {
        return cachedResponse;
      }
      // else
      const response = await _handleRemoveDuplicate(options);
      if (response.ok) {
        cacheStorage.put(request, response.clone());
      }
      return response;
    }

    case 'cache_only': {
      const cachedResponse = await cacheStorage.match(request);
      if (cachedResponse == null) {
        logger.accident(
            '_handleCacheStrategy',
            'fetch_cache_not_found',
            'cacheStorage is cache_only but no cache found',
            {url: request.url},
        );
        throw new Error('fetch_cache_not_found');
      }
      // else
      return cachedResponse;
    }

    case 'network_first': {
      try {
        const networkResponse = await _handleRemoveDuplicate(options);
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
      const networkResponse = await _handleRemoveDuplicate(options);
      if (networkResponse.ok) {
        cacheStorage.put(request, networkResponse.clone());
      }
      return networkResponse;
    }

    case 'stale_while_revalidate': {
      const cachedResponse = await cacheStorage.match(request);
      const fetchedResponsePromise = _handleRemoveDuplicate(options).then((networkResponse) => {
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
      return _handleRemoveDuplicate(options);
    }
  }
}

/**
 * Handle Remove Duplicates over `_handleRetryPattern`.
 */
async function _handleRemoveDuplicate(options: Required<FetchOptions>): Promise<Response> {
  if (options.removeDuplicate === 'never') return _handleRetryPattern(options);

  logger.logMethod?.('_handleRemoveDuplicate');

  const cacheKey = options.method + ' ' + options.url;

  // We must cache fetch promise without await for handle other parallel requests.
  duplicateRequestStorage[cacheKey] ??= _handleRetryPattern(options);

  try {
    // For all requests need to await for clone responses.
    const response = await duplicateRequestStorage[cacheKey];

    if (duplicateRequestStorage[cacheKey] != null) {
      if (response.ok !== true || options.removeDuplicate === 'until_load') {
        delete duplicateRequestStorage[cacheKey];
      }
    }

    return response.clone();
  }
  catch (err) {
    // clean cache on any error.
    delete duplicateRequestStorage[cacheKey];
    throw err;
  }
}

/**
 * Handle retry pattern over `_handleTimeout`.
 */
async function _handleRetryPattern(options: Required<FetchOptions>): Promise<Response> {
  if (!(options.retry > 1)) return _handleTimeout(options);

  logger.logMethod?.('_handleRetryPattern');
  options.retry--;

  const externalAbortSignal = options.signal;

  try {
    const response = await _handleTimeout(options);

    if (response.status < 500) {
      return response;
    }
    // else
    throw new Error('fetch_server_error');
  }
  catch (err) {
    logger.accident('fetch', 'fetch_failed_retry', (err as Error)?.message || 'fetch failed and retry', err);

    if (globalThis.navigator != null && navigator.onLine === false) {
      throw new Error('offline');
    }

    await _wait(options.retryDelay);

    options.signal = externalAbortSignal;
    return _handleRetryPattern(options);
  }
}

/**
 * It's a wrapper around the browser's `fetch` with timeout.
 */
function _handleTimeout(options: FetchOptions): Promise<Response> {
  if (options.timeout === 0) {
    return globalThis.fetch(options.url, options);
  }
  // else
  logger.logMethod?.('_handleTimeout');
  return new Promise((resolved, reject) => {
    // TODO: AbortController polyfill
    const abortController = new AbortController();
    const externalAbortSignal = options.signal;
    options.signal = abortController.signal;

    const timeoutId = setTimeout(() => {
      reject(new Error('fetch_timeout'));
      abortController.abort('fetch_timeout');
    }, options.timeout);

    if (externalAbortSignal != null) {
      // Respect external abort signal
      externalAbortSignal.addEventListener('abort', () => abortController.abort(), {once: true});
    }

    // abortController.signal.addEventListener('abort', () => {
    //   logger.incident('fetch', 'fetch_abort_signal', 'fetch abort signal received', {
    //     reason: abortController.signal.reason,
    //   });
    // });

    globalThis
        .fetch(options.url, options)
        .then((response) => resolved(response))
        .catch((reason) => reject(reason))
        .finally(() => {
          delete options.signal; // try to avoid memory leak in nodejs!
          clearTimeout(timeoutId);
        });
  });
}

const _wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
