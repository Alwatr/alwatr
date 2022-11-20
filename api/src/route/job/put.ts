import {logger} from '../../lib/config.js';
import {nanoServer} from '../../lib/nano-server.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import {storage} from '../../lib/storage.js';
import type {Job} from '../../lib/type.js';

// Add job
nanoServer.route('PUT', '/job', newJob);

async function newJob(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('newJob');

  // TODO: add token

  const job = await connection.requireJsonBody<Job>();
  if (job === null) return;

  job._id ??= 'auto_increment';
  job._updatedBy ??= 'api';

  try {
    if (job._id !== 'auto_increment' && await storage.has(job._id)) {
      return connection.reply({
        ok: false,
        statusCode: 400,
        errorCode: 'job_exist'
      });
    }
    // else
    connection.reply({
      ok: true,
      data: await storage.set(job),
    });
  }
  catch (err) {
    logger.error('newJob', (err as Error).message ?? 'storage_error', (err as Error).stack ?? err);
    connection.reply({
      ok: false,
      statusCode: 500,
      errorCode: 'storage_error',
    });
  }
}
