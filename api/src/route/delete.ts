import {logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import {stroage} from '../lib/storage.js';

// Delete object
nanoServer.route('DELETE', '/job/delete', handler);

async function handler(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('handler');

  const params = connection.requireQueryParams<{id: string}>({id: 'string'});

  if (params === null) return;

  try {
    await stroage.delete(params.id);
    connection.reply({
      ok: true,
      data: {},
    });
  } catch (err) {
    if ((err as Error).message === 'document_not_found') {
      connection.reply({
        ok: false,
        statusCode: 404,
        errorCode: 'document_not_found',
      });
      return;
    } else {
      connection.reply({
        ok: false,
        statusCode: 500,
        errorCode: 'internal_server_error',
      });
    }
  }
}
