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
import type {Product, ProductPrice, OrderDraft, OrderItem} from '@alwatr/type/customer-order-management.js';

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
      },
    },
    unresolved: {
      on: {
        IMPORT: 'resolving',
        CONTEXT_LOADED: 'edit',
      },
    },
    resolving: {
      on: {
        CONNECTED: 'loading',
        CONTEXT_LOADED: 'edit',
      },
    },
    loading: {
      on: {
        CONTEXT_LOADED: 'edit',
      },
    },
    edit: {
      on: {
        SELECT_PRODUCT: 'selectProduct',
        EDIT_SHIPPING: 'shippingForm',
        SUBMIT: 'shippingForm',
        QTY_UPDATE: '$self',
      },
    },
    selectProduct: {
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
  editItems: {
    icon: 'create-outline',
    clickSignalId: pageNewOrderStateMachine.config.id + '_edit_items_click_event',
  },
  submit: {
    icon: 'checkmark',
    clickSignalId: pageNewOrderStateMachine.config.id + '_submit_click_event',
  },
  submitShippingForm: {
    icon: 'checkmark',
    clickSignalId: pageNewOrderStateMachine.config.id + '_submit_shipping_form_click_event',
  },
  editShippingForm: {
    icon: 'checkmark',
    clickSignalId: pageNewOrderStateMachine.config.id + '_edit_shipping_form_click_event',
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
    state.from != 'selectProduct' &&
    !pageNewOrderStateMachine.context.order?.itemList?.length
  ) {
    pageNewOrderStateMachine.transition('SELECT_PRODUCT');
  }

  else if (state.to === 'edit' || state.to === 'review') {
    const order = pageNewOrderStateMachine.context.order;
    let totalPrice = 0;
    let finalPrice = 0;
    for (const item of order.itemList ?? []) {
      totalPrice += item.price * item.qty;
      finalPrice += item.finalPrice * item.qty;
    }
    order.totalPrice = Math.round(totalPrice);
    order.finalPrice = Math.round(finalPrice);
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

eventListener.subscribe<ClickSignalType>(buttons.editItems.clickSignalId, () => {
  pageNewOrderStateMachine.transition('SELECT_PRODUCT');
});

eventListener.subscribe<ClickSignalType>(buttons.editShippingForm.clickSignalId, () => {
  pageNewOrderStateMachine.transition('EDIT_SHIPPING');
});

eventListener.subscribe<ClickSignalType>(buttons.submitShippingForm.clickSignalId, () => {
  pageNewOrderStateMachine.transition('SUBMIT');
});


const qtyStep = 3.6;
const qtyUpdate = (orderItem: OrderItem, add: number): void => {
  // debugger;
  const qty = (orderItem.qty + qtyStep * add);
  // if (qty % qtyStep !== 0) { // khak bar sarat js
  //   console.warn(qty % qtyStep);
  //   qty = (Math.floor(qty / qtyStep) + 1) * qtyStep;
  // }
  if (qty <= 0) return;
  orderItem.qty = Math.round(qty * 100) / 100;
  pageNewOrderStateMachine.transition('QTY_UPDATE');
};
eventListener.subscribe<ClickSignalType<OrderItem>>('order_item_qty_add', (event) => {
  qtyUpdate(event.detail, 1);
});
eventListener.subscribe<ClickSignalType<OrderItem>>('order_item_qty_remove', (event) => {
  qtyUpdate(event.detail, -1);
});
