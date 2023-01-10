import {existsSync} from 'node:fs';

import {Photo} from '@alwatr/type/src/photo.js';

import {config, logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {storageClient} from '../../lib/storage.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('PUT', '/meta', addPhotoMeta);

async function addPhotoMeta(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('addPhotoMeta');

  connection.requireToken(config.nanoServer.accessToken);

  const body = await connection.requireJsonBody<Photo>();
  console.log(body);


  if (!existsSync(`${config.photo.originalPath}/${body.id}`)) {
    console.log(`${config.photo.originalPath}/${body.id}`);

    // eslint-disable-next-line no-throw-literal
    throw {
      ok: false,
      errorCode: 'photo_not_exists',
      statusCode: 400,
    };
  }

  try {
    return {
      ok: true,
      data: await storageClient.set(body),
    };
  }
  catch (_err) {
    const err = _err as Error;
    logger.error('addPhotoMeta', err.message || 'storage_error', err);
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
