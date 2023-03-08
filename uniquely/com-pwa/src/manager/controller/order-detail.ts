import {FiniteStateMachine} from '@alwatr/fsm';
import {redirect} from '@alwatr/router';
import {eventListener} from '@alwatr/signal';

import {fetchOrderStorage} from '../context-provider/order-storage.js';
import {fetchProductStorage} from '../context-provider/product-storage.js';
import {orderStorageContextConsumer, productStorageContextConsumer, topAppBarContextProvider} from '../context.js';

import type {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';
import type {Order, Product} from '@alwatr/type/customer-order-management.js';

export const pageOrderDetailStateMachine = new FiniteStateMachine({
  id: 'page_order_detail',
  initial: 'unresolved',
  context: {
    orderId: <number | null>null,
    orderStorage: <AlwatrDocumentStorage<Order> | null>null,
    productStorage: <AlwatrDocumentStorage<Product> | null> null,
  },
  stateRecord: {
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

const buttons = {
  backToOrderList: {
    icon: 'arrow-back-outline',
    flipRtl: true,
    clickSignalId: pageOrderDetailStateMachine.config.id + '_back_to_order_list_click_event',
  },
  reload: {
    icon: 'reload-outline',
    flipRtl: true,
    clickSignalId: pageOrderDetailStateMachine.config.id + '_reload_click_event',
  },
} as const;

pageOrderDetailStateMachine.signal.subscribe(async (state) => {
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
        startIcon: buttons.backToOrderList,
        endIconList: [buttons.reload],
      });
      break;
    }

    case 'REQUEST_UPDATE': {
      await fetchOrderStorage(); // if not changed signal not fired!
      pageOrderDetailStateMachine.transition('CONTEXT_LOADED');
      break;
    }
  }

  if (state.target === 'loading') {
    if (
      pageOrderDetailStateMachine.context.orderStorage != null &&
      pageOrderDetailStateMachine.context.productStorage != null
    ) {
      pageOrderDetailStateMachine.transition('CONTEXT_LOADED');
    }
  }
});

productStorageContextConsumer.subscribe((productStorage) => {
  pageOrderDetailStateMachine.context.productStorage = productStorage;
  if (pageOrderDetailStateMachine.context.orderStorage != null) {
    pageOrderDetailStateMachine.transition('CONTEXT_LOADED');
  }
});

orderStorageContextConsumer.subscribe((orderStorage) => {
  pageOrderDetailStateMachine.context.orderStorage = orderStorage;
  if (pageOrderDetailStateMachine.context.productStorage != null) {
    pageOrderDetailStateMachine.transition('CONTEXT_LOADED');
  }
});

eventListener.subscribe<ClickSignalType>(buttons.backToOrderList.clickSignalId, () => {
  redirect({
    sectionList: ['order-list'],
  });
});

eventListener.subscribe<ClickSignalType>(buttons.reload.clickSignalId, () => {
  pageOrderDetailStateMachine.transition('REQUEST_UPDATE');
});
