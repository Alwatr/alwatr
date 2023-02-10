import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('DELETE', 'all', deleteDocument);

function deleteDocument(connection: AlwatrConnection): AlwatrServiceResponse<Record<string, never>, never> {
  logger.logMethodArgs('deleteDocument', {method: connection.method});

  connection.requireToken(config.nanoServer.accessToken);

  const param = connection.requireQueryParams<{storage: string; id: string}>({storage: 'string', id: 'string'});

  const storageEngine = storageProvider.get({name: param.storage});

  if (storageEngine.delete(param.id) === true) {
    return {
      ok: true,
      data: {},
    };
  }
  else {
    return {
      ok: false,
      statusCode: 404,
      errorCode: 'document_not_found',
    };
  }
}
