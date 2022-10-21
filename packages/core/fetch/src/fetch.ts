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
   * A timeout for the fetch request.
   *
   * @default 5000 ms
   */
  timeout?: number;
  /**
   * If fetch response not acceptable or timed out, it will retry the request.
   *
   * @default 3
   */
  retry?: number;

  bodyJson?: Record<string | number, unknown>;
  queryParameters?: Record<string, string | number | boolean>;
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
export async function fetch(url: string, options: FetchOptions = {}): Promise<Response> {
  logger.logMethodArgs('fetch', {url, options});

  // if (!navigator.onLine) {
  //   logger.accident('fetch', 'abort_signal', 'abort signal received', {url});
  //   throw new Error('fetch_offline');
  // }

  options.method ??= 'GET';
  options.timeout ??= 5_000;
  options.retry ??= 3;
  options.window ??= null;

  if (url.lastIndexOf('?') === -1 && options.queryParameters != null) {
    // prettier-ignore
    const queryArray = Object
        .keys(options.queryParameters)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map((key) => `${key}=${String(options.queryParameters![key])}`);

    if (queryArray.length > 0) {
      url += '?' + queryArray.join('&');
    }
  }

  if (options.body != null && options.bodyJson != null) {
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
    logger.incident('fetch', 'abort_signal', 'abort signal received', {
      url,
      reason: abortController.signal.reason,
    });
  });

  let response: Response;

  const retryFetch = (): Promise<Response> => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    options.retry!--;
    options.signal = externalAbortSignal;
    return fetch(url, options);
  };

  try {
    // @TODO: browser fetch polyfill
    response = await window.fetch(url, options);
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
    url: string,
    options: FetchOptions = {},
): Promise<ResponseType> {
  logger.logMethodArgs('getJson', {url, options});

  const response = await fetch(url, options);

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
      data = await getJson(url, options);
    }
    else {
      throw err;
    }
  }

  return data;
}

/**
 * It takes a URL, a JSON object, and an optional FetchOptions object, and returns a Promise of a
 * Response object
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
