import {logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {orderStorageClient} from '../../lib/storage.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';
import type {Order} from '@alwatr/type/com.js';

// Add order
nanoServer.route('PUT', '/order', newOrder);

async function newOrder(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('newOrder');

  const token = connection.requireToken(() => {
    // vliadator with @alwatr/token
    return true;
  });
  const order = await connection.requireJsonBody<Order>();

  orderStorageClient.config.name = token;

  order.id ??= 'auto_increment';

  try {
    if (order.id !== 'auto_increment' && (await orderStorageClient.has(order.id))) {
      return {
        ok: false,
        statusCode: 400,
        errorCode: 'order_exist',
      };
    }
    // else
    return {
      ok: true,
      data: (await orderStorageClient.set(order)),
    };
  }
  catch (_err) {
    const err = _err as Error;
    logger.error('newOrder', err.message || 'storage_error', err);
    return {
      ok: false,
      statusCode: 500,
      errorCode: 'storage_error',
      meta: {
        name: err.name,
        message: err.message,
        cause: err.cause,
      },
    };
  }
}
