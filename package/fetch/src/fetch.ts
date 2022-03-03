import {createLogger, vatrRegisteredList} from '@vatr/logger';

const log = createLogger('vatr/fetch');
// const error = createLogger('vatr/fetch', 'error', true);

vatrRegisteredList.push({
  name: '@vatr/fetch',
  version: '{{VATR_VERSION}}',
});

declare global {
  // Patch typescript's global types
  interface AbortController {
    abort(reason?: string): void;
  }
  interface AbortSignal {
    reason?: string;
  }
}

// @TODO: docs for all options
export interface FetchOptions extends RequestInit
{
  /**
   * @default 10_000 ms
   */
  timeout?: number;
  bodyObject?: Record<string | number, unknown>;
  queryParameters?: Record<string, string | number | boolean>;
}

/**
 * Enhanced base fetch API.
 * @example
 * ```ts
 * const response = await fetch('/api/products', {
 *   timeout: 15_000,
 *   queryParameters: {
 *     limit: 10,
 *   },
 * });
 * const productList = await response.json();
 * ```
 */
export function fetch(url: string, options?: FetchOptions): Promise<Response> {
  log('fetch', url, options);

  if (!navigator.onLine) {
    throw new Error('vatr_fetch_offline');
  }

  options = {
    method: 'GET',
    timeout: 15_000,
    window: null,
    ...options,
  };

  if (options.queryParameters != null) {
    const queryArray = Object
        .keys(options.queryParameters)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map((key) => `${key}=${String(options!.queryParameters![key])}`);
    if (queryArray.length > 0) {
      url += '?' + queryArray.join('&');
    }
  }

  if (options.bodyObject != null) {
    options.body = JSON.stringify(options.bodyObject);
    options.headers ??= {};
    options.headers['Content-Type'] = 'application/json';
  }

  // @TODO: AbortController polyfill
  const abortController = new AbortController();
  const externalAbortSignal = options.signal;
  if (externalAbortSignal != null) {
    // Respect external abort signal
    externalAbortSignal.addEventListener('abort', () => {
      abortController.abort(`external abort signal: ${externalAbortSignal.reason}`);
    });
  }
  abortController.signal.addEventListener('abort', () => {
    log('fetch: aborted %s', abortController.signal.reason);
  });
  options.signal = abortController.signal;

  const timeoutId = setTimeout(() => abortController.abort(), options.timeout);

  // @TODO: browser fetch polyfill
  const response = window.fetch(url, options);
  response.then(() => clearTimeout(timeoutId));
  return response;
}

/**
 * Enhanced get data.
 * @example
 * ```ts
 * const response = await getData('/api/products', {limit: 10}, {timeout: 5_000});
 * const productList = await response.json();
 * ```
 */
export function getData(
    url: string,
    queryParameters?: Record<string | number, string | number | boolean>,
    options?: FetchOptions,
): Promise<Response> {
  return fetch(url, {
    queryParameters,
    ...options,
  });
}

/**
 * Enhanced fetch JSON.
 * @example
 * ```ts
 * const productList = await getJson('/api/products', {limit: 10}, {timeout: 5_000});
 * ```
 */
export async function getJson<ResponseType extends Record<string | number, unknown>>(
    url: string,
    queryParameters?: Record<string | number, string | number | boolean>,
    options?: FetchOptions,
): Promise<ResponseType> {
  const response = await getData(url, queryParameters, options);

  if (!response.ok) {
    throw new Error('vatr_fetch_nok');
  }

  return response.json() as Promise<ResponseType>;
}

/**
 * Enhanced post json data.
 * @example
 * ```ts
 * const promiseResponse = postData('/api/user/login', {
 *   username: 'demo',
 *   password: 'demo2005',
 * });
 * promiseResponse.then(() => console.log('username and password sent to server'));
 * ```
 */
export function postData(
    url: string,
    body: Record<string | number, unknown>,
    options?: FetchOptions,
): Promise<Response> {
  return fetch(url, {
    method: 'POST',
    bodyObject: body,
    ...options,
  });
}
