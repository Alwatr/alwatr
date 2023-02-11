import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';

import type {Product} from '@alwatr/type/src/customer-order-management.js';

nanoServer.route('PATCH', '/product/', async (connection) => {
  logger.logMethod('patch-product');
  connection.requireToken(config.nanoServer.adminToken);
  const bodyJson = await connection.requireJsonBody<Product>();
  bodyJson.id ??= 'auto_increment';

  return {
    ok: true,
    data: await storageClient.set(bodyJson, config.storage.productStorageName),
  };
});
