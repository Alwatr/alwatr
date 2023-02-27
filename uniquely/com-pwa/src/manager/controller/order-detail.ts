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
    order: <Order | null>null,
    orderId: <number | null>null,
    orderStorage: <AlwatrDocumentStorage<Order> | null>null,
    productStorage: <AlwatrDocumentStorage<Product> | null> null,
  },
  states: {
    $all: {
      on: {
        SHOW_DETAIL: '$self',
        CONNECTED: '$self',
        CONTEXT_LOADED: 'detail',
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
      on: {},
    },
    detail: {
      on: {
        REQUEST_UPDATE: 'reloading',
        INVALID_ORDER: 'notFound',
      },
    },
    reloading: {
      on: {},
    },
    notFound: {
      on: {},
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
      const fetchList = [];
      if (productStorageContextConsumer.getValue() == null) {
        fetchList.push(fetchProductStorage());
      }
      if (orderStorageContextConsumer.getValue() == null) {
        fetchList.push(fetchOrderStorage());
      }
      await Promise.all(fetchList);
      pageOrderDetailFsm.transition('CONTEXT_LOADED');
      break;
    }

    case 'CONNECTED': {
      topAppBarContextProvider.setValue({
        headlineKey: 'page_order_list_headline',
      });
      break;
    }

    case 'REQUEST_UPDATE': {
      await fetchOrderStorage();
      pageOrderDetailFsm.transition('CONTEXT_LOADED');
      break;
    }
  }

  if (state.to === 'detail') {
    // validate order id
    const order = pageOrderDetailFsm.context.orderStorage?.data[pageOrderDetailFsm.context.orderId ?? ''] ?? null;
    pageOrderDetailFsm.transition('INVALID_ORDER', {order});
  }
});

productStorageContextConsumer.subscribe((productStorage) => {
  pageOrderDetailFsm.context.productStorage = productStorage;
  // pageOrderDetailFsm.transition('PRODUCT_LOADED', {productStorage});
});

orderStorageContextConsumer.subscribe((orderStorage) => {
  pageOrderDetailFsm.context.orderStorage = orderStorage;
  // pageOrderDetailFsm.transition('ORDER_LOADED', {orderStorage});
});

eventListener.subscribe<ClickSignalType>('page_order_detail_reload_click_event', () => {
  pageOrderDetailFsm.transition('REQUEST_UPDATE');
});
