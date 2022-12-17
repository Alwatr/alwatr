import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('GET', '/', getDocument);

function getDocument(connection: AlwatrConnection): void {
  logger.logMethod('getDocument');

  if (!connection.url.search) {
    return connection.reply({
      ok: true,
      data: {
        app: 'Alwatr Storage Server',
        message: 'Hello ;)',
      },
    });
  }

  const token = connection.requireToken(config.nanoServer.accessToken);
  if (token == null) return;

  const params = connection.requireQueryParams<{storage: string; id: string}>({storage: 'string', id: 'string'});
  if (params == null) return;

  const storageEngine = storageProvider.get({name: params.storage});

  const document = storageEngine.get(params.id, true);

  if (document == null) {
    return connection.reply({
      ok: false,
      statusCode: 404,
      errorCode: 'document_not_found',
    });
  }

  connection.reply({
    ok: true,
    data: document,
  });
}
