import {config, logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {storageClient} from '../../lib/storage.js';

import type {Job} from '../../lib/type.js';
import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';

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
      data: (await storageClient.set(job)),
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
