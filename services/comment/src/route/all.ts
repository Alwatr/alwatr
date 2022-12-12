import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storage} from '../lib/storage.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('GET', '/all', getAllComment);

async function getAllComment(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('getAllComment');

  const token = connection.requireToken(config.nanoServer.accessToken);
  if (token == null) return;

  const params = connection.requireQueryParams<{storage: string}>({storage: 'string'});
  if (params == null) return;

  try {
    connection.reply({
      ok: true,
      data: await storage.getAll(params.storage),
    });
  }
  catch (err) {
    logger.error('getAllComment', (err as Error).message ?? 'storage_error', (err as Error).stack ?? err);
    connection.reply({
      ok: false,
      statusCode: 500,
      errorCode: 'storage_error',
    });
  }
}
