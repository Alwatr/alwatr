import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection} from '@alwatr/nano-server';

nanoServer.route('GET', '/storage', getStorage);

async function getStorage(connection: AlwatrConnection): Promise<void> {
  logger.logMethod('getStorage');

  const token = connection.requireToken(config.nanoServer.accessToken);
  if (token == null) return;

  const params = connection.requireQueryParams<{name: string}>({name: 'string'});
  if (params == null) return;

  const storageEngine = storageProvider.get({name: params.name});

  connection.reply({...storageEngine._storage});
}
