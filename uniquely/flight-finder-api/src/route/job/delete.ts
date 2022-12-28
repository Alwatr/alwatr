import {config, logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {storageClient} from '../../lib/storage.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';

// Delete object
nanoServer.route('DELETE', '/job', deleteJob);

async function deleteJob(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('deleteJob');

  connection.requireToken(config.nanoServer.accessToken) == null;

  const params = connection.requireQueryParams<{id: string}>({id: 'string'});

  try {
    await storageClient.delete(params.id);
    return {
      ok: true,
      data: {},
    };
  }
  catch (_err) {
    const err = _err as Error;
    if (err.message === 'document_not_found') {
      return {
        ok: false,
        statusCode: 404,
        errorCode: 'document_not_found',
      };
    }
    else {
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
}
