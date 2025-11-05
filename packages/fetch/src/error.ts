import type { FetchErrorReason } from "./type.js";

/**
 * Custom error class for fetch-related failures.
 *
 * This error is thrown when a fetch request fails, either due to a network issue
 * or an HTTP error status (i.e., `response.ok` is `false`). It enriches the
 * standard `Error` object with the `response` and the parsed `data` from the
 * response body, allowing for more detailed error handling.
 *
 * @example
 * ```typescript
 * const [response, error] = await fetch('/api/endpoint');
 * if (error instanceof FetchError) {
 *   console.error(`Request failed with status ${error.response?.status}`);
 *   console.error('Server response:', error.data);
 * }
 * ```
 */
export class FetchError extends Error {
  /**
   * The original `Response` object.
   * This is useful for accessing headers and other response metadata.
   * It will be `undefined` for non-HTTP errors like network failures or timeouts.
   */
  public response?: Response;

  /**
   * The parsed body of the error response, typically a JSON object.
   * It will be `undefined` for non-HTTP errors.
   */
  public data?: JsonObject | string;

  /**
   * The specific reason for the fetch failure.
   */
  public reason: FetchErrorReason;

  constructor(reason: FetchErrorReason, message: string, response?: Response, data?: JsonObject | string) {
    super(message);
    this.name = 'FetchError';
    this.reason = reason;
    this.response = response;
    this.data = data;
  }
}
