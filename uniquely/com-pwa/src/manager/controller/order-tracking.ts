import {FiniteStateMachine} from '@alwatr/fsm';
import {eventListener} from '@alwatr/signal';

import {fetchOrderStorage} from '../context-provider/order-storage.js';
import {orderStorageContextConsumer, topAppBarContextProvider} from '../context.js';

import type {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';
import type {Order} from '@alwatr/type/customer-order-management.js';

export const pageOrderTrackingFsm = new FiniteStateMachine({
  id: 'page-order-tracking',
  initial: 'unresolved',
  context: {
    orderId: <number | null>null,
    orderStorage: <AlwatrDocumentStorage<Order> | null>null,
  },
  stateRecord: {
    $all: {
      on: {
        SHOW_TRACKING: '$self',
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
        CONTEXT_LOADED: 'tracking',
      },
    },
    tracking: {
      on: {
        REQUEST_UPDATE: 'reloading',
        INVALID_ORDER: 'notFound',
      },
    },
    reloading: {
      on: {
        CONTEXT_LOADED: 'tracking',
      },
    },
    notFound: {
      on: {
        CONTEXT_LOADED: 'tracking',
      },
    },
  },
});

pageOrderTrackingFsm.signal.subscribe(async (state) => {
  // logger.logMethodArgs('pageOrderTrackingFsm.changed', state);
  switch (state.by) {
    case 'IMPORT': {
      // just in unresolved
      topAppBarContextProvider.setValue({
        headlineKey: 'loading',
      });
      if (orderStorageContextConsumer.getValue() == null) {
        fetchOrderStorage();
      }
      break;
    }

    case 'CONNECTED': {
      topAppBarContextProvider.setValue({
        headlineKey: 'page_order_tracking_headline',
      });
      break;
    }

    case 'REQUEST_UPDATE': {
      await fetchOrderStorage(); // if not changed signal not fired!
      pageOrderTrackingFsm.transition('CONTEXT_LOADED');
      break;
    }
  }

  if (state.target === 'loading') {
    if (pageOrderTrackingFsm.context.orderStorage != null) {
      pageOrderTrackingFsm.transition('CONTEXT_LOADED');
    }
  }
});

orderStorageContextConsumer.subscribe((orderStorage) => {
  pageOrderTrackingFsm.context.orderStorage = orderStorage;
  pageOrderTrackingFsm.transition('CONTEXT_LOADED');
});

eventListener.subscribe<ClickSignalType>('page_order_tracking_reload_click_event', () => {
  pageOrderTrackingFsm.transition('REQUEST_UPDATE');
});
