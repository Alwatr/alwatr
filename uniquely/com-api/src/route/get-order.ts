import {config, logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {storageClient} from '../lib/storage.js';

import type {Order} from '@alwatr/type/customer-order-management.js';

// Get all orders of special customer
nanoServer.route('GET', '/order/', async (connection) => {
  logger.logMethod('get-order');

  const params = connection.requireQueryParams<{userId: string}>({userId: 'string'});
  // connection.requireToken((token: string) => {
  //   return tokenGenerator.verify(params.userId, token) === 'valid';
  // });
  connection.requireToken(config.nanoServer.accessToken);

  return await storageClient.getStorage<Order>(params.userId);
});
