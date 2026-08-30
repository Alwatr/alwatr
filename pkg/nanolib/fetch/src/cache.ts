import {FetchError} from './error.js';
import {handleRemoveDuplicate_} from './dedupe.js';
import {logger_} from './options.js';

import type {InternalFetchOptions_} from './type.js';

/**
 * Executes the caching lifecycle according to `cacheStrategy`.
 *
 * Interacts safely with Cache API:
 * - Falls back to network when Cache API is unavailable or throws.
 * - Guards against caching non-GET requests.
 * - Clones responses before storing to keep response bodies consumable.
 *
 * @param options - Processed internal fetch options.
 * @returns A promise resolving to a cached or freshly fetched `Response`.
 * @internal
 */
export async function handleCacheStrategy_(options: InternalFetchOptions_): Promise<Response> {
  if (options.cacheStrategy === 'network_only') {
    return handleRemoveDuplicate_(options);
  }

  DEV_MODE && logger_.logMethod?.('handleCacheStrategy_');

  let cacheStorage: Cache;
  try {
    cacheStorage = await caches.open(options.cacheStorageName);
  } catch (err) {
    DEV_MODE && logger_.accident('handleCacheStrategy_', 'cache_open_failed', {err});
    options.cacheStrategy = 'network_only';
    return handleRemoveDuplicate_(options);
  }

  const request = new Request(options.url, options);

  switch (options.cacheStrategy) {
    case 'cache_first': {
      try {
        const cachedResponse = await cacheStorage.match(request);
        if (cachedResponse != null) {
          return cachedResponse;
        }
      } catch (err) {
        DEV_MODE && logger_.accident('handleCacheStrategy_', 'cache_match_failed', {err});
      }

      const response = await handleRemoveDuplicate_(options);
      if (response.ok) {
        try {
          await cacheStorage.put(request, response.clone());
        } catch {
          // ignore cache put failures
        }
      }
      return response;
    }

    case 'cache_only': {
      let cachedResponse: Response | undefined;
      try {
        cachedResponse = await cacheStorage.match(request);
      } catch (err) {
        DEV_MODE && logger_.accident('handleCacheStrategy_', 'cache_only_match_failed', {err});
      }

      if (cachedResponse == null) {
        throw new FetchError('cache_not_found', 'Resource not found in cache');
      }
      return cachedResponse;
    }

    case 'network_first': {
      try {
        const networkResponse = await handleRemoveDuplicate_(options);
        if (networkResponse.ok) {
          try {
            await cacheStorage.put(request, networkResponse.clone());
          } catch {
            // ignore cache put failures
          }
        }
        return networkResponse;
      } catch (err) {
        try {
          const cachedResponse = await cacheStorage.match(request);
          if (cachedResponse != null) {
            return cachedResponse;
          }
        } catch {
          // ignore cache match error and throw original error
        }
        throw err;
      }
    }

    case 'update_cache': {
      const networkResponse = await handleRemoveDuplicate_(options);
      if (networkResponse.ok) {
        try {
          await cacheStorage.put(request, networkResponse.clone());
        } catch {
          // ignore cache put failures
        }
      }
      return networkResponse;
    }

    case 'stale_while_revalidate': {
      let cachedResponse: Response | undefined;
      try {
        cachedResponse = await cacheStorage.match(request);
      } catch {
        // ignore cache match error
      }

      const fetchedResponsePromise = handleRemoveDuplicate_(options).then(async (networkResponse) => {
        if (networkResponse.ok) {
          try {
            await cacheStorage.put(request, networkResponse.clone());
          } catch {
            // ignore cache put failures
          }
          if (typeof options.revalidateCallback === 'function') {
            setTimeout(options.revalidateCallback, 0, networkResponse.clone());
          }
        }
        return networkResponse;
      });

      return cachedResponse ?? fetchedResponsePromise;
    }

    default: {
      return handleRemoveDuplicate_(options);
    }
  }
}
