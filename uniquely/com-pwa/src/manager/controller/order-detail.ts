import {finiteStateMachineProvider, type FsmTypeHelper} from '@alwatr/fsm';
import {requestableContextConsumer} from '@alwatr/signal';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';

import {config} from '../../config.js';

import type {RequestableContext} from '@alwatr/signal/type.js';
import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Order, Product} from '@alwatr/type/customer-order-management.js';

const orderStorageContextConsumer =
  requestableContextConsumer.bind<AlwatrDocumentStorage<Order>>('order-storage-context');

const productStorageContextConsumer = requestableContextConsumer.bind<
  AlwatrDocumentStorage<Product>,
  {productStorageName: string}
>('product-storage-context');

export const orderDetailFsmConstructor = finiteStateMachineProvider.defineConstructor('order_detail_fsm', {
  initial: 'pending',
  context: {
    orderId: <number | null> null,
    orderStorage: <AlwatrDocumentStorage<Order> | null> null,
    productStorage: <AlwatrDocumentStorage<Product> | null> null,
  },
  stateRecord: {
    $all: {
      on: {},
    },
    pending: {
      entry: ['initial_request_order_storage', 'initial_request_product_storage'],
      on: {
        context_request_initial: {},
        context_request_pending: {},
        context_request_error: {
          target: 'contextError',
        },
        context_request_complete: {
          target: 'detail',
          condition: 'check_all_context_load_complete',
        },
        context_request_reloading: {
          target: 'reloading',
        },
      },
    },
    // TODO: Only load context that have not been loaded.
    contextError: {
      on: {
        request_context: {
          target: 'pending',
          actions: ['reload_request_order_storage', 'reload_request_product_storage'],
        },
      },
    },
    detail: {
      on: {
        request_context: {
          target: 'reloading',
          actions: ['reload_request_order_storage', 'reload_request_product_storage'],
        },
        not_found: {
          target: 'notFound',
        },
      },
    },
    notFound: {
      on: {},
    },
    reloading: {
      on: {
        context_request_complete: {
          target: 'detail',
          condition: 'check_all_context_load_complete',
        },
        context_request_reloading: {},
        context_request_error: {
          target: 'detail',
          actions: 'reloading_failed',
        },
        not_found: {
          target: 'notFound',
        },
      },
    },
  },
});

export type OrderDetailFsm = FsmTypeHelper<typeof orderDetailFsmConstructor>;

// entries actions
finiteStateMachineProvider.defineActions<OrderDetailFsm>('order_detail_fsm', {
  initial_request_order_storage: () => {
    if (orderStorageContextConsumer.getValue().state === 'initial') {
      orderStorageContextConsumer.request(null);
    }
  },
  initial_request_product_storage: () => {
    if (productStorageContextConsumer.getValue().state === 'initial') {
      for (const productStorageName of config.productStorageList) {
        productStorageContextConsumer.request({productStorageName: productStorageName});
      }
    }
  },

  reload_request_order_storage: () => {
    if (orderStorageContextConsumer.getValue().state === 'reloading') return;
    // else
    orderStorageContextConsumer.request(null);
  },

  reload_request_product_storage: () => {
    if (productStorageContextConsumer.getValue().state !== 'reloading') return;
    // else
    for (const productStorageName of config.productStorageList) {
      productStorageContextConsumer.request({productStorageName: productStorageName});
    }
  },

  reloading_failed: () => {
    snackbarSignalTrigger.request({messageKey: 'fetch_failed_description'});
  },
});

// condition
finiteStateMachineProvider.defineActions<OrderDetailFsm>('order_detail_fsm', {
  check_all_context_load_complete: (fsmInstance): boolean => {
    const orderStorage = orderStorageContextConsumer.getValue();
    const productStorage = productStorageContextConsumer.getValue();
    if (orderStorage.state !== 'complete' || productStorage.state !== 'complete') {
      return false;
    }

    const orderId = fsmInstance.getContext().orderId;
    if (orderId == null || orderStorage.content.data[orderId] == null) {
      fsmInstance.transition('not_found');
      return false;
    }

    return true;
  },
});

finiteStateMachineProvider.defineSignals<OrderDetailFsm>('order_detail_fsm', [
  {
    signalId: orderStorageContextConsumer.id,
    callback: (context: RequestableContext<AlwatrDocumentStorage<Order>>, fsmInstance): void => {
      fsmInstance.transition(`context_request_${context.state}`, {orderStorage: context.content});
    },
    receivePrevious: 'NextCycle',
  },
  {
    signalId: productStorageContextConsumer.id,
    callback: (context: RequestableContext<AlwatrDocumentStorage<Product>>, fsmInstance): void => {
      fsmInstance.transition(`context_request_${context.state}`, {productStorage: context.content});
    },
    receivePrevious: 'NextCycle',
  },
]);
