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
   * Set `0` for disable it.
   *
   * Use with cation, you will have memory leak issue in nodejs.
   *
   * @default 10_000 ms
   */
  timeout: number;

  /**
   * If fetch response not acceptable or timed out, it will retry the request.
   *
   * @default 3
   */
  retry: number;

  /**
   * Delay before each retries.
   *
   * @default 1_000 ms
   */
  retryDelay: number;

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
   * Revalidate callback for `stale_while_revalidate` cache strategy.
   */
  revalidateCallback?: (response: Response) => void;

  /**
   * Cache storage custom name.
   */
  cacheStorageName?: string;

  /**
   * Body as JS Object.
   */
  bodyJson?: Record<string | number, unknown>;

  /**
   * URL Query Parameters as JS Object.
   */
  queryParameters?: Record<string, string | number | boolean>;
}

let alwatrCacheStorage: Cache;
const cacheSupported = 'caches' in globalThis;

const duplicateRequestStorage: Record<string, Promise<Response>> = {};

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
export function fetch(_options: Partial<FetchOptions> & {url: string}): Promise<Response> {
  const options = _processOptions(_options);
  logger.logMethodArgs('fetch', {options});
  return _handleCacheStrategy(options);
}

/**
 * Process fetch options and set defaults, etc.
 */
function _processOptions(options: Partial<FetchOptions> & {url: string}): FetchOptions {
  options.method = options.method != null ? options.method.toUpperCase() : 'GET';
  options.window ??= null;

  options.timeout ??= 10_000;
  options.retry ??= 3;
  options.retryDelay ??= 1_000;
  options.cacheStrategy ??= 'network_only';
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

  if (options.bodyJson != null) {
    options.body = JSON.stringify(options.bodyJson);
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json',
    };
  }

  return options as FetchOptions;
}

/**
 * Handle Remove Duplicates over `_handleRetryPattern`.
 */
async function _handleRemoveDuplicate(options: FetchOptions): Promise<Response> {
  if (options.removeDuplicate === 'never') return _handleRetryPattern(options);

  logger.logMethod('_handleRemoveDuplicate');

  const cacheKey = `[${options.method}] ${options.url}`;
  const firstRequest = duplicateRequestStorage[cacheKey] == null;

  // We must cache fetch promise without await for handle other parallel requests.
  duplicateRequestStorage[cacheKey] ??= _handleRetryPattern(options);

  try {
    // For all requests need to await for clone responses.
    const response = await duplicateRequestStorage[cacheKey];

    if (firstRequest === true) {
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
 * Handle Cache Strategy over `_handleRemoveDuplicate`.
 */
async function _handleCacheStrategy(options: FetchOptions): Promise<Response> {
  if (options.cacheStrategy === 'network_only') {
    return _handleRemoveDuplicate(options);
  }
  // else handle cache strategies!
  logger.logMethod('_handleCacheStrategy');

  if (alwatrCacheStorage == null && options.cacheStorageName == null) {
    alwatrCacheStorage = await caches.open('alwatr_fetch_cache');
  }

  const cacheStorage =
    options.cacheStorageName != null ? await caches.open(options.cacheStorageName) : alwatrCacheStorage;

  const request = new Request(options.url, options);

  switch (options.cacheStrategy) {
    case 'cache_first': {
      const cachedResponse = await cacheStorage.match(request);
      if (cachedResponse != null) return cachedResponse;
      const response = await _handleRemoveDuplicate(options);
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
        const networkResponse = await _handleRemoveDuplicate(options);
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
      const fetchedResponsePromise = _handleRemoveDuplicate(options);

      fetchedResponsePromise.then((networkResponse) => {
        if (networkResponse.ok) {
          cacheStorage.put(request, networkResponse.clone());
          if (cachedResponse != null && typeof options.revalidateCallback === 'function') {
            options.revalidateCallback(networkResponse);
          }
        }
      });

      return cachedResponse || fetchedResponsePromise;
    }

    default: {
      return _handleRemoveDuplicate(options);
    }
  }
}

/**
 * Handle retry pattern over `_handleTimeout`.
 */
async function _handleRetryPattern(options: FetchOptions): Promise<Response> {
  if (!(options.retry > 1)) return _handleTimeout(options);

  logger.logMethod('_handleRetryPattern');
  options.retry--;

  const externalAbortSignal = options.signal;

  try {
    const response = await _handleTimeout(options);

    if (response.status >= 500) {
      logger.incident('fetch', 'fetch_server_error', 'fetch server error ' + response.status);
      throw new Error('fetch_server_error');
    }

    else return response;
  }
  catch (err) {
    logger.accident('fetch', (err as Error)?.name ?? 'fetch_failed', 'fetch failed and retry', {err});

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
  logger.logMethod('_handleTimeout');
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
