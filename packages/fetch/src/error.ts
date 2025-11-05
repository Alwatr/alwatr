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
 *   console.error(`Request failed with status ${error.status}`);
 *   console.error('Server response:', error.data);
 * }
 * ```
 */
export class FetchError extends Error {
  /**
   * The original `Response` object.
   * This is useful for accessing headers and other response metadata.
   */
  public response: Response;

  /**
   * The parsed body of the error response, typically a JSON object.
   */
  public data: unknown;

  constructor(response: Response, data: unknown, message: string) {
    super(message);
    this.name = 'FetchError';
    this.response = response;
    this.data = data;
  }
}
