import {HttpStatusCodes, type HttpStatusCode} from '@alwatr/http-primer';

import {handleCacheStrategy_, logger_, processOptions_, cacheSupported} from './core.js';

import type {FetchOptions, ResponseError, ResponseSuccess} from './type.js';

export {cacheSupported};
export type * from './type.js';

/**
 * It's a wrapper around the browser's `fetch` function that adds retry pattern, timeout, cacheStrategy,
 * remove duplicates, etc.
 *
 * @see {@link FetchOptions}
 * @see {@link ResponseSuccess}
 * @see {@link ResponseError}
 *
 * @param options Fetch options.
 *
 * @returns A success or error response.
 *
 * @example
 * ```typescript
 * const responseJson = await fetchJson({
 *   url: '/api/products',
 *   queryParameters: {limit: 10},
 *   timeout: 8_000,
 *   retry: 3,
 *   cacheStrategy: 'stale_while_revalidate',
 *   cacheDuplicate: 'auto',
 * });
 * ```
 */
export async function fetchJson<T extends JsonObject>(options: FetchOptions): Promise<T | ResponseError> {
  let response;
  let responseText;
  let responseJson;

  try {
    response = await fetch(options);
    responseText = await response.text();
    responseJson = JSON.parse(responseText) as (ResponseError | ResponseSuccess<T>);
    if (responseJson.ok === false) {
      throw new Error(`fetch_response_nok`);
    }
    // responseJson.statusCode ??= response.status as HttpStatusCode;
    return responseJson;
  }
  catch (error) {
    const responseError: ResponseError = {
      ...responseJson,
      ok: false,
      statusCode: (response?.status as HttpStatusCode) ?? HttpStatusCodes.Error_Server_500_Internal_Server_Error,
      errorCode: (responseJson?.errorCode as string) ?? (error as Error).message,
      errorMessage: (responseJson?.errorMessage as string) ?? (error as Error).message,
      // responseText,
    };

    logger_.accident('fetchJson', 'fetch_json_failed', {responseError, error});
    return responseError;
  }
}

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
export function fetch(options: FetchOptions): Promise<Response> {
  options = processOptions_(options);
  logger_.logMethodArgs?.('fetch', {options});
  return handleCacheStrategy_(options as Required<FetchOptions>);
}
