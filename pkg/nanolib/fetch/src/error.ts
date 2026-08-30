import {HttpStatusCodes} from '@alwatr/http-primer';
import type {FetchErrorReason} from './type.js';

/**
 * Maps an HTTP status code to a semantic `FetchErrorReason`.
 *
 * @param status - The HTTP response status code.
 * @returns The mapped `FetchErrorReason`.
 *
 * @example
 * ```typescript
 * httpStatusToErrorReason(401); // 'unauthorized'
 * httpStatusToErrorReason(404); // 'not_found'
 * httpStatusToErrorReason(500); // 'server_error'
 * ```
 */
export function httpStatusToErrorReason(status: number): FetchErrorReason {
  switch (status) {
    case HttpStatusCodes.Error_Client_400_Bad_Request:
      return 'bad_request';
    case HttpStatusCodes.Error_Client_401_Unauthorized:
      return 'unauthorized';
    case HttpStatusCodes.Error_Client_403_Forbidden:
      return 'forbidden';
    case HttpStatusCodes.Error_Client_404_Not_Found:
      return 'not_found';
    case HttpStatusCodes.Error_Client_408_Request_Timeout:
      return 'request_timeout';
    case HttpStatusCodes.Error_Client_409_Conflict:
      return 'conflict';
    case HttpStatusCodes.Error_Client_413_Payload_Too_Large:
      return 'payload_too_large';
    case HttpStatusCodes.Error_Client_422_Unprocessable_Entity:
      return 'unprocessable_content';
    case HttpStatusCodes.Error_Client_429_Too_Many_Requests:
      return 'rate_limited';
    default:
      if (status >= 500 && status < 600) {
        return 'server_error';
      }
      return 'http_error';
  }
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
 *   if (error.reason === 'unauthorized') {
 *     redirectToLogin();
 *   } else if (error.reason === 'server_error') {
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
