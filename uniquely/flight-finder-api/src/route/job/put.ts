import {config, logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {storageClient} from '../../lib/storage.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';
import type {Job} from '@alwatr/type/flight-finder.js';

// Add job
nanoServer.route('PUT', '/job', newJob);

async function newJob(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('newJob');

  connection.requireToken(config.nanoServer.accessToken);

  const job = await connection.requireJsonBody<Job>();

  job.id ??= 'auto_increment';
  job.resultList = [];

  try {
    if (job.id !== 'auto_increment' && (await storageClient.has(job.id))) {
      return {
        ok: false,
        statusCode: 400,
        errorCode: 'job_exist',
      };
    }
    // else
    return {
      ok: true,
      // FIXME:
      data: (await storageClient.set(job)) as unknown as Record<string, unknown>,
    };
  }
  catch (_err) {
    const err = _err as Error;
    logger.error('newJob', err.message || 'storage_error', err);
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
