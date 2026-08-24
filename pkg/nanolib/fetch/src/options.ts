import {MimeTypes} from '@alwatr/http-primer';
import {createLogger} from '@alwatr/logger';
import {hasOwn} from '@alwatr/has-own';
import {getGlobalThis} from '@alwatr/global-this';

import type {AlwatrFetchOptions_, FetchOptions, FetchOptions__, QueryParams} from './type.js';

export const logger_ = createLogger('@alwatr/fetch');

export const globalThis_ = getGlobalThis();

/**
 * A boolean flag indicating whether the browser's Cache API is supported.
 */
export const cacheSupported = /* #__PURE__ */ hasOwn(globalThis_, 'caches');

/**
 * Normalizes any standard `HeadersInit` into a fresh, isolated lowercase string record.
 *
 * @param headers - User-provided headers (plain object, Headers instance, or entries array).
 * @returns An isolated `Record<string, string>`.
 */
export function normalizeHeaders_(headers?: HeadersInit): Record<string, string> {
  const result: Record<string, string> = {};

  if (headers == null) {
    return result;
  }

  if (typeof Headers !== 'undefined' && headers instanceof Headers) {
    headers.forEach((value, key) => {
      result[key.toLowerCase()] = value;
    });
    return result;
  }

  if (Array.isArray(headers)) {
    for (const [key, value] of headers) {
      if (typeof key === 'string' && typeof value === 'string') {
        result[key.toLowerCase()] = value;
      }
    }
    return result;
  }

  if (typeof headers === 'object') {
    for (const key of Object.keys(headers)) {
      const val = (headers as Record<string, unknown>)[key];
      if (val !== undefined && val !== null) {
        result[key.toLowerCase()] = String(val);
      }
    }
  }

  return result;
}

/**
 * Serializes query parameters into a query string.
 *
 * @param queryParams - Dictionary of query parameters.
 * @returns Serialized URL query string (without leading `?` or `&`).
 */
export function serializeQueryParams_(queryParams: QueryParams): string {
  const parts: string[] = [];

  for (const key of Object.keys(queryParams)) {
    const value = queryParams[key];
    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== undefined && item !== null) {
          parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`);
        }
      }
    } else {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  }

  return parts.join('&');
}

/**
 * Appends query parameters to a URL, correctly respecting existing query parameters and hash anchors.
 *
 * @param url - The target URL.
 * @param queryParams - Query parameters to append.
 * @returns The resulting URL string.
 */
export function appendQueryParams_(url: string, queryParams?: QueryParams): string {
  if (queryParams == null) {
    return url;
  }

  const queryString = serializeQueryParams_(queryParams);
  if (queryString.length === 0) {
    return url;
  }

  // Handle hash fragment if present in URL
  const hashIndex = url.indexOf('#');
  let baseUrl = url;
  let hashPart = '';

  if (hashIndex !== -1) {
    baseUrl = url.slice(0, hashIndex);
    hashPart = url.slice(hashIndex);
  }

  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${queryString}${hashPart}`;
}

/**
 * Default options for all fetch requests. These can be overridden by passing
 * a custom `options` object to the `fetch` function.
 */
const defaultFetchOptions: AlwatrFetchOptions_ = {
  method: 'GET',
  headers: {},
  timeout: 8_000,
  retry: 3,
  retryDelay: 1_000,
  removeDuplicate: 'never',
  cacheStrategy: 'network_only',
  cacheStorageName: 'fetch_cache',
};

/**
 * Processes and sanitizes the fetch options.
 *
 * @param {string} url - The URL to fetch.
 * @param {FetchOptions} options - The user-provided options.
 * @returns {FetchOptions__} The processed and complete fetch options.
 * @private
 */
export function _processOptions(url: string, options: FetchOptions): FetchOptions__ {
  DEV_MODE && logger_.logMethodArgs?.('_processOptions', {url, options});

  const options_: FetchOptions__ = {
    ...defaultFetchOptions,
    ...options,
    // Headers must be private per request: the object is mutated below
    // (content-type, authorization), and both the module-level default and a
    // caller-supplied object would otherwise accumulate headers across calls
    // — leaking one request's credential onto every later one.
    headers: {
      ...defaultFetchOptions.headers,
      ...options.headers,
    },
    url,
  };

  options_.window ??= null;

  if (options_.removeDuplicate === 'auto') {
    options_.removeDuplicate = cacheSupported ? 'until_load' : 'always';
  }

  // Append query parameters to the URL if they are provided and the URL doesn't already have them.
  if (options_.url.lastIndexOf('?') === -1 && options_.queryParams != null) {
    const queryParams = options_.queryParams;
    // prettier-ignore
    const queryArray = Object
      .keys(queryParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(String(queryParams[key]))}`);

    if (queryArray.length > 0) {
      options_.url += '?' + queryArray.join('&');
    }
  }

  // If `bodyJson` is provided, stringify it and set the appropriate 'Content-Type' header.
  if (options_.bodyJson !== undefined) {
    options_.body = JSON.stringify(options_.bodyJson);
    options_.headers['content-type'] = MimeTypes.JSON;
  }

  // Set the 'Authorization' header for bearer tokens or Alwatr's authentication scheme.
  if (options_.bearerToken !== undefined) {
    options_.headers.authorization = `Bearer ${options_.bearerToken}`;
  } else if (options_.alwatrAuth !== undefined) {
    options_.headers.authorization = `Alwatr ${options_.alwatrAuth.userId}:${options_.alwatrAuth.userToken}`;
  }

  DEV_MODE && logger_.logProperty?.('fetch.options', options_);

  return options_;
}
