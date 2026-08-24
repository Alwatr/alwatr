import {logger_} from './options.js';
import {handleRetryPattern_} from './retry.js';

import type {FetchOptions__} from './type.js';

/**
 * A simple in-memory storage for tracking and managing duplicate in-flight requests.
 * The key is a unique identifier for the request (e.g., method + URL + body),
 * and the value is the promise of the ongoing fetch operation.
 */
const duplicateRequestStorage_: Record<string, Promise<Response>> = {};

/**
 * Handles duplicate request elimination.
 *
 * It creates a unique key based on the request method, URL, and body. If a request with the
 * same key is already in flight, it returns the promise of the existing request instead of
 * creating a new one. This prevents redundant network calls for identical parallel requests.
 *
 * @param {FetchOptions__} options - The fully configured fetch options.
 * @returns {Promise<Response>} A promise resolving to a cloned `Response` object.
 * @private
 */
export async function handleRemoveDuplicate_(options: FetchOptions__): Promise<Response> {
  if (options.removeDuplicate === 'never') {
    return handleRetryPattern_(options);
  }
  // else

  DEV_MODE && logger_.logMethod?.('handleRemoveDuplicate_');

  // Create a unique key for the request. Including the body is crucial to differentiate
  // between requests to the same URL but with different payloads (e.g., POST requests).
  const bodyString = typeof options.body === 'string' ? options.body : '';
  const cacheKey = `${options.method} ${options.url} ${bodyString}`;

  // If a request with the same key doesn't exist, create it and store its promise.
  duplicateRequestStorage_[cacheKey] ??= handleRetryPattern_(options);

  try {
    // Await the shared promise to get the response.
    const response = await duplicateRequestStorage_[cacheKey];

    // Clean up the stored promise based on the removal strategy.
    if (duplicateRequestStorage_[cacheKey] != null) {
      if (response.ok !== true || options.removeDuplicate === 'until_load') {
        // Remove after completion for 'until_load' or if the request failed.
        delete duplicateRequestStorage_[cacheKey];
      }
    }

    // Return a clone of the response, so each caller can consume the body independently.
    return response.clone();
  } catch (err) {
    // If the request fails, remove it from storage to allow for retries.
    delete duplicateRequestStorage_[cacheKey];
    throw err;
  }
}
