import type {DictionaryOpt, JsonValue} from '@alwatr/type-helper';
import type {FetchError} from './error.js';
import type {HttpMethod, HttpRequestHeaders} from '@alwatr/http-primer';
import type {Duration} from '@alwatr/parse-duration';

/**
 * A dictionary of query parameters.
 * Keys are strings, and values can be strings, numbers, booleans, or arrays of these primitives.
 */
export type QueryParams = DictionaryOpt<
  string | number | boolean | readonly (string | number | boolean)[] | (string | number | boolean)[]
>;

/**
 * Defines the caching strategy for a fetch request.
 *
 * - `network_only`: Always fetches from the network.
 * - `network_first`: Tries the network first, then falls back to the cache.
 * - `cache_only`: Only fetches from the cache; fails if not found.
 * - `cache_first`: Tries the cache first, then falls back to the network.
 * - `update_cache`: Fetches from the network and updates the cache.
 * - `stale_while_revalidate`: Serves from cache while revalidating in the background.
 */
export type CacheStrategy =
  | 'network_only'
  | 'network_first'
  | 'cache_only'
  | 'cache_first'
  | 'update_cache'
  | 'stale_while_revalidate';

/**
 * Defines the caching behavior for identical, parallel requests.
 * - `never`: No deduplication is performed.
 * - `always`: The response is cached for the lifetime of the application.
 * - `until_load`: The response is cached until the initial request is complete.
 * - `auto`: Automatically selects the best strategy (`until_load` in browsers, `always` otherwise).
 */
export type CacheDuplicate = 'never' | 'always' | 'until_load' | 'auto';

/**
 * Defines the options for an Alwatr fetch request.
 */
export interface AlwatrFetchOptions_ {
  /**
   * The HTTP request method.
   * @default 'GET'
   */
  method: HttpMethod;

  /**
   * Request headers. Supports plain object, Web Standard `Headers`, or entries array.
   */
  headers?: HttpRequestHeaders | HeadersInit;

  /**
   * Request timeout duration. Can be a number (milliseconds) or a string (e.g., '5s').
   * Set to `0` to disable.
   * @default '8s'
   */
  timeout: Duration;

  /**
   * Number of times to retry a failed request.
   * Retries occur on network errors, timeouts, 408/429 status codes, or 5xx server responses.
   * @default 3
   */
  retry: number;

  /**
   * Delay before each retry attempt. Can be a number (milliseconds) or a string (e.g., '1s').
   * @default '1s'
   */
  retryDelay: Duration;

  /**
   * Strategy for handling duplicate parallel requests.
   * Uniqueness is determined by method, URL, query parameters, request body, and authorization context.
   * @default 'never'
   */
  removeDuplicate: CacheDuplicate;

  /**
   * The caching strategy to use for the request.
   * Requires a browser or environment with Cache API support.
   * @default 'network_only'
   */
  cacheStrategy: CacheStrategy;

  /**
   * A callback function executed with the fresh response when using 'stale_while_revalidate'.
   */
  revalidateCallback?: (response: Response) => void | Promise<void>;

  /**
   * Custom name for the CacheStorage instance.
   * @default 'fetch_cache'
   */
  cacheStorageName: string;

  /**
   * A JavaScript value to be serialized as the request's JSON body.
   * Automatically sets the 'Content-Type' header to 'application/json'.
   */
  bodyJson?: JsonValue;

  /**
   * A JavaScript object of query parameters to be appended to the request URL.
   */
  queryParams?: QueryParams;

  /**
   * A bearer token to be added to the 'Authorization' header.
   */
  bearerToken?: string | null;

  /**
   * Alwatr-specific authentication credentials.
   */
  alwatrAuth?: {
    userId: string;
    userToken: string;
  } | null;
}

/**
 * Combined type for fetch options, including standard RequestInit properties.
 */
export type FetchOptions = Partial<AlwatrFetchOptions_> & Omit<RequestInit, 'headers'>;

/**
 * Options for `fetchJson`, extending `FetchOptions` with JSON-specific flags.
 */
export type FetchJsonOptions = FetchOptions & {
  /**
   * If `true`, requires the parsed JSON body to have an `ok: true` property.
   * If `ok` is missing or not `true`, fails with `json_response_not_ok`.
   */
  requireJsonResponseWithOkTrue?: true;
};

/**
 * Represents the tuple returned by the `fetch` function.
 * On success: `[Response, null]`. On failure: `[null, FetchError]`.
 */
export type FetchResponse = readonly [Response, null] | readonly [null, FetchError];

/**
 * Represents the tuple returned by `fetchJson`.
 * On success: `[T, null]`. On failure: `[null, FetchError]`.
 */
export type FetchJsonResponse<T = unknown> = readonly [T, null] | readonly [null, FetchError];

/**
 * Defines the specific reason for a fetch failure.
 *
 * - `http_client_error`: Any 4xx HTTP client errors (400, 401, 403, 404, etc.).
 * - `http_server_error`: Any 5xx HTTP server-side errors (500, 502, 503, 504, etc.).
 * - `http_not_modified_304`: Resource has not changed since the last request (HTTP 304).
 * - `http_opaque_response`: Response was masked with status 0 (e.g., 'no-cors' or manual redirect).
 * - `network_error`: Network-level failure occurred (DNS failure, connection reset, offline).
 * - `request_timeout`: Request exceeded the configured timeout duration.
 * - `request_aborted`: Request was explicitly cancelled by an AbortSignal.
 * - `cache_miss`: Resource was not found in the local cache when using `cache_only`.
 * - `json_parse_error`: Response body could not be parsed as valid JSON.
 * - `json_response_not_ok`: JSON body was parsed, but the payload failed validation (e.g. `ok !== true`).
 * - `request_unknown_error`: An unexpected or untyped error occurred.
 */
export type FetchErrorReason =
  | 'http_client_error'
  | 'http_server_error'
  | 'request_timeout'
  | 'request_aborted'
  | 'network_error'
  | 'cache_miss'
  | 'json_parse_error'
  | 'json_response_not_ok'
  | 'request_unknown_error'
  | 'http_not_modified_304'
  | 'http_opaque_response';
/**
 * Internal-only normalized fetch options type.
 * @internal
 */
export interface InternalFetchOptions_
  extends
    Omit<AlwatrFetchOptions_, 'headers' | 'method' | 'timeout' | 'retryDelay'>,
    Omit<RequestInit, 'headers' | 'method'> {
  url: string;
  method: HttpMethod;
  headers: HttpRequestHeaders;
  timeout: number;
  retryDelay: number;
}
