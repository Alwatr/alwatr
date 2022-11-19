import {logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import {stroage} from '../lib/storage.js';

// Get current job object
nanoServer.route('GET', '/job/current', handler);

async function handler(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('handler');

  try {
    const allJob = await stroage.getAll();
    connection.reply({
      ok: true,
      data: allJob,
    });
  } catch (err) {
    logger.error('handler', (err as Error).message, (err as Error).cause);

    connection.reply({
      ok: false,
      errorCode: 'internal_server_error', // in TODO: ro nafahmidam chi neveshtam!
      statusCode: 500,
    });
  }
}
