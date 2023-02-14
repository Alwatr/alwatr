import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';

import type {Product} from '@alwatr/type/customer-order-management.js';

nanoServer.route('GET', '/product-list/', async (connection) => {
  logger.logMethod('get-product-list');
  connection.requireToken(config.nanoServer.accessToken);
  const params = connection.requireQueryParams<{name: string}>({name: 'string'});
  return await storageClient.getStorage<Product>(config.storage.productStorageName + '-' + params.name);
});
