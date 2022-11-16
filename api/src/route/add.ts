import {logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import {stroage} from 'src/lib/storage.js';
import type {Job} from 'src/lib/type.js';

// add job API
nanoServer.route('PATCH', '/add', handler);

async function handler(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('handler');

  const bodyJson = await connection.requireJsonBody();

  if (bodyJson === null) {
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

  let parsedBody: Job | null;
  // parse and validate data
  try {
    parsedBody = bodyJson as Job;
  } catch {
    parsedBody = null;
  }

  if (parsedBody === null) {
    connection.reply({
      ok: false,
      errorCode: 'body_not_valid',
      statusCode: 422,
      data: {
        app: 'Job API',
        message: 'Body not valid',
      },
    });
    return;
  }

  // add job
  await stroage.set({
    _id: 'test',
    _updatedBy: 'system',
    ...parsedBody,
  });

  connection.reply({
    ok: true,
    data: {
      app: 'Job API',
      message: 'New job added',
    },
  });
}
