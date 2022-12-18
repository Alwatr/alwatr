import {config, logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {storageClient} from '../../lib/storage.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

// Delete object
nanoServer.route('DELETE', '/job', deleteJob);

async function deleteJob(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('deleteJob');

  if (connection.requireToken(config.nanoServer.accessToken) == null) return;

  const params = connection.requireQueryParams<{id: string}>({id: 'string'});
  if (params === null) return;

  try {
    await storageClient.delete(params.id);
    connection.reply({
      ok: true,
      data: {},
    });
  }
  catch (_err) {
    const err = _err as Error;
    if (err.message === 'document_not_found') {
      connection.reply({
        ok: false,
        statusCode: 404,
        errorCode: 'document_not_found',
      });
    }
    else {
      connection.reply({
        ok: false,
        statusCode: 500,
        errorCode: 'storage_error',
        meta: {
          name: err.name,
          message: err.message,
          cause: err.cause,
        },
      });
    }
  }
}
