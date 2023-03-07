import {FiniteStateMachine} from '@alwatr/fsm';
import {message} from '@alwatr/i18n';
import {redirect} from '@alwatr/router';
import {eventListener} from '@alwatr/signal';
import {orderInfoSchema, tileQtyStep} from '@alwatr/type/customer-order-management.js';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';
import {getLocalStorageItem} from '@alwatr/util';
import {validator} from '@alwatr/validator';

import {fetchPriceStorage} from '../context-provider/price-storage.js';
import {fetchProductStorage} from '../context-provider/product-storage.js';
import {
  finalPriceStorageContextConsumer,
  priceStorageContextConsumer,
  productStorageContextConsumer,
  scrollToTopCommand,
  submitOrderCommandTrigger,
  topAppBarContextProvider,
} from '../context.js';
import {logger} from '../logger.js';

import type {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';
import type {Product, ProductPrice, OrderDraft, OrderItem} from '@alwatr/type/customer-order-management.js';

export const pageNewOrderStateMachine = new FiniteStateMachine({
  id: 'page-order-detail',
  initial: 'unresolved',
  context: {
    registeredOrderId: '',
    order: <OrderDraft>getLocalStorageItem('draft-order-x2', {id: 'new', status: 'draft'}),
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
        SUBMIT: 'review',
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
        SUBMIT: 'edit',
      },
    },
    review: {
      on: {
        BACK: 'edit',
        VALIDATION_FAILED: 'edit',
        FINAL_SUBMIT: 'submitting',
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
        FINAL_SUBMIT: 'submitting',
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
  submitFinal: {
    icon: 'checkmark',
    clickSignalId: pageNewOrderStateMachine.config.id + '_submit_final_click_event',
  },
  submitShippingForm: {
    icon: 'checkmark',
    clickSignalId: pageNewOrderStateMachine.config.id + '_submit_shipping_form_click_event',
  },
  editShippingForm: {
    icon: 'checkmark',
    clickSignalId: pageNewOrderStateMachine.config.id + '_edit_shipping_form_click_event',
  },
  newOrder: {
    icon: 'add',
    clickSignalId: pageNewOrderStateMachine.config.id + '_new_order_click_event',
  },
  detail: {
    icon: 'information',
    clickSignalId: pageNewOrderStateMachine.config.id + '_detail_click_event',
  },
  tracking: {
    icon: 'chatbox',
    clickSignalId: pageNewOrderStateMachine.config.id + '_tracking_click_event',
  },
  retry: {
    icon: 'reload',
    clickSignalId: pageNewOrderStateMachine.config.id + '_retry_click_event',
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
      pageNewOrderStateMachine.context.registeredOrderId = '';
      pageNewOrderStateMachine.context.order = getLocalStorageItem('draft-order-x2', {id: 'new', status: 'draft'});
      break;
    }

    case 'SUBMIT': {
      try {
        validator(orderInfoSchema, pageNewOrderStateMachine.context.order, true);
      }
      catch (err) {
        pageNewOrderStateMachine.transition('VALIDATION_FAILED');
        const _err = err as (Error & {cause?: Record<string, string | undefined>});
        logger.incident('SUBMIT', _err.name, 'validation failed', _err);
        if (_err.cause?.itemPath?.indexOf('shippingInfo') !== -1) {
          snackbarSignalTrigger.request({
            message: message('page_new_order_shipping_info_not_valid_message'),
          });
        }
        else {
          snackbarSignalTrigger.request({
            message: message('page_new_order_order_not_valid_message'),
          });
        }
      }

      break;
    }

    case 'FINAL_SUBMIT': {
      const order = await submitOrderCommandTrigger.requestWithResponse(pageNewOrderStateMachine.context.order);
      if (order == null) {
        pageNewOrderStateMachine.transition('SUBMIT_FAILED');
        return;
      }
      // else
      pageNewOrderStateMachine.context.registeredOrderId = order.id;
      pageNewOrderStateMachine.transition('SUBMIT_SUCCESS');
      break;
    }

    case 'SUBMIT_SUCCESS': {
      localStorage.removeItem('draft-order-x2');
      break;
    }
  }
});

pageNewOrderStateMachine.signal.subscribe(async (state) => {
  localStorage.setItem('draft-order-x2', JSON.stringify(pageNewOrderStateMachine.context.order));

  if (state.to != 'shippingForm' && state.to != state.from) {
    scrollToTopCommand.request({});
  }

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
    let finalTotalPrice = 0;
    for (const item of order.itemList ?? []) {
      totalPrice += item.price * item.qty * tileQtyStep;
      finalTotalPrice += item.finalPrice * item.qty * tileQtyStep;
    }
    order.totalPrice = Math.round(totalPrice);
    order.finalTotalPrice = Math.round(finalTotalPrice);
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

eventListener.subscribe<ClickSignalType>(buttons.submitFinal.clickSignalId, () => {
  pageNewOrderStateMachine.transition('FINAL_SUBMIT');
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

eventListener.subscribe<ClickSignalType>(buttons.tracking.clickSignalId, () => {
  const orderId = pageNewOrderStateMachine.context.registeredOrderId;
  pageNewOrderStateMachine.transition('NEW_ORDER');
  redirect({sectionList: ['order-tracking', orderId]});
});

eventListener.subscribe<ClickSignalType>(buttons.detail.clickSignalId, () => {
  const orderId = pageNewOrderStateMachine.context.registeredOrderId;
  pageNewOrderStateMachine.transition('NEW_ORDER');
  redirect({sectionList: ['order-detail', orderId]});
});

eventListener.subscribe<ClickSignalType>(buttons.newOrder.clickSignalId, () => {
  pageNewOrderStateMachine.transition('NEW_ORDER');
  redirect('/new-order/');
});

eventListener.subscribe<ClickSignalType>(buttons.retry.clickSignalId, async () => {
  pageNewOrderStateMachine.transition('FINAL_SUBMIT');
});


export const qtyUpdate = (orderItem: OrderItem, add: number): void => {
  const qty = orderItem.qty + add;
  if (qty <= 0) return;
  orderItem.qty = qty;
  pageNewOrderStateMachine.transition('QTY_UPDATE');
};
eventListener.subscribe<ClickSignalType<OrderItem>>('order_item_qty_add', (event) => {
  qtyUpdate(event.detail, 1);
});
eventListener.subscribe<ClickSignalType<OrderItem>>('order_item_qty_remove', (event) => {
  qtyUpdate(event.detail, -1);
});
