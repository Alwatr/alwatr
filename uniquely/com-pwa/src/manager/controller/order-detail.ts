import {FiniteStateMachine} from '@alwatr/fsm';
import {eventListener} from '@alwatr/signal';

import {fetchOrderStorage} from '../context-provider/order-storage.js';
import {fetchProductStorage} from '../context-provider/product-storage.js';
import {orderStorageContextConsumer, productStorageContextConsumer, topAppBarContextProvider} from '../context.js';

import type {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';
import type {Order, Product} from '@alwatr/type/customer-order-management.js';

export const pageOrderDetailFsm = new FiniteStateMachine({
  id: 'page-order-detail',
  initial: 'unresolved',
  context: {
    orderId: <number | null>null,
    orderStorage: <AlwatrDocumentStorage<Order> | null>null,
    productStorage: <AlwatrDocumentStorage<Product> | null> null,
  },
  states: {
    $all: {
      on: {
        SHOW_DETAIL: '$self',
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
        CONTEXT_LOADED: 'detail',
      },
    },
    detail: {
      on: {
        REQUEST_UPDATE: 'reloading',
        INVALID_ORDER: 'notFound',
      },
    },
    reloading: {
      on: {
        CONTEXT_LOADED: 'detail',
      },
    },
    notFound: {
      on: {
        CONTEXT_LOADED: 'detail',
      },
    },
  },
});

pageOrderDetailFsm.signal.subscribe(async (state) => {
  // logger.logMethodArgs('pageOrderDetailFsm.changed', state);
  switch (state.by) {
    case 'IMPORT': {
      // just in unresolved
      topAppBarContextProvider.setValue({
        headlineKey: 'loading',
      });
      if (productStorageContextConsumer.getValue() == null) {
        fetchProductStorage();
      }
      if (orderStorageContextConsumer.getValue() == null) {
        fetchOrderStorage();
      }
      break;
    }

    case 'CONNECTED': {
      topAppBarContextProvider.setValue({
        headlineKey: 'page_order_list_headline',
      });
      break;
    }

    case 'REQUEST_UPDATE': {
      await fetchOrderStorage(); // if not changed signal not fired!
      pageOrderDetailFsm.transition('CONTEXT_LOADED');
      break;
    }
  }

  if (state.to === 'loading') {
    if (pageOrderDetailFsm.context.orderStorage != null && pageOrderDetailFsm.context.productStorage != null) {
      pageOrderDetailFsm.transition('CONTEXT_LOADED');
    }
  }
});

productStorageContextConsumer.subscribe((productStorage) => {
  pageOrderDetailFsm.context.productStorage = productStorage;
  if (pageOrderDetailFsm.context.orderStorage != null) {
    pageOrderDetailFsm.transition('CONTEXT_LOADED');
  }
});

orderStorageContextConsumer.subscribe((orderStorage) => {
  pageOrderDetailFsm.context.orderStorage = orderStorage;
  if (pageOrderDetailFsm.context.productStorage != null) {
    pageOrderDetailFsm.transition('CONTEXT_LOADED');
  }
});

eventListener.subscribe<ClickSignalType>('page_order_detail_reload_click_event', () => {
  pageOrderDetailFsm.transition('REQUEST_UPDATE');
});
