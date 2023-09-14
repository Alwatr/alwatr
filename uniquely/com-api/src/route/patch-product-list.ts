import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';
import {validateUserAuth} from '../lib/validate-user-auth.js';

import type {Product} from '@alwatr/type/customer-order-management.js';

nanoServer.route<Record<string, never>>('PATCH', '/product-list', async (connection) => {
  logger.logMethod?.('patch-product-list');

  await validateUserAuth(connection.getUserAuth(), 'product/patch');

  const params = connection.requireQueryParams<{storage: string}>({storage: 'string'});
  const bodyJson = await connection.requireJsonBody<{data: Product[]}>();

  const storage = config.publicStorage.productList.replace('${name}', params.storage);
  for (const price of bodyJson.data) {
    await storageClient.set<Product>(price, storage);
  }

  return {
    ok: true,
    data: {},
  };
});
