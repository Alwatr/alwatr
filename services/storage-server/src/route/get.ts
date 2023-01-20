import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('GET', '/', getDocument);

function getDocument(connection: AlwatrConnection): AlwatrServiceResponse {
  logger.logMethod('getDocument');

  if (!connection.url.search) {
    return {
      ok: true,
      data: {
        app: '..:: Alwatr Storage Server ::..',
        message: 'Hello ;)',
      },
    };
  }

  connection.requireToken(config.nanoServer.accessToken);

  const params = connection.requireQueryParams<{storage: string; id: string}>({storage: 'string', id: 'string'});

  const storageEngine = storageProvider.get({name: params.storage});

  const document = storageEngine.get(params.id, true);

  if (document == null) {
    return {
      ok: false,
      statusCode: 404,
      errorCode: 'document_not_found',
    };
  }

  return {
    ok: true,
    data: document,
  };
}
