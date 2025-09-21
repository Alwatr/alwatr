import {HttpStatusCodes} from '@alwatr/nanotron-api-server';

import type {NanotronClientRequest} from '@alwatr/nanotron-api-server';
import type {} from '@alwatr/type-helper';

/**
 * Middleware to parses the request body as JSON and assigns it to `this.sharedMeta.body`.
 * If the body is empty or invalid, it sends an error response,
 * which triggers `terminatedHandlers` and prevents further handlers from executing.
 *
 * @this {NanotronClientRequest<{body: DictionaryOpt}>}
 * @returns {Promise<void>} A promise that resolves when the body is successfully parsed or an error response is sent.
 *
 * @example
 * ```ts
 * nanotronApiServer.defineRoute<{body: DictionaryOpt}>({
 *   preHandlers: [parseBodyAsJson],
 *   async handler() {
 *     const body = this.sharedMeta.body; // json object
 *   },
 * });
 * ```
 */
export async function parseBodyAsJson(this: NanotronClientRequest<{body?: JsonObject | JsonArray}>): Promise<void> {
  this.logger_.logMethod?.('parseBodyAsJson');
  const bodyBuffer = await this.getBodyRaw();

  if (bodyBuffer.length === 0) {
    this.logger_.error('parseBodyAsJson', 'body_required');
    this.serverResponse.statusCode = HttpStatusCodes.Error_Client_422_Unprocessable_Entity;
    this.serverResponse.replyErrorResponse({
      ok: false,
      errorCode: 'body_required',
      errorMessage: 'Request body is required.',
    });
    return;
  }

  try {
    this.sharedMeta.body = JSON.parse(bodyBuffer.toString()) as DictionaryOpt | JsonArray;
  }
  catch (error) {
    this.logger_.error('parseBodyAsJson', 'invalid_body_json', error);
    this.serverResponse.statusCode = HttpStatusCodes.Error_Client_422_Unprocessable_Entity;
    this.serverResponse.replyErrorResponse({
      ok: false,
      errorCode: 'invalid_body_json',
      errorMessage: 'Invalid JSON in request body.',
    });
  }

  this.logger_.logProperty?.('body', this.sharedMeta.body);
}
