import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageProvider} from '../lib/storage-provider.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';

nanoServer.route('GET', '/storage', getStorage);

function getStorage(connection: AlwatrConnection): AlwatrServiceResponse {
  logger.logMethod('getStorage');

  connection.requireToken(config.nanoServer.accessToken);

  const params = connection.requireQueryParams<{name: string}>({name: 'string'});

  const storageEngine = storageProvider.get({name: params.name});

  return {...storageEngine._storage};
}
