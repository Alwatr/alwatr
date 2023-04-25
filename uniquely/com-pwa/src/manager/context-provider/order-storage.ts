import {serverContextConsumer} from '@alwatr/context';

import {config} from '../../config.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {ComUser, Order} from '@alwatr/type/customer-order-management.js';

export const orderStorageContextConsumer = serverContextConsumer<AlwatrDocumentStorage<Order>>(
    'order_storage_context',
    {
      ...config.fetchContextOptions,
      url: config.api + '/order-list/',
    },
);

orderStorageContextConsumer.fsm.defineSignals([
  {
    signalId: 'user_context',
    callback: (user: ComUser): void => {
      orderStorageContextConsumer.request({
        queryParameters: {
          userId: user.id,
        },
      });
    },
    receivePrevious: 'NextCycle',
  },
  {
    signalId: 'reload_order_storage',
    transition: 'REQUEST',
  },
]);
