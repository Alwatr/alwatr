import {writeFileSync} from 'node:fs';

import {logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {generateToken} from '../token.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('POST', '/', addPhoto);

async function addPhoto(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('addPhoto');

  // connection.requireToken(config.nanoServer.accessToken);

  const mimeType = connection.incomingMessage.headers['content-type'];
  if (mimeType !== 'image/png' && mimeType !== 'image/jpeg') {
    // eslint-disable-next-line no-throw-literal
    throw {
      ok: false,
      statusCode: 400,
      errorCode: 'require_file_body',
    };
  }

  const buffer = await connection.requireFileBody();

  const photoId = generateToken.generate(buffer.toString()).slice(0, 7);

  writeFileSync(`${photoId}.${mimeType.split('/')[1]}`, buffer);

  try {
    return {
      ok: true,
      data: {
        photoId: photoId,
      },
    };
  }
  catch (_err) {
    const err = _err as Error;
    logger.error('addPhoto', err.message || 'storage_error', err);
    return {
      ok: false,
      statusCode: 500,
      errorCode: 'storage_error',
      meta: {
        name: err.name,
        message: err.message,
        cause: err.cause,
      },
    };
  }
}
