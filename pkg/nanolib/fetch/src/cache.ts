import {FetchError} from './error.js';
import {handleRemoveDuplicate_} from './dedupe.js';
import {cacheSupported, logger_} from './options.js';
import type {FetchOptions__} from './type.js';

export {cacheSupported};

/**
 * Manages caching strategies for the fetch request.
 * If the strategy is `network_only`, it bypasses caching and proceeds to the next step.
 * Otherwise, it interacts with the browser's Cache API based on the selected strategy.
 *
 * @param {FetchOptions__} options - The fully configured fetch options.
 * @returns {Promise<Response>} A promise resolving to a `Response` object, either from the cache or the network.
 * @private
 */
export async function handleCacheStrategy_(options: FetchOptions__): Promise<Response> {
  if (options.cacheStrategy === 'network_only') {
    return handleRemoveDuplicate_(options);
  }
  // else

  DEV_MODE && logger_.logMethod?.('handleCacheStrategy_');

  if (!cacheSupported) {
    DEV_MODE
      && logger_.incident?.('fetch', 'fetch_cache_strategy_unsupported', {
        cacheSupported,
      });
    // Fallback to network_only if Cache API is not available.
    options.cacheStrategy = 'network_only';
    return handleRemoveDuplicate_(options);
  }
  // else

  const cacheStorage = await caches.open(options.cacheStorageName);

  const request = new Request(options.url, options);

  switch (options.cacheStrategy) {
    case 'cache_first': {
      const cachedResponse = await cacheStorage.match(request);
      if (cachedResponse != null) {
        return cachedResponse;
      }
      // else

      const response = await handleRemoveDuplicate_(options);
      if (response.ok) {
        cacheStorage.put(request, response.clone());
      }
      return response;
    }

    case 'cache_only': {
      const cachedResponse = await cacheStorage.match(request);
      if (cachedResponse == null) {
        throw new FetchError('cache_not_found', 'Resource not found in cache');
      }
      // else

      return cachedResponse;
    }

    case 'network_first': {
      try {
        const networkResponse = await handleRemoveDuplicate_(options);
        if (networkResponse.ok) {
          cacheStorage.put(request, networkResponse.clone());
        }
        return networkResponse;
      } catch (err) {
        const cachedResponse = await cacheStorage.match(request);
        if (cachedResponse != null) {
          return cachedResponse;
        }
        // else

        throw err;
      }
    }

    case 'update_cache': {
      const networkResponse = await handleRemoveDuplicate_(options);
      if (networkResponse.ok) {
        cacheStorage.put(request, networkResponse.clone());
      }
      return networkResponse;
    }

    case 'stale_while_revalidate': {
      const cachedResponse = await cacheStorage.match(request);
      const fetchedResponsePromise = handleRemoveDuplicate_(options).then((networkResponse) => {
        if (networkResponse.ok) {
          cacheStorage.put(request, networkResponse.clone());
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
