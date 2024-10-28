import {HttpStatusCodes, type NanotronClientRequest} from '@alwatr/nanotron-api-server';

import {getAuthBearer} from '../lib/get-auth-bearer.js';

/**
   * Middleware to require a valid access token for a Nanotron API request.
   *
   * This function checks the authorization header for a Bearer token and compares it to the provided access token.
   * If the token is missing or invalid, it sends an appropriate error response and prevents further handlers from executing.
   *
   * @param {string} accessToken - The valid access token to compare against.
   * @returns {Function} A middleware function for Nanotron API requests.
   *
   * @example
   * ```ts
   * nanotronApiServer.defineRoute({
   *   method: 'POST',
   *   url: 'secure-endpoint',
   *   preHandlers: [requireAccessToken('mySecretToken')],
   *   async handler() {
   *     this.serverResponse.replyJson({
   *       ok: true,
   *       message: 'Access granted!',
   *     });
   *   },
   * });
   * ```
   */
export const requireAccessToken = (accessToken: string) =>
  async function requireAccessToken_(this: NanotronClientRequest): Promise<void> {
    const userToken = getAuthBearer(this.headers.authorization);
    this.logger_.logMethodArgs?.('requireAccessToken', {userToken});

    if (userToken === null) {
      this.serverResponse.statusCode = HttpStatusCodes.Error_Client_401_Unauthorized;
      this.serverResponse.replyErrorResponse({
        ok: false,
        errorCode: 'authorization_required',
        errorMessage: 'Authorization token required',
      });
      return;
    }

    if (userToken !== accessToken) {
      this.serverResponse.statusCode = HttpStatusCodes.Error_Client_403_Forbidden;
      this.serverResponse.replyErrorResponse({
        ok: false,
        errorCode: 'access_denied',
        errorMessage: 'Access denied, token is invalid!',
      });
    }
  };

