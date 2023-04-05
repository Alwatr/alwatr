import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';

import type {ProductPrice} from '@alwatr/type/customer-order-management.js';

nanoServer.route('GET', '/price-list/', async (connection) => {
  logger.logMethod?.('get-price-list');
  connection.requireToken(config.nanoServer.accessToken);
  const params = connection.requireQueryParams<{name: string}>({name: 'string'});
  return await storageClient.getStorage<ProductPrice>(config.priceStoragePrefix + params.name);
});
