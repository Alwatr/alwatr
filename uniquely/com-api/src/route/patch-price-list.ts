import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';
import {validateUserAuth} from '../lib/validate-user-auth.js';

import type {ProductPrice} from '@alwatr/type/customer-order-management.js';

nanoServer.route<Record<string, never>>('PATCH', '/price-list', async (connection) => {
  logger.logMethod?.('patch-price-list');

  await validateUserAuth(connection.getUserAuth(), 'price/patch');

  const params = connection.requireQueryParams<{name: string}>({name: 'string'});
  const bodyJson = await connection.requireJsonBody<{data: ProductPrice[]}>();

  const storage = config.publicStorage.priceList.replace('${name}', params.name);
  for (const price of bodyJson.data) {
    await storageClient.set<ProductPrice>(price, storage);
  }

  return {
    ok: true,
    data: {},
  };
});
