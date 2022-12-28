import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageClient} from '../lib/storage.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';

nanoServer.route('GET', '/storage', getStorage);

async function getStorage(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('getStorage');

  connection.requireToken(config.nanoServer.accessToken);

  const params = connection.requireQueryParams<{name: string}>({name: 'string'});

  try {
    return await storageClient.getStorage(params.name);
  }
  catch (_err) {
    const err = _err as Error;
    logger.error('getStorage', err.message || 'storage_error', err);
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
