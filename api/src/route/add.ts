import {logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import {stroage} from '../lib/storage.js';
import type {Job} from '../lib/type.js';

// Add job
nanoServer.route('PUT', '/job/add', handler);

async function handler(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('handler');

  const bodyJson = await connection.requireJsonBody<Job>();
  if (bodyJson === null) return;

  try {
    const job = await stroage.set({
      ...bodyJson,
      _id: 'auto_increment',
      _updatedBy: 'system',
    });
    connection.reply({
      ok: true,
      data: {job: job},
    });
  } catch (err) {
    logger.error('handler', 'internal_server_error', (err as Error).message);
    connection.reply({
      ok: false,
      statusCode: 500,
      errorCode: 'internal_server_error',
    });
  }
}
