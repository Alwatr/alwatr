import type {DictionaryOpt, DictionaryReq, JsonObject, JsonValue} from '@alwatr/type-helper';
import type {FetchError} from './error.js';
import type {HttpMethod, HttpRequestHeaders} from '@alwatr/http-primer';
import type {Duration} from '@alwatr/parse-duration';

/**
 * A dictionary of query parameters.
 * Keys are strings, and values can be strings, numbers, or booleans.
 */
export type QueryParams = DictionaryOpt<string | number | boolean>;

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
   * An object of request headers.
   */
  headers: HttpRequestHeaders & DictionaryReq<string>;

  /**
   * Request timeout duration. Can be a number (milliseconds) or a string (e.g., '5s').
   * Set to `0` to disable.
   * @default '8s'
   */
  timeout: Duration;

  /**
   * Number of times to retry a failed request.
   * Retries occur on network errors, timeouts, or 5xx server responses.
   * @default 3
   */
  retry: number;

  /**
   * Delay before each retry attempt. Can be a number (milliseconds) or a string (e.g., '2s').
   * @default '1s'
   */
  retryDelay: Duration;

  /**
   * Strategy for handling duplicate parallel requests.
   * Uniqueness is determined by method, URL, and request body.
   * @default 'never'
   */
  removeDuplicate: CacheDuplicate;

  /**
   * The caching strategy to use for the request.
   * Requires a browser environment with Cache API support.
   * @default 'network_only'
   */
  cacheStrategy: CacheStrategy;

  /**
   * A callback function that is executed with the fresh response when using the 'stale_while_revalidate' cache strategy.
   */
  revalidateCallback?: (response: Response) => void | Promise<void>;

  /**
   * Custom name for the CacheStorage instance.
   * @default 'fetch_cache'
   */
  cacheStorageName: string;

  /**
   * A JavaScript object to be sent as the request's JSON body.
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
  bearerToken?: string;

  /**
   * Alwatr-specific authentication credentials.
   */
  alwatrAuth?: {
    userId: string;
    userToken: string;
  };
}

/**
 * Combined type for fetch options, including standard RequestInit properties.
 */
export type FetchOptions = Partial<AlwatrFetchOptions_> & Omit<RequestInit, 'headers'>;

export type FetchJsonOptions = FetchOptions & {requireJsonResponseWithOkTrue?: true};

/**
 * Represents the tuple returned by the fetch function.
 * On success, it's `[Response, null]`. On failure, it's `[null, FetchError]`.
 */
export type FetchResponse = readonly [Response, null] | readonly [null, FetchError];

export type FetchJsonResponse<T extends JsonObject> = readonly [T, null] | readonly [null, FetchError];

/**
 * Defines the specific reason for a fetch failure.
 * - `http_error`: An HTTP error status was received (e.g., 404, 500).
 * - `timeout`: The request was aborted due to a timeout.
 * - `cache_not_found`: The requested resource was not found in the cache_only strategy.
 * - `network_error`: A generic network-level error occurred.
 * - `aborted`: The request was aborted by a user-provided signal.
 * - `json_parse_error`: The response body could not be parsed as JSON.
 * - `json_response_error`: The response JSON "ok" property is not true.
 * - `unknown_error`: An unspecified error occurred.
 */
export type FetchErrorReason =
  | 'http_error'
  | 'cache_not_found'
  | 'timeout'
  | 'network_error'
  | 'aborted'
  | 'json_parse_error'
  | 'json_response_error'
  | 'unknown_error';
