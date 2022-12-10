import {config, logger} from '../../lib/config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {storage} from '../../lib/storage.js';

import type {Job} from '../../lib/type.js';
import type {AlwatrConnection} from '@alwatr/nano-server';

// Add job
nanoServer.route('PUT', '/job', newJob);

async function newJob(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('newJob');

  if (connection.requireToken(config.nanoServer.token) == null) return;

  const job = await connection.requireJsonBody<Job>();
  if (job === null) return;

  job.id ??= 'auto_increment';
  job.resultList = [];

  try {
    if (job.id !== 'auto_increment' && (await storage.has(job.id))) {
      return connection.reply({
        ok: false,
        statusCode: 400,
        errorCode: 'job_exist',
      });
    }
    // else
    connection.reply({
      ok: true,
      // FIXME:
      data: (await storage.set(job)) as unknown as Record<string, unknown>,
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
