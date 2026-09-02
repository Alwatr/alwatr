import {HttpStatusCodes} from '@alwatr/http-primer';
import type {FetchErrorReason} from './type.js';

/**
 * Maps an HTTP status code to a semantic `FetchErrorReason`.
 *
 * @param status - The HTTP response status code.
 * @returns The mapped `FetchErrorReason`.
 */
export function httpStatusToErrorReason(status: number): FetchErrorReason {
  if (status >= 400 && status < 500) {
    return 'http_client_error';
  }
  if (status >= 500 && status < 600) {
    return 'http_server_error';
  }
  if (status === HttpStatusCodes.Redirect_304_Not_Modified) {
    return 'http_not_modified_304';
  }
  if (status === 0) {
    return 'http_opaque_response';
  }
  return 'request_unknown_error';
}

/**
 * Custom error class for fetch-related failures.
 *
 * This error is returned in the `[null, FetchError]` tuple when a request fails.
 * It enriches the standard `Error` with the `response`, the parsed `data` body,
 * and the specific `reason` enum.
 *
 * @example
 * ```typescript
 * const [response, error] = await fetch('/api/endpoint');
 * if (error) {
 *   if (error.reason === 'http_client_error' && error.status === 401) {
 *     redirectToLogin();
 *   } else if (error.reason === 'http_server_error') {
 *     showToast('Server unavailable, please try again later');
 *   }
 * }
 * ```
 */
export class FetchError extends Error {
  /**
   * The original `Response` object, if one was received.
   */
  public response?: Response;

  /**
   * The parsed body of the error response, if available (JSON object, string, etc.).
   */
  public data?: unknown;

  /**
   * The specific semantic reason for the fetch failure.
   */
  public reason: FetchErrorReason;

  /**
   * Helper getter for the HTTP status code.
   */
  get status(): number | undefined {
    return this.response?.status;
  }

  /**
   * Always `false` to indicate error status.
   */
  readonly ok: false = false;

  constructor(reason: FetchErrorReason, message: string, response?: Response, data?: unknown) {
    super(message);
    this.name = 'FetchError';
    this.reason = reason;
    this.response = response;
    this.data = data;
  }
}
