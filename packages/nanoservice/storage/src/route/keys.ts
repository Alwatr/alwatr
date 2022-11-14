import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('GET', '/keys', getStorageKeys);

async function getStorageKeys(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('getStorageKeys');

  const token = connection.requireToken(config.token);
  if (token == null) return;

  const params = connection.requireQueryParams<{storage: string}>({storage: 'string'});
  if (params == null) return;

  const storage = storageProvider.get({name: params.storage});

  connection.reply({
    ok: true,
    data: {keys: storage.keys},
  });
}
