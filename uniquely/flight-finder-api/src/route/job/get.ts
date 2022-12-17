import {config, logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {storageClient} from '../../lib/storage.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

// Get current job object
nanoServer.route('GET', '/job', getJob);

async function getJob(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('getJob');

  if (connection.requireToken(config.nanoServer.accessToken) == null) return;

  try {
    connection.reply(await storageClient.getStorage());
  }
  catch (err) {
    logger.error('getJob', (err as Error).message ?? 'storage_error', (err as Error).stack ?? err);
    connection.reply({
      ok: false,
      statusCode: 500,
      errorCode: 'storage_error',
    });
  }
}
