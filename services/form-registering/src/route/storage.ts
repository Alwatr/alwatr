import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageClient} from '../lib/storage.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('GET', '/storage', getFormStorage);

async function getFormStorage(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('getFormStorage');

  connection.requireToken(config.nanoServer.accessToken);

  try {
    return await storageClient.getStorage();
  }
  catch (_err) {
    const err = _err as Error;
    logger.error('getFormStorage', err.message || 'storage_error', err);
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
