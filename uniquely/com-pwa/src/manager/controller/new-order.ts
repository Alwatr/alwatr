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

export const pageNewOrderStateMachine = new FiniteStateMachine({
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
        SUBMIT: 'shippingForm',
      },
    },
    productList: {
      on: {
        SUBMIT: 'edit',
      },
    },
    shippingForm: {
      on: {
        SUBMIT: 'review',
      },
    },
    review: {
      on: {
        BACK: 'edit',
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

export const buttons = {
  back: {
    icon: 'arrow-back-outline',
    flipRtl: true,
    clickSignalId: pageNewOrderStateMachine.config.id + '_back_click_event',
  },
  backToHome: {
    icon: 'arrow-back-outline',
    flipRtl: true,
    clickSignalId: 'back_to_home_click_event',
  },
  submit: {
    icon: 'checkmark',
    clickSignalId: pageNewOrderStateMachine.config.id + '_submit_click_event',
  },
} as const;

pageNewOrderStateMachine.signal.subscribe(async (state) => {
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
      if (Object.values(pageNewOrderStateMachine.context).indexOf(null) === -1) {
        pageNewOrderStateMachine.transition('CONTEXT_LOADED');
      }
      break;
    }

    case 'CONNECTED': {
      topAppBarContextProvider.setValue({
        headlineKey: 'page_new_order_headline',
        startIcon: buttons.backToHome,
      });
      break;
    }

    case 'NEW_ORDER': {
      pageNewOrderStateMachine.context.order = getLocalStorageItem('draft-order-x1', {id: 'new', status: 'draft'});
    }
  }
});

pageNewOrderStateMachine.signal.subscribe(async (state) => {
  localStorage.setItem('draft-order-x1', JSON.stringify(pageNewOrderStateMachine.context.order));

  if (
    state.to === 'edit' &&
    state.from != 'productList' &&
    !pageNewOrderStateMachine.context.order?.itemList?.length
  ) {
    pageNewOrderStateMachine.transition('SELECT_PRODUCT');
  }

  else if (state.to === 'edit' || state.to === 'review') {
    const order = pageNewOrderStateMachine.context.order;
    order.totalPrice = 0;
    order.finalPrice = order.shippingPrice ?? 0;
    for (const item of order.itemList ?? []) {
      order.totalPrice += item.price;
      order.finalPrice += item.finalPrice;
    }
  }
});

productStorageContextConsumer.subscribe((productStorage) => {
  pageNewOrderStateMachine.transition('PARTIAL_LOAD', {productStorage});
});
priceStorageContextConsumer.subscribe((priceStorage) => {
  pageNewOrderStateMachine.transition('PARTIAL_LOAD', {priceStorage});
});
finalPriceStorageContextConsumer.subscribe((finalPriceStorage) => {
  pageNewOrderStateMachine.transition('PARTIAL_LOAD', {finalPriceStorage});
});

eventListener.subscribe<ClickSignalType>(buttons.submit.clickSignalId, () => {
  pageNewOrderStateMachine.transition('SUBMIT');
});
