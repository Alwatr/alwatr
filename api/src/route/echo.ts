import {logger, config} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';
import {validateBodyJson} from '../lib/parser.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

// add job API
nanoServer.route('POST', '/add', handler);

async function handler(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('handler');

  const bodyJson = await connection.requireJsonBody();

  if (bodyJson === null) {
    connection.reply({
      ok: false,
      errorCode: 'DATA_REQUIRED',
      statusCode: 422,
      data: {
        app: 'Job API',
        message: 'Data required',
      },
    });
    return;
  }

  // parse and validate data
  const isBodyJsonValid = validateBodyJson(bodyJson);
  if (isBodyJsonValid === false) {
    connection.reply({
      ok: false,
      errorCode: 'DATA_NOT_VALID',
      statusCode: 422,
      data: {
        app: 'Job API',
        message: 'Data not valid',
      },
    });
    return;
  }

  // add job
  const storageReponse = await fetch(`${config.storageApiDomain}/${config.storageName}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.storageToken}`,
    },
    body: JSON.stringify({
      _id: Math.random().toString(),
      _updatedBy: 'bot',
      ...bodyJson,
    }),
  });

  if (!storageReponse.ok) {
    connection.reply({
      ok: false,
      statusCode: 500,
      errorCode: '',
      data: {
        app: 'Job API',
        message: 'Internal server error',
      },
    });
    return;
  }

  connection.reply({
    ok: true,
    data: {
      app: 'Job API',
      message: 'New job added',
    },
  });
}
