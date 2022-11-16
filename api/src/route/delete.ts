import {logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import {stroage} from 'src/lib/storage.js';

// add job API
nanoServer.route('DELETE', '/delete', handler);

async function handler(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('handler');

  const params = connection.requireQueryParams<{id: string}>({id: 'string'});

  if (params === null) {
    connection.reply({
      ok: false,
      errorCode: 'body_required',
      statusCode: 422,
      data: {
        app: 'Job API',
        message: 'Body required',
      },
    });
    return;
  }

  try {
    await stroage.delete(params.id);
    connection.reply({
      ok: true,
      data: {
        app: 'Job API',
        message: 'Job deleted',
      },
    });
  } catch {
    connection.reply({
      ok: false,
      errorCode: 'job_not_found',
      statusCode: 400,
      data: {
        app: 'Job API',
        message: 'Job not found',
      },
    });
  }
}
