import {logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {orderStorageClient} from '../../lib/storage.js';
import {tokenGenerator} from '../../token.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';
import type {Order} from '@alwatr/type/customer-order-management.js';

// Add order
nanoServer.route('PUT', '/order', newOrder);

async function newOrder(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('newOrder');

  const params = connection.requireQueryParams<{userId: string}>({userId: 'string'});

  const token = connection.requireToken((token: string) => {
    logger.logOther('auth', {token, userId: params.userId});
    const isValid = tokenGenerator.verify(params.userId, token);
    return isValid === 'valid';
  });

  const order = await connection.requireJsonBody<Order>();

  orderStorageClient.config.name = token;

  try {
    if (await orderStorageClient.has(order.id)) {
      return {
        ok: false,
        statusCode: 400,
        errorCode: 'order_exist',
      };
    }
    // else
    return {
      ok: true,
      data: await orderStorageClient.set(order),
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
