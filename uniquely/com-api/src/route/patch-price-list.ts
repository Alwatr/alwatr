import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';

import type {ProductPrice} from '@alwatr/type/customer-order-management.js';

nanoServer.route('PATCH', '/price-list/', async (connection) => {
  logger.logMethod?.('patch-price-list');
  connection.requireToken(config.nanoServer.adminToken);
  const params = connection.requireQueryParams<{name: string}>({name: 'string'});
  const bodyJson = await connection.requireJsonBody<{data: Array<ProductPrice>}>();

  for (const price of bodyJson.data) {
    await storageClient.set(price, config.priceStoragePrefix + params.name);
  }

  return {
    ok: true,
    data: {},
  };
});
