import {logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {storageClient} from '../../lib/storage.js';
import {tokenGenerator} from '../../token.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';
import type {Order} from '@alwatr/type/customer-order-management.js';

// Add order
nanoServer.route('PUT', '/order/', newOrder);

async function newOrder(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('newOrder');

  const params = connection.requireQueryParams<{userId: string}>({userId: 'string'});
  const token = connection.requireToken((token: string) => {
    return tokenGenerator.verify(params.userId, token) === 'valid';
  });
  const order = await connection.requireJsonBody<Order>();

  if (await storageClient.has(order.id, token)) {
    return {
      ok: false,
      statusCode: 400,
      errorCode: 'order_exist',
    };
  }

  // else
  return {
    ok: true,
    data: await storageClient.set<Order>(order, params.userId),
  };
}
