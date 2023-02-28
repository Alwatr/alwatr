import {FiniteStateMachine} from '@alwatr/fsm';
import {eventListener} from '@alwatr/signal';

import {fetchOrderStorage} from '../context-provider/order-storage.js';
import {orderStorageContextConsumer, topAppBarContextProvider} from '../context.js';

import type {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';
import type {Order} from '@alwatr/type/customer-order-management.js';

export const pageOrderListFsm = new FiniteStateMachine({
  id: 'page-order-list',
  initial: 'unresolved',
  context: {
    orderStorage: <AlwatrDocumentStorage<Order> | null>null,
  },
  states: {
    $all: {
      on: {
        CONNECTED: '$self',
        CONTEXT_LOADED: '$self',
      },
    },
    unresolved: {
      on: {
        IMPORT: 'resolving',
      },
    },
    resolving: {
      on: {
        CONNECTED: 'loading',
      },
    },
    loading: {
      on: {
        CONTEXT_LOADED: 'list',
      },
    },
    list: {
      on: {
        REQUEST_UPDATE: 'reloading',
      },
    },
    reloading: {
      on: {
        CONTEXT_LOADED: 'list',
      },
    },
  },
} as const);

pageOrderListFsm.signal.subscribe(async (state) => {
  // logger.logMethodArgs('pageOrderListFsm.changed', state);
  switch (state.by) {
    case 'IMPORT':
      // just in unresolved
      topAppBarContextProvider.setValue({
        headlineKey: 'loading',
      });
      if (orderStorageContextConsumer.getValue() == null) {
        fetchOrderStorage();
      }
      break;

    case 'CONNECTED':
      topAppBarContextProvider.setValue({
        headlineKey: 'page_order_list_headline',
      });
      break;

    case 'REQUEST_UPDATE':
      await fetchOrderStorage();
      pageOrderListFsm.transition('CONTEXT_LOADED');
      break;
  }

  if (state.to === 'loading') {
    if (pageOrderListFsm.context.orderStorage != null) {
      pageOrderListFsm.transition('CONTEXT_LOADED');
    }
  }
});

orderStorageContextConsumer.subscribe((orderStorage) => {
  pageOrderListFsm.transition('CONTEXT_LOADED', {orderStorage});
});

eventListener.subscribe<ClickSignalType>('page_order_list_reload_click_event', () => {
  pageOrderListFsm.transition('REQUEST_UPDATE');
});

eventListener.subscribe<ClickSignalType>('new_order_click_event', () => {
  // TODO: redirect
});
