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

// @TODO: docs for all options
export interface FetchOptions extends RequestInit {
  /**
   * @default 10_000 ms
   */
  timeout?: number;
  bodyJson?: Record<string | number, unknown>;
  queryParameters?: Record<string, string | number | boolean>;
}

/**
 * Enhanced Fetch API.
 *
 * Example:
 *
 * ```ts
 * const response = await fetch(url, {timeout: 5_000, bodyObject: {a: 1, b: 2}});
 * ```
 */
export function fetch(url: string, options?: FetchOptions): Promise<Response> {
  logger.logMethodArgs('fetch', {url, options});

  // if (!navigator.onLine) {
  //   logger.accident('fetch', 'abort_signal', 'abort signal received', {url});
  //   throw new Error('fetch_offline');
  // }

  options = {
    method: 'GET',
    timeout: 10_000,
    window: null,
    ...options,
  };

  if (options.queryParameters != null) {
    // prettier-ignore
    const queryArray = Object
        .keys(options.queryParameters)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map((key) => `${key}=${String(options!.queryParameters![key])}`);

    if (queryArray.length > 0) {
      url += '?' + queryArray.join('&');
    }
  }

  if (options.bodyJson != null) {
    options.body = JSON.stringify(options.bodyJson);
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json',
    };
  }

  // @TODO: AbortController polyfill
  const abortController = new AbortController();
  const externalAbortSignal = options.signal;
  options.signal = abortController.signal;

  const timeoutId = setTimeout(() => abortController.abort('fetch_timeout'), options.timeout);

  if (externalAbortSignal != null) {
    // Respect external abort signal
    externalAbortSignal.addEventListener('abort', () => {
      abortController.abort(`external abort signal: ${externalAbortSignal.reason}`);
      clearTimeout(timeoutId);
    });
  }

  abortController.signal.addEventListener('abort', () => {
    logger.incident('fetch', 'abort_signal', 'abort signal received', {
      url,
      reason: abortController.signal.reason,
    });
  });

  // @TODO: browser fetch polyfill
  const response = window.fetch(url, options);
  response.then(() => clearTimeout(timeoutId));
  return response;
}

/**
 * Get JSON Data with Enhanced Fetch API.
 *
 * Example:
 *
 * ```ts
 * const productList = await getJson<ProductResponse>('/api/products', {queryParameters: {limit: 10}, timeout: 5_000});
 * ```
 */
export async function getJson<ResponseType extends Record<string | number, unknown>>(
    url: string,
    options?: FetchOptions,
): Promise<ResponseType> {
  logger.logMethodArgs('getJson', {url, options});

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('fetch_nok');
  }

  return response.json() as Promise<ResponseType>;
}

/**
 * Post JSON Data with Enhanced Fetch API.
 *
 * Example:
 *
 * ```ts
 * const response = await postJson('/api/product/new', {name: 'foo', ...});
 * ```
 */
export function postJson(
    url: string,
    bodyJson: Record<string | number, unknown>,
    options?: FetchOptions,
): Promise<Response> {
  logger.logMethod('postJson');

  return fetch(url, {
    method: 'POST',
    bodyJson,
    ...options,
  });
}
