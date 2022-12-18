import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('GET', '/keys', getStorageKeys);

async function getStorageKeys(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('getStorageKeys');

  const token = connection.requireToken(config.nanoServer.accessToken);
  if (token == null) return;

  const params = connection.requireQueryParams<{storage: string}>({storage: 'string'});
  if (params == null) return;

  const storageEngine = storageProvider.get({name: params.storage});

  connection.reply({
    ok: true,
    data: {keys: storageEngine.keys},
  });
}
