import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';

import type {Product} from '@alwatr/type/src/customer-order-management.js';

nanoServer.route('GET', '/product/', async (connection) => {
  logger.logMethod('get-product');
  connection.requireToken(config.nanoServer.accessToken);
  return await storageClient.getStorage<Product>(config.storage.productStorageName);
});
