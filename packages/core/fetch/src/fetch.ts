import {createLogger, alwatrRegisteredList} from '@alwatr/logger';

const logger = createLogger('alwatr/fetch');

alwatrRegisteredList.push({
  name: '@alwatr/fetch',
  version: '{{ALWATR_VERSION}}',
});

export type CacheStrategy = 'network_only' | 'network_first' | 'cache_only' | 'cache_first' | 'stale_while_revalidate';
export type CacheDuplicate = 'never' | 'always' | 'until_load' | 'auto';

export interface FetchOptions extends RequestInit {
  /**
   * Request URL.
   */
  url: string;

  /**
   * A string to set request's method.
   */
  method: string;

  /**
   * A timeout for the fetch request.
   *
   * @default 5000 ms
   */
  timeout: number;
  /**
   * If fetch response not acceptable or timed out, it will retry the request.
   *
   * @default 3
   */
  retry: number;

  /**
   * Strategies for caching.
   *
   * - `network_only`: Only network request without any cache.
   * - `network_first`: Network first, falling back to cache.
   * - `cache_only`: Cache only without any network request.
   * - `cache_first`: Cache first, falling back to network.
   * - `stale_while_revalidate`: Fastest strategy, Use cached first but always request network to update the cache.
   *
   * @default 'network_only'
   */
  cacheStrategy: CacheStrategy;

  /**
   * Cache storage name.
   *
   * @default 'alwatr_fetch_cache'
   */
  cacheStorageName: string;

  /**
   * Simple memory caching for remove duplicate/parallel requests.
   *
   * - `never`: Never use memory caching.
   * - `always`: Always use memory caching and remove all duplicate requests.
   * - `until_load`: Cache parallel requests until request completed (it will be removed after the promise resolved).
   * - `auto`: If CacheStorage was supported use `until_load` strategy else use `always`.
   *
   * @default 'never'
   */
  removeDuplicate: CacheDuplicate;

  /**
   * Body as JS Object.
   */
  bodyJson?: Record<string | number, unknown>;

  /**
   * URL Query Parameters as JS Object.
   */
  queryParameters?: Record<string, string | number | boolean>;
}

let cacheStorage: Cache;
const cacheSupported = 'caches' in self;

const duplicateRequestStorage: Record<string, Promise<Response>> = {};

/**
 * It fetches a JSON file from a URL, and returns the parsed data.
 *
 * Example:
 *
 * ```ts
 * const productList = await getJson<ProductResponse>({
 *   url: '/api/products',
 *   queryParameters: {limit: 10},
 *   timeout: 5_000,
 *   retry: 3,
 *   cacheStrategy: 'stale_while_revalidate',
 *   cacheDuplicate: 'auto',
 * });
 * ```
 */
export async function getJson<ResponseType extends Record<string | number, unknown>>(
    _options: Partial<FetchOptions> & {url: string},
): Promise<ResponseType> {
  const options = _processOptions(_options);
  logger.logMethodArgs('getJson', {options});

  const response = await _handleRemoveDuplicate(options);

  let data: ResponseType;

  try {
    if (!response.ok) {
      throw new Error('fetch_nok');
    }
    data = (await response.json()) as ResponseType;
  }
  catch (err) {
    logger.accident('getJson', 'response_json', 'response json error', {
      retry: options.retry,
      err,
    });

    if (options.retry > 1) {
      data = await getJson(options);
    }
    else {
      throw err;
    }
  }

  return data;
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
 *   timeout: 5_000,
 *   retry: 3,
 *   cacheStrategy: 'stale_while_revalidate',
 *   cacheDuplicate: 'auto',
 * });
 * ```
 */
export function fetch(_options: Partial<FetchOptions> & {url: string}): Promise<Response> {
  const options = _processOptions(_options);
  logger.logMethodArgs('fetch', {options});
  return _handleRemoveDuplicate(options);
}

/**
 * Process fetch options and set defaults, etc.
 */
function _processOptions(options: Partial<FetchOptions> & {url: string}): FetchOptions {
  options.method = options.method != null ? options.method.toUpperCase() : 'GET';
  options.window ??= null;

  options.timeout ??= 5_000;
  options.retry ??= 3;
  options.cacheStrategy ??= 'network_only';
  options.cacheStorageName ??= 'alwatr_fetch_cache';
  options.removeDuplicate ??= 'never';

  if (options.cacheStrategy !== 'network_only' && cacheSupported !== true) {
    logger.accident('fetch', 'fetch_cache_strategy_ignore', 'Cache storage not support in this browser', {
      cacheSupported,
    });
    options.cacheStrategy = 'network_only';
  }

  if (options.removeDuplicate === 'auto') {
    options.removeDuplicate = cacheSupported ? 'until_load' : 'always';
  }

  if (options.url.lastIndexOf('?') === -1 && options.queryParameters != null) {
    // prettier-ignore
    const queryArray = Object
        .keys(options.queryParameters)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map((key) => `${key}=${String(options.queryParameters![key])}`);

    if (queryArray.length > 0) {
      options.url += '?' + queryArray.join('&');
    }
  }

  if (options.body != null && options.bodyJson != null) {
    options.body = JSON.stringify(options.bodyJson);
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json',
    };
  }

  return options as FetchOptions;
}

/**
 * Handle Remove Duplicates over `_handleCacheStrategy`.
 */
function _handleRemoveDuplicate(options: FetchOptions): Promise<Response> {
  if (options.removeDuplicate === 'never') return _handleCacheStrategy(options);

  logger.logMethod('_handleRemoveDuplicate');

  duplicateRequestStorage[options.url] ??= _handleCacheStrategy(options);

  if (options.removeDuplicate === 'until_load') {
    duplicateRequestStorage[options.url].then(() => delete duplicateRequestStorage[options.url]);
  }

  return duplicateRequestStorage[options.url];
}

/**
 * Handle Cache Strategy over `_handleRetryPattern`.
 */
async function _handleCacheStrategy(options: FetchOptions): Promise<Response> {
  if (options.cacheStrategy === 'network_only') {
    return _handleRetryPattern(options);
  }
  // else handle cache strategies!
  logger.logMethod('_handleCacheStrategy');

  if (cacheStorage == null) {
    cacheStorage = await caches.open(options.cacheStorageName);
  }

  const request = new Request(options.url, options);

  switch (options.cacheStrategy) {
    case 'cache_first': {
      const cachedResponse = await cacheStorage.match(request);
      if (cachedResponse != null) return cachedResponse;
      const response = await _handleRetryPattern(options);
      if (response.ok) {
        cacheStorage.put(request, response.clone());
      }
      return response;
    }

    case 'cache_only': {
      const cachedResponse = await cacheStorage.match(request);
      if (cachedResponse == null) throw new Error('fetch_cache_not_found');
      return cachedResponse;
    }

    case 'network_first': {
      try {
        const networkResponse = await _handleRetryPattern(options);
        if (networkResponse.ok) {
          cacheStorage.put(request, networkResponse.clone());
        }
        return networkResponse;
      }
      catch (err) {
        const cachedResponse = await cacheStorage.match(request);
        if (cachedResponse == null) throw err;
        return cachedResponse;
      }
    }

    case 'stale_while_revalidate': {
      const cachedResponse = await cacheStorage.match(request);
      const fetchedResponsePromise = _handleRetryPattern(options).then((networkResponse) => {
        if (networkResponse.ok) {
          cacheStorage.put(request, networkResponse.clone());
        }
        return networkResponse;
      });
      return cachedResponse || fetchedResponsePromise;
    }

    default: {
      return _handleRetryPattern(options);
    }
  }
}

/**
 * Handle retry pattern over `_handleTimeout`.
 */
async function _handleRetryPattern(options: FetchOptions): Promise<Response> {
  if (!(options.retry >= 1)) return _handleTimeout(options);

  logger.logMethod('_handleRetryPattern');

  const externalAbortSignal = options.signal;

  const retryFetch = (): Promise<Response> => {
    options.retry--;
    options.signal = externalAbortSignal;
    return _handleRetryPattern(options);
  };

  try {
    const response = await _handleTimeout(options);

    if (options.retry > 1 && response.status >= 502 && response.status <= 504) {
      logger.accident('fetch', 'fetch_not_valid', 'fetch not valid and retry', {
        response,
      });
      return retryFetch();
    }
    // else
    return response;
  }
  catch (reason) {
    if ((reason as Error)?.message === 'fetch_timeout' && options.retry > 1) {
      logger.incident('fetch', 'fetch_timeout', 'fetch timeout and retry', {
        reason,
      });
      return retryFetch();
    }
    // else
    throw reason;
  }
}

/**
 * It's a wrapper around the browser's `fetch` with timeout.
 */
function _handleTimeout(options: FetchOptions): Promise<Response> {
  logger.logMethod('_handleTimeout');
  return new Promise((resolved, reject) => {
    // @TODO: AbortController polyfill
    const abortController = new AbortController();
    const externalAbortSignal = options.signal;
    options.signal = abortController.signal;

    const timeoutId = setTimeout(() => {
      reject(new Error('fetch_timeout'));
      abortController.abort('fetch_timeout');
    }, options.timeout);

    if (externalAbortSignal != null) {
      // Respect external abort signal
      externalAbortSignal.addEventListener('abort', () => {
        abortController.abort(`external abort signal: ${externalAbortSignal.reason}`);
        clearTimeout(timeoutId);
      });
    }

    abortController.signal.addEventListener('abort', () => {
      logger.incident('fetch', 'fetch_abort_signal', 'fetch abort signal received', {
        reason: abortController.signal.reason,
      });
    });

    window
        .fetch(options.url, options)
        .then((response) => resolved(response))
        .catch((reason) => reject(reason))
        .finally(() => clearTimeout(timeoutId));
  });
}
