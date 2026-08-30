import {logger_} from './options.js';
import {handleRetryPattern_} from './retry.js';

import type {InternalFetchOptions_} from './type.js';

/**
 * Storage for tracking in-flight duplicate requests.
 */
const duplicateRequestStorage_: Map<string, Promise<Response>> = new Map();

/**
 * Computes a secure cache key for request deduplication.
 * Includes method, full URL, authorization header, and request body.
 *
 * @param options - Processed internal fetch options.
 * @returns Unique string identifier for the request intent.
 */
export function computeDedupeKey_(options: InternalFetchOptions_): string {
  const bodyString = typeof options.body === 'string' ? options.body : '';
  const auth = options.headers['authorization'] ?? '';
  return `${options.method} ${options.url} [auth:${auth}] [body:${bodyString}]`;
}

/**
 * Handles duplicate parallel request coalescing.
 *
 * If an identical request is already in-flight, returns a cloned response of the existing
 * promise to avoid redundant network round-trips.
 *
 * @param options - Processed internal fetch options.
 * @returns A promise resolving to an independent cloned `Response`.
 * @internal
 */
export async function handleRemoveDuplicate_(options: InternalFetchOptions_): Promise<Response> {
  if (options.removeDuplicate === 'never') {
    return handleRetryPattern_(options);
  }

  DEV_MODE && logger_.logMethod?.('handleRemoveDuplicate_');

  const cacheKey = computeDedupeKey_(options);

  let requestAsync = duplicateRequestStorage_.get(cacheKey);
  if (requestAsync == null) {
    requestAsync = handleRetryPattern_(options);
    duplicateRequestStorage_.set(cacheKey, requestAsync);
  }

  try {
    const response = await requestAsync;

    // Clean up stored promise for 'until_load' or failed responses
    if (!response.ok || options.removeDuplicate === 'until_load') {
      duplicateRequestStorage_.delete(cacheKey);
    }

    // Return a clone so every concurrent caller can independently consume the body
    return response.clone();
  } catch (err) {
    // If request failed, remove from storage immediately
    duplicateRequestStorage_.delete(cacheKey);
    throw err;
  }
}
