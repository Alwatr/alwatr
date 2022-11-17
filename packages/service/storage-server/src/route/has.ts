import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('GET', '/has', has);

async function has(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('has');

  const token = connection.requireToken(config.token);
  if (token == null) return;

  const params = connection.requireQueryParams<{storage: string, id: string}>({storage: 'string', id: 'string'});
  if (params == null) return;

  const storage = storageProvider.get({name: params.storage});

  if (!storage.has(params.id)) {
    connection.reply({
      ok: false,
      errorCode: 'document_not_exists',
      statusCode: 404,
    });
    return;
  }

  connection.reply({
    ok: true,
    data: {},
  });
}
