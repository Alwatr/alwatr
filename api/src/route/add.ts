import {logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import {stroage} from '../lib/storage.js';
import type {Job} from '../lib/type.js';

// add job
nanoServer.route('POST', '/add', handler);

async function handler(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('handler');

  const bodyJson = await connection.requireJsonBody();
  if (bodyJson === null) return;

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
    _id: Math.random().toString(16).substring(7),
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
