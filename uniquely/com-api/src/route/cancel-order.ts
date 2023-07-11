import {logger} from '../lib/config.js';
import {nanoServer} from '../lib/server.js';
import {getUserOrder, patchUserOrder} from '../lib/user-order.js';
import {validateUserAuth} from '../lib/validate-user-auth.js';

import type {Order} from '@alwatr/type/customer-order-management.js';

// Cancel order
nanoServer.route('PATCH', '/cancel-order', async (connection) => {
  logger.logMethod?.('cancel-order');

  const userAuth = await validateUserAuth(connection.getUserAuth());
  const orderId = connection.requireQueryParams<{orderId: string}>({orderId: 'string'}).orderId;

  const order = (await getUserOrder(userAuth.id)).data[orderId] as Order | null;
  if (order == null) {
    return {
      ok: false,
      statusCode: 400,
      errorCode: 'order_not_found',
    };
  }

  order.status = 'canceled';
  await patchUserOrder(userAuth.id, order);

  return {
    ok: true,
    data: {},
  };
});
