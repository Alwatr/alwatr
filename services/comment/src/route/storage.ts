import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageClient} from '../lib/storage.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('GET', '/storage', getStorage);

async function getStorage(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('getStorage');

  const token = connection.requireToken(config.nanoServer.accessToken);
  if (token == null) return;

  const params = connection.requireQueryParams<{name: string}>({name: 'string'});
  if (params == null) return;

  try {
    connection.reply(await storageClient.getStorage(params.name));
  }
  catch (_err) {
    const err = _err as Error;
    logger.error('getStorage', err.message || 'storage_error', err);
    connection.reply({
      ok: false,
      statusCode: 500,
      errorCode: 'storage_error',
      meta: {
        name: err.name,
        message: err.message,
        cause: err.cause,
      },
    });
  }
}
