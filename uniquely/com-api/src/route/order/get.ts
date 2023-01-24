import {logger} from '../../config.js';
import {nanoServer} from '../../lib/nano-server.js';
import {storageClient} from '../../lib/storage.js';
import {tokenGenerator} from '../../token.js';

import type {AlwatrConnection} from '@alwatr/nano-server';
import type {AlwatrServiceResponse} from '@alwatr/type';
import type {Order} from '@alwatr/type/src/customer-order-management.js';

// Get current order object
nanoServer.route('GET', '/order/', getOrder);

async function getOrder(connection: AlwatrConnection): Promise<AlwatrServiceResponse> {
  logger.logMethod('getOrder');

  const params = connection.requireQueryParams<{userId: string}>({userId: 'string'});
  connection.requireToken((token: string) => {
    return tokenGenerator.verify(params.userId, token) === 'valid';
  });

  return await storageClient.getStorage<Order>(params.userId);
}
