import {logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {patchUserOrder} from '../lib/user-order.js';
import {validateUserAuth} from '../lib/validate-user-auth.js';

import type {Order} from '@alwatr/type/customer-order-management.js';

// Insert new order
nanoServer.route<Order>('PUT', '/order', async (connection) => {
  logger.logMethod?.('put-order');

  const userAuth = await validateUserAuth(connection.getUserAuth());
  const remoteAddress = connection.getRemoteAddress();
  const clientId = connection.requireClientId();

  let order = await connection.requireJsonBody<Order>();

  order.id = 'auto_increment';
  order.status = 'registered';
  order.clientId = clientId;
  order.remoteAddress = remoteAddress;

  order = await patchUserOrder(userAuth.id, order);

  return {
    ok: true,
    data: order,
  };
});
