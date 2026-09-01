import {MimeTypes, type HttpMethod} from '@alwatr/http-primer';
import {createLogger} from '@alwatr/logger';
import {getGlobalThis} from '@alwatr/global-this';
import {parseDuration} from '@alwatr/parse-duration';

import type {FetchOptions, InternalFetchOptions_, QueryParams} from './type.js';

export const logger_ = createLogger('@alwatr/fetch');

export const globalThis_ = getGlobalThis();

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
    if (value == null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item != null) {
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
 * Processes, sanitizes, and normalizes user-provided fetch options into a complete, isolated options object.
 *
 * @param url - The target URL.
 * @param options - User-provided options.
 * @returns Internal, complete, and isolated fetch options.
 * @internal
 */
export function processOptions_(url: string, options: FetchOptions = {}): InternalFetchOptions_ {
  DEV_MODE && logger_.logMethod?.('processOptions_');

  const options_: InternalFetchOptions_ = {
    // URL
    url: appendQueryParams_(url, options.queryParams),

    // AlwatrFetchOptions_
    method: (options.method?.toUpperCase() as HttpMethod) ?? 'GET',
    headers: normalizeHeaders_(options.headers),
    timeout: parseDuration(options.timeout ?? 8_000),
    retryDelay: parseDuration(options.retryDelay ?? 1_000),
    retry:
      typeof options.retry === 'number' && Number.isFinite(options.retry) ? Math.max(1, Math.floor(options.retry)) : 3,
    removeDuplicate: options.removeDuplicate ?? 'never',
    cacheStrategy: options.cacheStrategy ?? 'network_only',
    cacheStorageName: options.cacheStorageName ?? 'fetch_cache',
    revalidateCallback: options.revalidateCallback,
    bodyJson: options.bodyJson,
    queryParams: options.queryParams,
    bearerToken: options.bearerToken,
    alwatrAuth: options.alwatrAuth,

    // RequestInit Standard Options
    body: options.body,
    cache: options.cache,
    credentials: options.credentials,
    integrity: options.integrity,
    keepalive: options.keepalive,
    mode: options.mode,
    priority: options.priority,
    redirect: options.redirect,
    referrer: options.referrer,
    referrerPolicy: options.referrerPolicy,
    signal: options.signal,
    window: options.window ?? null,
  };

  // Cache API Preconditions: requires Cache API runtime support and cacheable HTTP method (GET/HEAD)
  if (
    options_.cacheStrategy !== 'network_only'
    && (typeof caches === 'undefined' || (options_.method !== 'GET' && options_.method !== 'HEAD'))
  ) {
    DEV_MODE
      && logger_.incident?.('processOptions_', 'fetch_cache_strategy_unsupported', {
        method: options_.method,
        cacheStrategy: options_.cacheStrategy,
        hasCaches: typeof caches !== 'undefined',
      });
    options_.cacheStrategy = 'network_only';
  }

  // Deduplication auto selection
  if (options_.removeDuplicate === 'auto') {
    options_.removeDuplicate = typeof caches !== 'undefined' ? 'until_load' : 'always';
  }

  // JSON Body serialization
  if (options.bodyJson != null) {
    options_.body = JSON.stringify(options.bodyJson);
    options_.headers['content-type'] = MimeTypes.JSON;
  }

  // Authorization header configuration
  if (options.bearerToken != null) {
    options_.headers.authorization = `Bearer ${options.bearerToken}`;
  } else if (options.alwatrAuth != null) {
    options_.headers.authorization = `Alwatr ${options.alwatrAuth.userId}:${options.alwatrAuth.userToken}`;
  }

  return options_;
}
