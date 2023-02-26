import {FiniteStateMachine} from '@alwatr/fsm';

import {orderStorageContextConsumer, topAppBarContextProvider} from '../context.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Order} from '@alwatr/type/src/customer-order-management.js';

export const pageOrderListFsm = new FiniteStateMachine({
  id: 'page-order-list',
  initial: 'unresolved',
  context: {
    orderStorage: <AlwatrDocumentStorage<Order> | null> null,
  },
  states: {
    $all: {
      on: {
        CONNECTED: '$self',
      },
    },
    unresolved: {
      on: {
        IMPORT: '$self',
        FIRST_UPDATED: 'loading',
        LOADED: 'list',
      },
    },
    loading: {
      on: {
        LOADED: 'list',
      },
    },
    list: {
      on: {
        REQUEST_UPDATE: 'loading',
      },
    },
  },
} as const);

pageOrderListFsm.signal.subscribe((state) => {
  switch (state.by) {
    case 'IMPORT':
      // just in unresolved
      topAppBarContextProvider.setValue({
        headlineKey: 'loading',
      });
      break;

    case 'CONNECTED':
      topAppBarContextProvider.setValue({
        headlineKey: 'page_order_list_headline',
      });
      break;

    case 'INIT':
      if (orderStorageContextConsumer.getValue() == null) {
        orderStorageContextConsumer.request(null, {debounce: 'Timeout'});
      }
      break;

    case 'REQUEST_UPDATE':
      orderStorageContextConsumer.request(null, {debounce: 'Timeout'});
      break;
  }
});

orderStorageContextConsumer.subscribe((orderStorage) => {
  pageOrderListFsm.transition('LOADED', {orderStorage});
});
