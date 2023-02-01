import {config, logger} from '../config.js';
import {nanoServer} from '../lib/nano-server.js';
import {storageClient} from '../lib/storage.js';

import type {AlwatrConnection, AlwatrServiceResponse} from '@alwatr/nano-server';

nanoServer.route('GET', '/form/storage', getFormStorage);

async function getFormStorage(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('getFormStorage');
  connection.requireToken(config.nanoServer.accessToken);
  const params = connection.requireQueryParams<{storage: string}>({storage: 'string'});
  return await storageClient.getStorage(params.storage);
}
