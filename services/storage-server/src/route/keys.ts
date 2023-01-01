import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';


nanoServer.route('GET', '/keys', getStorageKeys);

function getStorageKeys(connection: AlwatrConnection): AlwatrServiceResponse {
  logger.logMethod('getStorageKeys');

  connection.requireToken(config.nanoServer.accessToken);

  const params = connection.requireQueryParams<{storage: string}>({storage: 'string'});

  const storageEngine = storageProvider.get({name: params.storage});

  return {
    ok: true,
    data: {keys: storageEngine.keys},
  };
}
