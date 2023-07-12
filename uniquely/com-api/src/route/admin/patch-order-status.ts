import {orderStatusCS, type Order} from '@alwatr/type/customer-order-management.js';

import {logger} from '../../lib/config.js';
import {nanoServer} from '../../lib/server.js';
import {getUserOrder, patchUserOrder} from '../../lib/user-order.js';
import {validateUserAuth} from '../../lib/validate-user-auth.js';


// Change order status
nanoServer.route<{userId: string, order: Order}>('PATCH', '/order-status', async (connection) => {
  logger.logMethod?.('patch-order-status');

  await validateUserAuth(connection.getUserAuth(), 'order-status/patch');
  const params = connection.requireQueryParams<{userId: string, orderId: string, status: Order['status']}>({
    userId: 'string', orderId: 'string', status: 'string',
  });

  const order = (await getUserOrder(params.userId)).data[params.orderId] as Order | null;
  if (order == null) {
    return {
      ok: false,
      statusCode: 400,
      errorCode: 'order_not_found',
    };
  }
  else if (!orderStatusCS.includes(params.status)) {
    return {
      ok: false,
      statusCode: 400,
      errorCode: 'invalid_order_status',
    };
  }

  order.status = params.status;
  await patchUserOrder(params.userId, order);

  return {
    ok: true,
    data: {
      userId: params.userId,
      order,
    },
  };
});
