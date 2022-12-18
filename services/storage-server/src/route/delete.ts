import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('DELETE', 'all', removeDocument);

async function removeDocument(connection: AlwatrConnection): Promise<void> {
  logger.logMethodArgs('updateDocument', {method: connection.method});

  const token = connection.requireToken(config.nanoServer.accessToken);
  if (token == null) return;

  const param = connection.requireQueryParams<{storage: string; id: string}>({storage: 'string', id: 'string'});
  if (param === null) return;

  const storageEngine = storageProvider.get({name: param.storage});

  if (storageEngine.delete(param.id) === true) {
    connection.reply({
      ok: true,
      data: {},
    });
  }
  else {
    connection.reply({
      ok: false,
      statusCode: 404,
      errorCode: 'document_not_found',
    });
  }
}
