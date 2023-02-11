import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';

import type {Product} from '@alwatr/type/src/customer-order-management.js';

nanoServer.route('PUT', '/product/', async (connection) => {
  logger.logMethod('put-product');
  connection.requireToken(config.nanoServer.adminToken);
  const bodyJson = await connection.requireJsonBody<Product>();

  return {
    ok: true,
    data: await storageClient.set(bodyJson, config.storage.productStorageName),
  };
});
