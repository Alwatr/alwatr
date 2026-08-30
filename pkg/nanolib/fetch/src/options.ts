import {MimeTypes, type HttpMethod} from '@alwatr/http-primer';
import {createLogger} from '@alwatr/logger';
import {getGlobalThis} from '@alwatr/global-this';

import type {AlwatrFetchOptions_, FetchOptions, InternalFetchOptions_, QueryParams} from './type.js';

export const logger_ = createLogger('@alwatr/fetch');

export const globalThis_ = getGlobalThis();

/**
 * Immutable default options for all fetch requests.
 */
export const defaultFetchOptions: Readonly<AlwatrFetchOptions_> = {
  method: 'GET',
  timeout: 8_000,
  retry: 3,
  retryDelay: 1_000,
  removeDuplicate: 'never',
  cacheStrategy: 'network_only',
  cacheStorageName: 'fetch_cache',
  // headers: {}, // --- IGNORED ---
};

/**
 * Normalizes any standard `HeadersInit` into a fresh, isolated lowercase string record.
 *
 * @param headers - User-provided headers (plain object, Headers instance, or entries array).
 * @param baseHeaders - Optional base headers to merge with the user-provided headers.
 * @returns An isolated `Record<string, string>`.
 */
export function normalizeHeaders_(
  headers?: HeadersInit,
  baseHeaders: Record<string, string> = {},
): Record<string, string> {
  if (headers == null) {
    return baseHeaders;
  }

  if (typeof Headers !== 'undefined' && headers instanceof Headers) {
    headers.forEach((value, key) => {
      baseHeaders[key.toLowerCase()] = value;
    });
    return baseHeaders;
  }

  if (Array.isArray(headers)) {
    for (const [key, value] of headers) {
      if (typeof key === 'string' && typeof value === 'string') {
        baseHeaders[key.toLowerCase()] = value;
      }
    }
    return baseHeaders;
  }

  if (typeof headers === 'object') {
    for (const key of Object.keys(headers)) {
      const val = (headers as Record<string, unknown>)[key];
      if (val != null) {
        baseHeaders[key.toLowerCase()] = String(val);
      }
    }
  }

  return baseHeaders;
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
  let baseUrl = url;
  let hashPart = '';
  const hashIndex = url.indexOf('#');

  if (hashIndex !== -1) {
    baseUrl = url.slice(0, hashIndex);
    hashPart = url.slice(hashIndex);
  }

  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${queryString}${hashPart}`;
}

/**
 * Processes and sanitizes user-provided fetch options into a complete, isolated options object.
 *
 * @param url - The target URL.
 * @param options - User-provided options.
 * @returns Internal, complete, and isolated fetch options.
 * @internal
 */
export function processOptions_(url: string, options: FetchOptions = {}): InternalFetchOptions_ {
  DEV_MODE && logger_.logMethod?.('processOptions_');

  const processedUrl = appendQueryParams_(url, options.queryParams);

  const options_: InternalFetchOptions_ = {
    ...defaultFetchOptions,
    ...options,
    headers: normalizeHeaders_(options.headers),
    url: processedUrl,
    method: (options.method?.toUpperCase() as HttpMethod) ?? defaultFetchOptions.method,
  };

  options_.window ??= null;

  if (options_.cacheStrategy !== 'network_only' && options_.method !== 'GET' && options_.method !== 'HEAD') {
    options_.cacheStrategy = 'network_only';
  }

  if (options_.removeDuplicate === 'auto') {
    options_.removeDuplicate = typeof caches !== 'undefined' ? 'until_load' : 'always';
  }

  // JSON Body serialization
  if (options.bodyJson !== undefined) {
    options_.body = JSON.stringify(options.bodyJson);
    options_.headers['content-type'] = MimeTypes.JSON;
  }

  // Authorization header configuration
  if (options.bearerToken !== undefined) {
    options_.headers.authorization = `Bearer ${options.bearerToken}`;
  } else if (options.alwatrAuth !== undefined) {
    options_.headers.authorization = `Alwatr ${options.alwatrAuth.userId}:${options.alwatrAuth.userToken}`;
  }

  return options_;
}
