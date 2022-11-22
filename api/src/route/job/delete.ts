import {logger} from '../../lib/config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {storage} from '../../lib/storage.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

// Delete object
nanoServer.route('DELETE', '/job', deleteJob);

async function deleteJob(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('deleteJob');

  const params = connection.requireQueryParams<{id: string}>({id: 'string'});
  if (params === null) return;

  try {
    await storage.delete(params.id);
    connection.reply({
      ok: true,
      data: {},
    });
  }
  catch (err) {
    if ((err as Error).message === 'document_not_found') {
      return connection.reply({
        ok: false,
        statusCode: 404,
        errorCode: 'document_not_found',
      });
    }
    // else
    connection.reply({
      ok: false,
      statusCode: 500,
      errorCode: 'storage_error',
    });
  }
}
