import type {Methods, QueryParameters, StringifyableRecord, UserAuth} from '@alwatr/type';

export type CacheStrategy =
  | 'network_only'
  | 'network_first'
  | 'cache_only'
  | 'cache_first'
  | 'update_cache'
  | 'stale_while_revalidate';

export type CacheDuplicate = 'never' | 'always' | 'until_load' | 'auto';

export interface FetchOptions extends RequestInit {
  /**
   * Request URL.
   */
  url: string;

  /**
   * A string to set request's method.
   *
   * @default 'GET'
   */
  method?: Methods;

  /**
   * A Headers object to set request's headers.
   */
  headers?: Record<string, string>;

  /**
   * A timeout for the fetch request.
   * Set `0` for disable it.
   *
   * Use with cation, you will have memory leak issue in nodejs.
   *
   * @default 10_000 ms
   */
  timeout?: number;

  /**
   * If fetch response not acceptable or timed out, it will retry the request.
   *
   * @default 3
   */
  retry?: number;

  /**
   * Delay before each retries.
   *
   * @default 1_000 ms
   */
  retryDelay?: number;

  /**
   * Simple memory caching for remove duplicate/parallel requests.
   *
   * - `never`: Never use memory caching.
   * - `always`: Always use memory caching and remove all duplicate requests.
   * - `until_load`: Cache parallel requests until request completed (it will be removed after the promise resolved).
   * - `auto`: If CacheStorage was supported use `until_load` strategy else use `always`.
   *
   * @default 'never'
   */
  removeDuplicate?: CacheDuplicate;

  /**
   * Strategies for caching.
   *
   * - `network_only`: Only network request without any cache.
   * - `network_first`: Network first, falling back to cache.
   * - `cache_only`: Cache only without any network request.
   * - `cache_first`: Cache first, falling back to network.
   * - `update_cache`: Like `network_only` but with update cache.
   * - `stale_while_revalidate`: Fastest strategy, Use cached first but always request network to update the cache.
   *
   * @default 'network_only'
   */
  cacheStrategy?: CacheStrategy;

  /**
   * Revalidate callback for `stale_while_revalidate` cache strategy.
   */
  revalidateCallback?: (response: Response) => void | Promise<void>;

  /**
   * Cache storage custom name.
   */
  cacheStorageName?: string;

  /**
   * Body as JS Object.
   */
  bodyJson?: StringifyableRecord;

  /**
   * URL Query Parameters as JS Object.
   */
  queryParameters?: QueryParameters;

  /**
   * Add token to Authentication bearer header.
   */
  token?: string;

  /**
   * Add user id and token to Authentication bearer header.
   */
  userAuth?: UserAuth;
}

export type StringifyableFetchOptions = Pick<
  FetchOptions,
  | 'url'
  | 'bodyJson'
  | 'cache'
  | 'cacheStorageName'
  | 'cacheStrategy'
  | 'headers'
  | 'credentials'
  | 'keepalive'
  | 'method'
  | 'mode'
  | 'queryParameters'
  | 'removeDuplicate'
  | 'timeout'
  | 'token'
  | 'retry'
  | 'retryDelay'
  | 'referrer'
  | 'referrerPolicy'
>;
