import {FiniteStateMachine} from '@alwatr/fsm';
import {eventListener} from '@alwatr/signal';
import {getLocalStorageItem} from '@alwatr/util';

import {fetchPriceStorage} from '../context-provider/price-storage.js';
import {fetchProductStorage} from '../context-provider/product-storage.js';
import {
  finalPriceStorageContextConsumer,
  priceStorageContextConsumer,
  productStorageContextConsumer,
  topAppBarContextProvider,
} from '../context.js';

import type {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';
import type {Product, ProductPrice, OrderDraft} from '@alwatr/type/customer-order-management.js';

export const pageNewOrderFsm = new FiniteStateMachine({
  id: 'page-order-detail',
  initial: 'unresolved',
  context: {
    order: <OrderDraft>getLocalStorageItem('draft-order-x1', {id: 'new', status: 'draft'}),
    productStorage: <AlwatrDocumentStorage<Product> | null>null,
    priceStorage: <AlwatrDocumentStorage<ProductPrice> | null>null,
    finalPriceStorage: <AlwatrDocumentStorage<ProductPrice> | null>null,
  },
  states: {
    $all: {
      on: {
        CONNECTED: '$self',
        PARTIAL_LOAD: '$self',
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
        CONTEXT_LOADED: 'edit',
      },
    },
    edit: {
      on: {
        SELECT_PRODUCT: 'productList',
        EDIT_SHIPPING: 'shippingForm',
        SUBMIT: 'review',
      },
    },
    productList: {
      on: {
        SUBMIT: 'edit',
      },
    },
    shippingForm: {
      on: {
        SUBMIT: 'edit',
      },
    },
    review: {
      on: {
        SUBMIT: 'submitting',
      },
    },
    submitting: {
      on: {
        SUBMIT_SUCCESS: 'submitSuccess',
        SUBMIT_FAILED: 'submitFailed',
      },
    },
    submitSuccess: {
      on: {
        NEW_ORDER: 'edit',
      },
    },
    submitFailed: {
      on: {
        RETRY: 'submitSuccess',
      },
    },
  },
});

pageNewOrderFsm.signal.subscribe(async (state) => {
  switch (state.by) {
    case 'IMPORT': {
      // just in unresolved
      topAppBarContextProvider.setValue({
        headlineKey: 'loading',
      });
      if (productStorageContextConsumer.getValue() == null) {
        fetchProductStorage();
      }
      if (
        priceStorageContextConsumer.getValue() == null ||
        finalPriceStorageContextConsumer.getValue() == null
      ) {
        fetchPriceStorage();
      }
      break;
    }

    case 'PARTIAL_LOAD': {
      if (Object.values(pageNewOrderFsm.context).indexOf(null) === -1) {
        pageNewOrderFsm.transition('CONTEXT_LOADED');
      }
      break;
    }

    case 'CONNECTED': {
      topAppBarContextProvider.setValue({
        headlineKey: 'page_new_order_headline',
      });
      break;
    }

    case 'NEW_ORDER': {
      pageNewOrderFsm.context.order = getLocalStorageItem('draft-order-x1', {id: 'new', status: 'draft'});
    }
  }
});

pageNewOrderFsm.signal.subscribe(async (state) => {
  localStorage.setItem('draft-order-x1', JSON.stringify(pageNewOrderFsm.context.order));

  switch (state.to) {
    case 'edit': {
      if (!pageNewOrderFsm.context.order?.itemList?.length && state.from != 'productList') {
        pageNewOrderFsm.transition('SELECT_PRODUCT');
      }
      break;
    }
  }
});

productStorageContextConsumer.subscribe((productStorage) => {
  pageNewOrderFsm.transition('PARTIAL_LOAD', {productStorage});
});
priceStorageContextConsumer.subscribe((priceStorage) => {
  pageNewOrderFsm.transition('PARTIAL_LOAD', {priceStorage});
});
finalPriceStorageContextConsumer.subscribe((priceStorage) => {
  pageNewOrderFsm.transition('PARTIAL_LOAD', {priceStorage});
});

eventListener.subscribe<ClickSignalType>('page_order_list_reload_click_event', () => {
});
