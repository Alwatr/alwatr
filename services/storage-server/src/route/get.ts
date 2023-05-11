import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrDocumentObject, StringifyableRecord} from '@alwatr/type';

nanoServer.route<AlwatrDocumentObject | StringifyableRecord | null>('GET', '/', (connection) => {
  if (!connection.url.search) {
    logger.logMethod?.('home');
    return {
      ok: true,
      data: {
        app: '..:: Alwatr Storage Server ::..',
        message: 'Hello ;)',
      },
    };
  }

  // else
  logger.logMethod?.('getDocument');

  connection.requireToken(config.nanoServer.accessToken);

  const params = connection.requireQueryParams<{storage: string; id: string}>({storage: 'string', id: 'string'});

  const storageEngine = storageProvider.get({name: params.storage});

  const document = storageEngine.get(params.id, true);

  return {
    ok: true,
    data: document,
  };
});
