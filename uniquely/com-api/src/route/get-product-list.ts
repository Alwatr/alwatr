import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';

import type {Product} from '@alwatr/type/customer-order-management.js';

nanoServer.route('GET', '/product-list/', async (connection) => {
  logger.logMethod('get-product-list');
  connection.requireToken(config.nanoServer.accessToken);
  const params = connection.requireQueryParams<{storage: string}>({storage: 'string'});
  if (config.productStorageList.indexOf(params.storage) === -1) {
    return {
      ok: false,
      statusCode: 404,
      errorCode: 'product_not_found',
    };
  }
  return await storageClient.getStorage<Product>(config.productStoragePrefix + params.storage);
});
