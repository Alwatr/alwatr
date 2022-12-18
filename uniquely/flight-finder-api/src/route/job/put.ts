import {config, logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {storageClient} from '../../lib/storage.js';

import type {Job} from '../../lib/type.js';
import type {AlwatrConnection} from '@alwatr/nano-server';

// Add job
nanoServer.route('PUT', '/job', newJob);

async function newJob(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('newJob');

  if (connection.requireToken(config.nanoServer.accessToken) == null) return;

  const job = await connection.requireJsonBody<Job>();
  if (job === null) return;

  job.id ??= 'auto_increment';
  job.resultList = [];

  try {
    if (job.id !== 'auto_increment' && (await storageClient.has(job.id))) {
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
      data: (await storageClient.set(job)) as unknown as Record<string, unknown>,
    });
  }
  catch (_err) {
    const err = _err as Error;
    logger.error('newJob', err.message || 'storage_error', err);
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
