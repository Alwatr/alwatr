import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('DELETE', 'all', removeDocument);

async function removeDocument(connection: AlwatrConnection): Promise<void> {
  logger.logMethodArgs('updateDocument', {method: connection.method});

  const token = connection.requireToken(config.token);
  if (token == null) return;

  const param = connection.requireQueryParams<{storage: string, id: string}>(['storage', 'id']);
  if (param === null) return;

  const storage = storageProvider.get({name: param.storage});

  if (storage.remove(param.id) === true) {
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
