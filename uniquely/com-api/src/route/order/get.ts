import {Order} from '@alwatr/type/src/com.js';

import {logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {orderStorageClient} from '../../lib/storage.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';

// Get current order object
nanoServer.route('GET', '/order', getOrder);

async function getOrder(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('getOrder');

  const {userId} = connection.requireQueryParams<{userId: string}>({'userId': 'string'});

  const storage = await orderStorageClient.getStorage();
  const userOrderList: Array<Order> = [];

  for (const order in storage.data) {
    if (!Object.prototype.hasOwnProperty.call(storage.data, order)) continue;
    if (storage.data[order].user.id === userId) {
      userOrderList.push(storage.data[order]);
    }
  }

  try {
    return {
      ok: true,
      data: {
        orderList: userOrderList,
      },
    };
  }
  catch (_err) {
    const err = _err as Error;
    logger.error('getOrder', err.message || 'storage_error', err);
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
