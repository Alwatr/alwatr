import {serverContextConsumer} from '@alwatr/context';

import {userProfileContextConsumer} from './user.js';
import {config} from '../../config.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {ComUser, Order} from '@alwatr/type/customer-order-management.js';

export const orderStorageContextConsumer = serverContextConsumer<AlwatrDocumentStorage<Order>>(
    'order_storage_context',
    config.fetchContextOptions,
);

orderStorageContextConsumer.fsm.defineSignals([
  {
    signalId: userProfileContextConsumer.id,
    callback: (user: ComUser): void => {
      orderStorageContextConsumer.request({
        url: config.serverContext.userOrderList,
        token: user.token!,
      });
    },
    receivePrevious: 'NextCycle',
  },
  {
    signalId: 'reload_order_storage',
    transition: 'REQUEST',
  },
]);
