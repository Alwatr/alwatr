# @alwatr/fetch

[](https://www.npmjs.com/package/@alwatr/fetch)
[](https://www.npmjs.com/package/@alwatr/fetch)
[](https://github.com/Alwatr/nanolib/blob/next/packages/fetch/LICENSE)

`@alwatr/fetch` is an enhanced, lightweight, and dependency-free wrapper for the native `fetch` API. It provides modern features like caching strategies, request retries, timeouts, and intelligent duplicate request handling, all in a compact package.

It's designed to be a drop-in replacement for the standard `fetch` to instantly upgrade your application's network layer.

## Key Features

- **Retry Pattern**: Automatically retries failed requests on timeouts or server errors (5xx).
- **Request Timeout**: Aborts requests that take too long to complete.
- **Duplicate Handling**: Prevents sending identical parallel requests, returning a single response for all callers.
- **Caching Strategies**: Leverages the browser's Cache API with strategies like `stale_while_revalidate`.
- **Simplified API**: Send JSON and URL parameters with ease using `bodyJson` and `queryParams`.
- **TypeScript First**: Written entirely in TypeScript for a great developer experience.

## Installation

Install the package using your preferred package manager:

```bash
# npm
npm i @alwatr/fetch

# yarn
yarn add @alwatr/fetch

# pnpm
pnpm add @alwatr/fetch
```

## Quick Start

Import the `fetch` function and use it just like you would the native `fetch`. It accepts a URL and an options object with several powerful enhancements.

```typescript
import {fetch} from '@alwatr/fetch';

async function fetchProducts() {
  try {
    console.log('Fetching product list...');
    const response = await fetch('/api/products', {
      queryParams: {limit: 10, category: 'electronics'},
      cacheStrategy: 'stale_while_revalidate',
      timeout: '5s', // Use string duration
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Products:', data);
  }
  catch (error) {
    console.error('Failed to fetch products:', error);
  }
}

fetchProducts();
```

## API and Options

The `fetch` function takes a `url` string and an `options` object. The options object extends the standard `RequestInit` and adds several custom options for enhanced control.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `method` | `HttpMethod` | `'GET'` | The HTTP request method. |
| `headers` | `HttpRequestHeaders` | `{}` | An object representing the request's headers. |
| `timeout` | `Duration` | `8_000` (8s) | Request timeout in milliseconds or as a duration string (e.g., `'5s'`). Set to `0` to disable. |
| `retry` | `number` | `3` | Number of retries if the request fails with a server error (5xx) or times out. |
| `retryDelay` | `Duration` | `1_000` (1s) | Delay between retry attempts in milliseconds or as a duration string. |
| `removeDuplicate` | `'never' \| 'always' \| 'until_load' \| 'auto'` | `'never'` | Strategy for handling identical parallel requests. `body` is included for uniqueness. |
| `cacheStrategy` | `'network_only' \| 'network_first' \| ...` | `'network_only'` | Caching strategy using the browser's Cache API. |
| `cacheStorageName`| `string` | `'fetch_cache'` | Custom name for the `CacheStorage` instance. |
| `revalidateCallback`| `(response: Response) => void`| `undefined` | Callback executed with the new response when using `stale_while_revalidate` strategy. |
| `bodyJson` | `Json` | `undefined` | A JavaScript object sent as the request body. Sets `Content-Type` to `application/json`. |
| `queryParams` | `Dictionary` | `undefined` | An object of query parameters appended to the URL. |
| `bearerToken` | `string` | `undefined` | A bearer token added to the `Authorization` header. |
| `alwatrAuth` | `{userId: string; userToken: string}` | `undefined` | Alwatr-specific authentication credentials. |

... and all other standard `RequestInit` properties like `signal`, `credentials`, etc.

-----

## Features in Detail

### Query Parameters

The `queryParams` option simplifies adding search parameters to your request URL.

```typescript
// This will make a GET request to:
// /api/users?page=2&sort=asc
const response = await fetch('/api/users', {
  queryParams: {
    page: 2,
    sort: 'asc',
  },
});
```

### JSON Body

Use `bodyJson` to send a JavaScript object as a JSON payload. The `Content-Type` header is automatically set to `application/json`.

```typescript
// This will make a POST request to /api/orders with a JSON body
const response = await fetch('/api/orders', {
  method: 'POST',
  bodyJson: {
    productId: 'xyz-123',
    quantity: 2,
  },
});
```

### Timeout

Set a timeout for your requests. If the request takes longer than the specified duration, it will be aborted, and the promise will reject with a `fetch_timeout` error.

```typescript
await fetch('/api/slow-endpoint', {
  timeout: '2.5s', // You can use duration strings
});
```

### Retry Pattern

The fetch operation will automatically retry on server errors (5xx status codes) or timeouts.

```typescript
// Retry up to 5 times, with a 2-second delay between each attempt
await fetch('/api/flaky-service', {
  retry: 5,
  retryDelay: '2s',
});
```

### Duplicate Request Handling

The `removeDuplicate` option prevents multiple identical requests from being sent simultaneously. The uniqueness of a request is determined by its method, URL, and body.

- `'never'` (default): Does nothing.
- `'until_load'`: Caches the `Promise` of a request until it resolves. Subsequent identical requests will receive a clone of the first response.
- `'always'`: Caches the response indefinitely (for the lifetime of the application).
- `'auto'`: Uses `'until_load'` if the Cache API is available, otherwise `'always'`.

```typescript
// Both calls will result in only ONE network request.
// The second call will receive the response from the first.
const [res1, res2] = await Promise.all([
  fetch('/api/data', {removeDuplicate: 'until_load'}),
  fetch('/api/data', {removeDuplicate: 'until_load'}),
]);
```

### Cache Strategies

Leverage the browser's Cache API with `cacheStrategy`.

- `'network_only'` (default): Standard fetch behavior; no caching.
- `'cache_first'`: Serves from cache if available. Otherwise, fetches from the network and caches the result.
- `'network_first'`: Fetches from the network first. If the network fails, it falls back to the cache.
- `'stale_while_revalidate'`: The fastest strategy. It serves stale content from the cache immediately while sending a network request in the background to update the cache for the next time.

```typescript
// Serve news from cache instantly, but update it in the background for the next visit.
const response = await fetch('/api/news', {
  cacheStrategy: 'stale_while_revalidate',
  revalidateCallback: (freshResponse) => {
    console.log('Cache updated with fresh data!');
    // You can use freshResponse to update the UI if needed
  },
});
```

### Authentication

Easily add authentication headers with `bearerToken` or the `alwatrAuth` scheme.

```typescript
// Using a Bearer Token
await fetch('/api/secure/data', {
  bearerToken: 'your-jwt-token-here',
});

// Using Alwatr's authentication scheme
await fetch('/api/secure/data', {
  alwatrAuth: {
    userId: 'user-id',
    userToken: 'user-auth-token',
  },
});
```

## Sponsors

The following companies, organizations, and individuals support Nanolib's ongoing maintenance and development. Become a Sponsor to get your logo on our README and website.

## Contributing

Contributions are welcome\! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.
