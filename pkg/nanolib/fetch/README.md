# @alwatr/fetch

![@alwatr/fetch](./demo/alwatr-fetch.webp)

`@alwatr/fetch` is an enhanced, lightweight, and dependency-free wrapper for the native `fetch` API. It provides modern features like granular semantic error reporting, Go-style tuple returns, caching strategies, intelligent request retries with `Retry-After` support, timeouts, multi-tenant duplicate request coalescing, and header isolation—all in a compact package.

It is designed to be a production-ready replacement for standard `fetch` to instantly upgrade your application's network layer.

---

## Key Features

- **Go-Style Error Handling**: Returns a tuple `[Response, null]` (or `[T, null]` for `fetchJson`) on success or `[null, FetchError]` on failure—never throws exceptions.
- **Categorized Error Reasons**: Structured, high-level error classification (`http_client_error`, `http_server_error`, `network_error`, `request_timeout`, `request_aborted`, `cache_miss`, `json_parse_error`, `json_response_not_ok`) paired with exact numeric `error.status`.
- **`fetchJson<T>` Helper**: Directly parses JSON payloads with unconstrained generic typing (`T`), optional `ok: true` verification (`requireJsonResponseWithOkTrue`), and detailed parsing error feedback.
- **Smart Retry Pattern**: Automatically retries failed requests on transient server errors (5xx), `429 Too Many Requests`, `408 Request Timeout`, or network failures, automatically respecting `Retry-After` headers.
- **Header Isolation & Security**: Guarantees zero header pollution across requests, protects caller-supplied header objects from mutation, and isolates multi-tenant request deduplication by authorization token.
- **Request Timeout**: Aborts requests exceeding the specified timeout duration with automatic resource and listener cleanup.
- **Duplicate Coalescing**: Prevents redundant in-flight network round-trips for identical parallel requests (`removeDuplicate`).
- **Caching Strategies**: Leverages the browser's Cache API with strategies like `stale_while_revalidate`, `network_first`, `cache_first`, and `update_cache`.
- **Option Normalization Boundary**: Pre-processes and sanitizes all options (duration strings, header casing, non-cacheable HTTP methods, offline detection) at the ingestion boundary (`processOptions_`).

---

## Installation

Install the package using your preferred package manager:

```bash
# bun
bun add @alwatr/fetch

# npm
npm i @alwatr/fetch

# pnpm
pnpm add @alwatr/fetch
```

---

## Quick Start

### 1. Standard Response Fetch (`fetch`)

```typescript
import {fetch} from '@alwatr/fetch';

async function fetchProducts() {
  const [response, error] = await fetch('/api/products', {
    queryParams: {limit: 10, category: 'electronics'},
    cacheStrategy: 'stale_while_revalidate',
    timeout: '5s',
  });

  if (error) {
    if (error.reason === 'http_client_error' && error.status === 404) {
      console.warn('Products category not found');
    } else {
      console.error('Failed to fetch products:', error.message, error.reason);
    }
    return;
  }

  // response is guaranteed to be valid and ok (2xx)
  const data = await response.json();
  console.log('Products:', data);
}

fetchProducts();
```

### 2. Typed JSON Fetch (`fetchJson`)

Use `fetchJson<T>` to fetch and parse JSON responses in a single step with full generic type safety:

```typescript
import {fetchJson} from '@alwatr/fetch';

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

async function loadProfile(userId: string) {
  const [user, error] = await fetchJson<UserProfile>(`/api/users/${userId}`, {
    bearerToken: 'my-jwt-token',
    timeout: '3s',
  });

  if (error) {
    if (error.reason === 'http_client_error' && error.status === 401) {
      console.error('Session expired, please log in again.');
    } else if (error.reason === 'http_server_error') {
      console.error('Server error, please try again later.');
    }
    return;
  }

  // user is typed as UserProfile
  console.log('User Name:', user.name);
}
```

---

## Error Handling & Semantic Reasons

`@alwatr/fetch` uses a **Go-style tuple return pattern** instead of throwing runtime exceptions.

### Return Tuples

- **`fetch(url, options)`**: `Promise<[Response, null] | [null, FetchError]>`
- **`fetchJson<T>(url, options)`**: `Promise<[T, null] | [null, FetchError]>`

### `FetchError` Class Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `reason` | `FetchErrorReason` | Categorized error reason identifier. |
| `response` | `Response \| undefined` | The underlying HTTP `Response` object (if available). |
| `status` | `number \| undefined` | Getter returning `response.status` (e.g. `400`, `401`, `404`, `500`). |
| `data` | `unknown` | Auto-parsed error payload (JSON or plain text) from the server. |
| `ok` | `false` | Always `false` on `FetchError`. |

### `FetchErrorReason` Taxonomy

| Reason | HTTP / Trigger | Description |
| :--- | :--- | :--- |
| `'http_client_error'` | HTTP 4xx | Any 4xx client status (400, 401, 403, 404, 409, 429, etc.). Check `error.status` for specific status. |
| `'http_server_error'` | HTTP 5xx | Any 5xx server failure (500, 502, 503, 504, etc.). |
| `'http_not_modified_304'` | HTTP 304 | Resource has not changed since previous request. |
| `'http_opaque_response'` | HTTP 0 | Response was masked with status 0 (e.g., `no-cors` or manual redirect). |
| `'network_error'` | Network | Transport failure (DNS failure, connection reset, offline). |
| `'request_timeout'` | Client Timeout | Request exceeded the configured `timeout` duration. |
| `'request_aborted'` | AbortSignal | Request was explicitly cancelled by an `AbortSignal`. |
| `'cache_miss'` | Cache API | Resource not found in local cache when using `cacheStrategy: 'cache_only'`. |
| `'json_parse_error'` | JSON Parsing | Response body could not be parsed as JSON, or response body is empty. |
| `'json_response_not_ok'` | Validation | Response JSON `ok` property was not `true` when `requireJsonResponseWithOkTrue` was set. |
| `'request_unknown_error'` | Exception | Untyped or unexpected exception. |

---

## API Options

The `fetch` and `fetchJson` functions accept a URL and an options object extending Web Standard `RequestInit`.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `method` | `HttpMethod` | `'GET'` | HTTP method (`'GET'`, `'POST'`, `'PUT'`, `'DELETE'`, `'PATCH'`, `'HEAD'`). Normalized to uppercase. |
| `headers` | `HeadersInit` | `{}` | Headers as plain object, Web Standard `Headers`, or entries array. |
| `timeout` | `Duration` | `8_000` (8s) | Request timeout in ms or duration string (e.g. `'5s'`). Set `0` to disable. |
| `retry` | `number` | `3` | Maximum attempts (sanitized to integer $\ge 1$). Retries on 5xx, 429, 408, or network errors. |
| `retryDelay` | `Duration` | `1_000` (1s) | Base retry delay in ms or duration string. Overridden by `Retry-After` header when present. |
| `removeDuplicate` | `'never' \| 'always' \| 'until_load' \| 'auto'` | `'never'` | In-flight request coalescing strategy. Deduplication key includes auth credentials. |
| `cacheStrategy` | `'network_only' \| 'network_first' \| 'cache_first' \| 'cache_only' \| 'update_cache' \| 'stale_while_revalidate'` | `'network_only'` | Browser Cache API strategy. Automatically downgraded to `'network_only'` for non-GET/HEAD methods or environments without `caches`. |
| `cacheStorageName` | `string` | `'fetch_cache'` | Custom `CacheStorage` bucket name. |
| `revalidateCallback`| `(response: Response) => void` | `undefined` | Callback invoked with fresh response when using `stale_while_revalidate`. |
| `bodyJson` | `JsonValue` | `undefined` | JavaScript object serialized to JSON body. Automatically sets `Content-Type: application/json`. |
| `queryParams` | `QueryParams` | `undefined` | Object or arrays of query parameters appended to the URL (preserves existing `?` and `#` anchors). |
| `bearerToken` | `string` | `undefined` | Bearer token appended to the `Authorization` header (`Bearer <token>`). |
| `alwatrAuth` | `{userId: string; userToken: string}` | `undefined` | Alwatr auth credentials appended to the `Authorization` header (`Alwatr <userId>:<userToken>`). |
| `requireJsonResponseWithOkTrue` | `true` | `undefined` | (for `fetchJson`) Requires response JSON to contain `{ ok: true }`. |

---

## Detailed Features

### 1. Header Isolation & Multi-Tenant Security

Caller-supplied header objects are never mutated. `bearerToken` and `alwatrAuth` are cleanly injected into isolated per-request header bags without leaking across subsequent calls or polluting shared option objects:

```typescript
const sharedHeaders = {'x-app-id': 'my-app'};

// First request with token
await fetch('/api/private', {
  headers: sharedHeaders,
  bearerToken: 'SECRET-123',
});

// Second request reusing sharedHeaders
await fetch('/api/public', {
  headers: sharedHeaders,
});

// sharedHeaders remains untouched ({'x-app-id': 'my-app'})
// Second request does NOT leak authorization token!
```

### 2. Intelligent Retry & `Retry-After` Parsing

When encountering transient failures (5xx, 429 Rate Limited, 408 Timeout, or connection drops), retries occur automatically. If the server responds with a `Retry-After` header (seconds or HTTP-date), the retry delay automatically adapts to the server's requested delay:

```typescript
const [response, error] = await fetch('/api/rate-limited-endpoint', {
  retry: 5,
  retryDelay: '2s', // Used if Retry-After header is absent
});
```

### 3. Query Parameter Formatting

Query parameters are appended safely, encoding arrays (`tag: ['a', 'b']`), numbers, and booleans while correctly respecting pre-existing `?` query strings and `#` hash fragments:

```typescript
// GET /api/search?category=tech&tag=a&tag=b&active=true#results
const [response, error] = await fetch('/api/search?category=tech#results', {
  queryParams: {
    tag: ['a', 'b'],
    active: true,
  },
});
```

### 4. Duplicate Request Coalescing (`removeDuplicate`)

Prevents duplicate parallel requests from creating redundant network traffic:

```typescript
// Only ONE network request is sent; both promises receive a cloned Response
const [res1, res2] = await Promise.all([
  fetch('/api/heavy-data', {removeDuplicate: 'until_load'}),
  fetch('/api/heavy-data', {removeDuplicate: 'until_load'}),
]);
```

---

## Sponsors

The following companies, organizations, and individuals support Alwatr's ongoing maintenance and development.

## Contributing

Contributions are welcome! Please read our [contribution guidelines](https://github.com/Alwatr/.github/blob/next/CONTRIBUTING.md) before submitting a pull request.

## License

[MIT License](./LICENSE)
