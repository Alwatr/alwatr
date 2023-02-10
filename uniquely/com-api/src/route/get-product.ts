import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';

import type {Product} from '@alwatr/type/src/customer-order-management.js';

nanoServer.route('GET', '/product/', async () => {
  logger.logMethod('get-product');
  return await storageClient.getStorage<Product>(config.storage.productStorageName);
});
