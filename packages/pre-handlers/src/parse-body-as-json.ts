import {HttpStatusCodes} from '@alwatr/nanotron-api-server';

import {logger} from './logger.js';

import type {NanotronClientRequest} from '@alwatr/nanotron-api-server';

export async function parseBodyAsJson(
  this: NanotronClientRequest<{body: DictionaryOpt}>,
): Promise<void> {
  const bodyBuffer = await this.getBodyRaw();
  if (bodyBuffer.length === 0) {
    logger.error('parseBodyAsJson', 'body_required');
    this.serverResponse.statusCode = HttpStatusCodes.Error_Client_422_Unprocessable_Entity;
    this.serverResponse.replyErrorResponse({
      ok: false,
      errorCode: 'body_required',
      errorMessage: 'Request body is required.',
    });
    return;
  }

  try {
    this.sharedMeta.body = JSON.parse(bodyBuffer.toString()) as DictionaryOpt;
  }
  catch (error) {
    logger.error('parseBodyAsJson', 'invalid_body_json', error);
    this.serverResponse.statusCode = HttpStatusCodes.Error_Client_422_Unprocessable_Entity;
    this.serverResponse.replyErrorResponse({
      ok: false,
      errorCode: 'invalid_body_json',
      errorMessage: 'Invalid JSON in request body.',
    });
  }

  logger.logMethodArgs?.('parseBodyAsJson', {body: this.sharedMeta.body});
}
