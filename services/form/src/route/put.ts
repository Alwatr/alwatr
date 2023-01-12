import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageClient} from '../lib/storage.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';
import type {AlwatrDocumentObject} from '@alwatr/type';

nanoServer.route('PUT', '/', setForm);

async function setForm(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('setForm');

  connection.requireToken(config.nanoServer.accessToken);

  const bodyJson = await connection.requireJsonBody<AlwatrDocumentObject>();

  bodyJson.id ??= 'auto_increment';

  try {
    return {
      ok: true,
      data: await storageClient.set(bodyJson),
    };
  }
  catch (_err) {
    const err = _err as Error;
    logger.error('setForm', err.message || 'storage_error', err);
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
