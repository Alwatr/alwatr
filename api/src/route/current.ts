import {logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import {stroage} from '../lib/storage.js';

// get current job object
nanoServer.route('GET', '/current', handler);

async function handler(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('handler');

  try {
    const allJob = await stroage.getAll();
    let allJobResponse: any = {};
    for (const job in allJob) {
      allJobResponse[job] = {
        origin: allJob[job].origin,
        dest: allJob[job].dest,
        date: allJob[job].date,
      };
    }
    connection.reply({
      ok: true,
      data: {
        app: 'Job API',
        current: allJobResponse,
      },
    });
  } catch {
    connection.reply({
      ok: false,
      errorCode: 'internal_error',
      statusCode: 500,
      data: {
        app: 'Job API',
        message: 'Internal server error',
      },
    });
  }
}
