import {finiteStateMachineProvider, type FsmTypeHelper} from '@alwatr/fsm';

import {orderStorageContextConsumer} from '../context-provider/order-storage.js';
import {productStorageContextConsumer} from '../context-provider/product-storage.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Order, Product} from '@alwatr/type/customer-order-management.js';

export const orderDetailFsmConstructor = finiteStateMachineProvider.defineConstructor('order_detail_fsm', {
  initial: 'pending',
  context: {
    orderId: <number | null>null,
    orderStorage: <AlwatrDocumentStorage<Order> | null>null,
    productStorage: <AlwatrDocumentStorage<Product> | null>null,
  },
  stateRecord: {
    $all: {
      on: {},
    },
    pending: {
      entry: 'request_all_context',
      on: {
        context_request_complete: {
          target: 'detail',
          actions: 'set_context',
        },
      },
    },
    detail: {
      on: {
        not_found: {
          target: 'notFound',
        },
      },
    },
    notFound: {
      on: {},
    },
  },
});

export type OrderDetailFsm = FsmTypeHelper<typeof orderDetailFsmConstructor>;

// entries actions
finiteStateMachineProvider.defineActions<OrderDetailFsm>('order_detail_fsm', {
  // tmp
  request_all_context: (fsmInstance) => {
    productStorageContextConsumer.request();
    orderStorageContextConsumer.request();

    productStorageContextConsumer.subscribe(() => {
      if (orderStorageContextConsumer.getState().target === 'complete') {
        fsmInstance.transition('context_request_complete');
      }
    });
    orderStorageContextConsumer.subscribe(() => {
      if (productStorageContextConsumer.getState().target === 'complete') {
        fsmInstance.transition('context_request_complete');
      }
    });
  },

  set_context: (fsmInstance) => {
    fsmInstance.setContext({
      orderStorage: orderStorageContextConsumer.getResponse() as AlwatrDocumentStorage<Order>,
    });
    fsmInstance.setContext({
      productStorage: productStorageContextConsumer.getResponse() as AlwatrDocumentStorage<Product>,
    });
  },

});
