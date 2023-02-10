import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('GET', '/keys', getStorageKeys);

function getStorageKeys(connection: AlwatrConnection): AlwatrServiceResponse<{keys: Array<string>}, never> {
  logger.logMethod('getStorageKeys');

  connection.requireToken(config.nanoServer.accessToken);

  const params = connection.requireQueryParams<{storage: string}>({storage: 'string'});

  const storageEngine = storageProvider.get({name: params.storage});

  return {
    ok: true,
    data: {keys: storageEngine.keys},
  };
}
