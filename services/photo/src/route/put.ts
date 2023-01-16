import {writeFileSync} from 'node:fs';

import {logger, config} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageClient} from '../lib/storage.js';
import {generateToken} from '../token.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('PUT', '/', addPhoto);

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
  const id = `${generateToken.generate(buffer.toString()).slice(0, 7)}.${mimeType.split('/')[1]}`;

  // extract photo meta from search params
  const meta: Record<string, string> = {};
  connection.url.searchParams.forEach((value, key) => {
    meta[key] = value;
  });

  writeFileSync(`${config.photo.originalPath}/${id}`, buffer);
  // optimize

  try {
    return {
      ok: true,
      data: await storageClient.set({id: id, meta: meta}),
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
