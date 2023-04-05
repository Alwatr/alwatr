import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';

import type {Order} from '@alwatr/type/customer-order-management.js';

/**
 * Get all orders of special user.
 */
nanoServer.route('GET', '/order-list/', async (connection) => {
  logger.logMethod?.('get-order');
  connection.requireToken(config.nanoServer.accessToken);
  const params = connection.requireQueryParams<{userId: string}>({userId: 'string'});
  return await storageClient.getStorage<Order>(config.orderStoragePrefix + params.userId);
});
