# Alwatr Fetch - `@alwatr/fetch`

Enhanced fetch API with cache strategy, retry pattern, timeout, helper methods and enhanced types written in tiny TypeScript, ES module.

## Example usage

### `fetch(options: FetchOptions): Promise<Response>`

It's a wrapper around the browser's `fetch` function that adds retry pattern with timeout and cacheStrategy.

```ts
import {fetch} from 'https://esm.run/@alwatr/fetch';

const response = await fetch({
  url: '/api/products',
  queryParameters: {limit: 10},
  timeout: 5_000,
  retry: 3,
  cacheStrategy: 'stale_while_revalidate',
});

if (!response.ok) throw new Error('fetch_failed');

const productList = await response.json();

console.log(productList);
```

### Fetch Options

`FetchOptions` inherited from the [fetch standard parameters](https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters) and some other...

- `url`: Request URL.
- `bodyJson`: Body as JS Object.
- `queryParameters`: URL Query Parameters as JS Object.
- `timeout`: A timeout in ms for the fetch request (default `10_000`ms).
- `retry`: If fetch response not acceptable or timed out, it will retry the request (default `3`).
- `retryDelay`: Delay before each retries (default `1_000`).
- `removeDuplicate`: Simple memory caching for remove duplicate/parallel requests (default `never`).
  - `never`: Never use memory caching.
  - `always`: Always use memory caching and remove all duplicate requests (just by method+url).
  - `until_load`: Cache parallel requests until request completed (it will be removed after the promise resolved).
  - `auto`: If CacheStorage was supported use `until_load` strategy else use `always`.
- `cacheStrategy`: Strategies for caching (default `network_only`).
  - `network_only`: Only network request without any cache.
  - `network_first`: Network first, falling back to cache.
  - `cache_only`: Cache only without any network request.
  - `cache_first`: Cache first, falling back to network.
  - `stale_while_revalidate`: Fastest strategy, Use cached first but always request network to update the cache.
- `revalidateCallback`: Revalidate callback for `stale_while_revalidate` cache strategy.
- `cacheStorageName`: Cache storage custom name (default `alwatr_fetch_cache`).

[Read more about standard cache strategies](https://developer.chrome.com/docs/workbox/caching-strategies-overview/#caching-strategies)
