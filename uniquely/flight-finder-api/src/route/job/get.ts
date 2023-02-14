import {config, logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {storageClient} from '../../lib/storage.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';
import type {StringifyableRecord} from '@alwatr/type';
import type {Job} from '@alwatr/type/flight-finder.js';

// Get current job object
nanoServer.route('GET', '/job', getJob);

async function getJob(
    connection: AlwatrConnection,
): Promise<AlwatrServiceResponse<Record<string, Job>, StringifyableRecord>> {
  logger.logMethod('getJob');

  connection.requireToken(config.nanoServer.accessToken);

  try {
    return await storageClient.getStorage();
  }
  catch (_err) {
    const err = _err as Error;
    logger.error('getJob', err.message || 'storage_error', err);
    return {
      ok: false,
      statusCode: 500,
      errorCode: 'storage_error',
      meta: {
        name: err.name,
        message: err.message,
        cause: <StringifyableRecord>err.cause,
      },
    };
  }
}
