import {createLogger, alwatrRegisteredList} from '@alwatr/logger';

const logger = createLogger('alwatr/fetch');

alwatrRegisteredList.push({
  name: '@alwatr/fetch',
  version: '{{ALWATR_VERSION}}',
});

declare global {
  // Patch typescript's global types
  interface AbortController {
    abort(reason?: string): void;
  }
}

export type CacheStrategy = 'network_only' | 'network_first' | 'cache_only' | 'cache_first' | 'stale_while_revalidate';

// @TODO: docs for all options
export interface FetchOptions extends RequestInit {
  /**
   * Request URL.
   */
  url: string;

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
   * Use cache storage.
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

/**
 * It's a wrapper around the browser's `fetch` function that adds retry pattern with timeout and cacheStrategy
 *
 * Example:
 *
 * ```ts
 * const response = await fetch(url, {timeout: 5_000, bodyJson: {a: 1, b: 2}});
 * ```
 */
export async function fetch(_options: Partial<FetchOptions> & {url: string}): Promise<Response> {
  const options = _processOptions(_options);

  logger.logMethodArgs('fetch', {options});

  if (options.cacheStrategy === 'network_only') {
    return _fetch(options);
  }
  // else handle cache strategies!

  if (cacheStorage == null) {
    cacheStorage = await caches.open(options.cacheStorageName);
  }

  const request = new Request(options.url, options);

  switch (options.cacheStrategy) {
    case 'cache_first': {
      const cachedResponse = await cacheStorage.match(request);
      if (cachedResponse != null) return cachedResponse;
      const response = await _fetch(options);
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
        const networkResponse = await _fetch(options);
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
      const fetchedResponsePromise = _fetch(options).then((networkResponse) => {
        if (networkResponse.ok) {
          cacheStorage.put(request, networkResponse.clone());
        }
        return networkResponse;
      });
      return cachedResponse || fetchedResponsePromise;
    }

    default: {
      return _fetch(options);
    }
  }
}

function _processOptions(options: Partial<FetchOptions> & {url: string}): FetchOptions {
  options.method ??= 'GET';
  options.window ??= null;

  options.timeout ??= 5_000;
  options.retry ??= 3;
  options.cacheStrategy ??= 'network_only';
  options.cacheStorageName ??= 'alwatr_fetch_cache';

  if (options.cacheStrategy !== 'network_only' && cacheSupported !== true) {
    logger.accident('fetch', 'fetch_cache_strategy_ignore', 'Catch storage not support in this browser');
    options.cacheStrategy = 'network_only';
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
 * It's a wrapper around the browser's `fetch` function that adds retry pattern with timeout
 *
 * Example:
 *
 * ```ts
 * const response = await fetch(url, {timeout: 5_000, bodyJson: {a: 1, b: 2}});
 * ```
 */
async function _fetch(options: FetchOptions): Promise<Response> {
  logger.logMethodArgs('_fetch', {options});

  // @TODO: AbortController polyfill
  const abortController = new AbortController();
  const externalAbortSignal = options.signal;
  options.signal = abortController.signal;

  let timedOut = false;
  const timeoutId = setTimeout(() => {
    abortController.abort('fetch_timeout');
    timedOut = true;
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

  const retryFetch = (): Promise<Response> => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    options.retry!--;
    options.signal = externalAbortSignal;
    return fetch(options);
  };

  try {
    // @TODO: browser fetch polyfill
    const response = await window.fetch(options.url, options);
    clearTimeout(timeoutId);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (options.retry! > 1 && response.status >= 502 && response.status <= 504) {
      logger.accident('fetch', 'fetch_not_valid', 'fetch not valid and retry', {
        response,
      });
      return retryFetch();
    }

    return response;
  }
  catch (reason) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (timedOut && options.retry! > 1) {
      logger.incident('fetch', 'fetch_timeout', 'fetch timeout and retry', {
        reason,
      });
      return retryFetch();
    }
    else {
      clearTimeout(timeoutId);
      throw reason;
    }
  }
}

/**
 * It fetches a JSON file from a URL, and returns the JSON data
 *
 * Example:
 *
 * ```ts
 * const productList = await getJson<ProductResponse>('/api/products', {queryParameters: {limit: 10}, timeout: 5_000});
 * ```
 */
export async function getJson<ResponseType extends Record<string | number, unknown>>(
    options: Partial<FetchOptions> & {url: string},
): Promise<ResponseType> {
  logger.logMethodArgs('getJson', {options});

  const response = await fetch(options);

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

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (options.retry! > 1) {
      data = await getJson(options);
    }
    else {
      throw err;
    }
  }

  return data;
}
