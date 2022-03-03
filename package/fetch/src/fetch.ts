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
  queryParamList?: Record<string, string | number | boolean>;
}

/**
 * Enhanced fetch API.
 * @example const response = await fetchData(url, {jsonResponse: false});
 */
export function fetchData(url: string, options?: FetchOptions): Promise<Response> {
  log('fetchData', url, options);

  if (!navigator.onLine) {
    throw new Error('vatr_fetch_offline');
  }

  options = {
    method: 'GET',
    timeout: 10_000,
    window: null,
    ...options,
  };

  if (options.queryParamList != null) {
    const queryArray = Object
        .keys(options.queryParamList)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map((key) => `${key}=${String(options!.queryParamList![key])}`)
    ;
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
    log('fetchData: aborted %s', abortController.signal.reason);
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
 * const response = await postData('/api/products', {limit: 10}, {timeout: 5_000});
 */
export function getData(
    url: string,
    queryParameters?: Record<string | number, string | number | boolean>,
    options?: FetchOptions,
): Promise<Response> {
  return fetchData(url, {
    queryParameters,
    ...options,
  });
}
/**
 * Enhanced fetch JSON.
 * @example
 * const json = await fetchJson<ProductList>('/api/products', {timeout: 5_000, queryParamList: {limit: 10}});
 */
export async function fetchJson<ResponseType extends Record<string | number, unknown>>(
    url: string,
    options?: FetchOptions,
): Promise<ResponseType> {
  const response = await fetchData(url, options);

  if (!response.ok) {
    throw new Error('vatr_fetch_nok');
  }

  return response.json() as Promise<ResponseType>;
}

/**
 * Enhanced post json data.
 * @example
 * const response = await postData('/api/product/new', {name: 'foo', ...});
 */
export function postData(
    url: string,
    body: Record<string | number, unknown>,
    options?: FetchOptions,
): Promise<Response> {
  return fetchData(url, {
    method: 'POST',
    bodyObject: body,
    ...options,
  });
}
