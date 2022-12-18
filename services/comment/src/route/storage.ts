import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storage} from '../lib/storage.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('GET', '/storage', getStorage);

async function getStorage(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('getStorage');

  const token = connection.requireToken(config.nanoServer.accessToken);
  if (token == null) return;

  const params = connection.requireQueryParams<{name: string}>({name: 'string'});
  if (params == null) return;

  try {
    connection.reply(await storage.getStorage(params.name));
  }
  catch (err) {
    logger.error('getStorage', (err as Error).message ?? 'storage_error', (err as Error).stack ?? err);
    connection.reply({
      ok: false,
      statusCode: 500,
      errorCode: 'storage_error',
    });
  }
}
