import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('GET', '/all', getAllDocument);

async function getAllDocument(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('getAllDocument');

  const token = connection.requireToken(config.nanoServer.accessToken);
  if (token == null) return;

  const params = connection.requireQueryParams<{storage: string}>({storage: 'string'});
  if (params == null) return;

  const storage = storageProvider.get({name: params.storage});

  connection.reply({
    ok: true,
    data: storage._data,
  });
}
