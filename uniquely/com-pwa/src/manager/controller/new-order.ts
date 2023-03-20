import {FsmTypeHelper, finiteStateMachineProvider} from '@alwatr/fsm';
import {message} from '@alwatr/i18n';
import {OrderDraft, OrderItem, Product, ProductPrice, orderInfoSchema} from '@alwatr/type/customer-order-management.js';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';
import {getLocalStorageItem} from '@alwatr/util';
import {validator} from '@alwatr/validator';

import {
  productFinalPriceStorageContextConsumer,
  productPriceStorageContextConsumer,
} from '../context-provider/price-storage.js';
import {productStorageContextConsumer} from '../context-provider/product-storage.js';
import {scrollToTopCommand, submitOrderCommandTrigger} from '../context.js';

import type {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';

const newOrderLocalStorageKey = 'draft-order-x2';

export const newOrderFsmConstructor = finiteStateMachineProvider.defineConstructor('new_order_fsm', {
  initial: 'pending',
  context: {
    registeredOrderId: <string | null>null,
    order: <OrderDraft>getLocalStorageItem(newOrderLocalStorageKey, {id: 'new', status: 'draft'}),
    productStorage: <AlwatrDocumentStorage<Product> | null>null,
    priceStorage: <AlwatrDocumentStorage<ProductPrice> | null>null,
    finalPriceStorage: <AlwatrDocumentStorage<ProductPrice> | null>null,
  },
  stateRecord: {
    $all: {
      entry: 'set_order_local_storage',
      on: {},
    },
    pending: {
      entry: 'request_all_context',
      on: {
        context_request_complete: {
          actions: 'set_context',
          target: 'edit',
        },
      },
    },
    edit: {
      entry: 'check_item_list',
      on: {
        select_product: {
          target: 'selectProduct',
        },
        edit_shipping: {
          target: 'shippingForm',
        },
        submit: {
          target: 'review',
          condition: 'validate_order',
        },
        qty_update: {},
      },
    },
    selectProduct: {
      entry: 'scroll_to_top',
      on: {
        submit: {
          target: 'edit',
        },
      },
    },
    shippingForm: {
      entry: 'set_empty_shipping_info',
      on: {
        submit: {
          target: 'edit',
        },
      },
    },
    review: {
      on: {
        back: {},
        final_submit: {
          target: 'submitting',
          actions: 'submit_order',
        },
      },
    },
    submitting: {
      on: {
        submit_success: {
          target: 'submitSuccess',
          actions: 'reset_new_order',
        },
        submit_failed: {
          target: 'submitFailed',
        },
      },
    },
    submitSuccess: {
      on: {
        new_order: {
          target: 'edit',
        },
      },
    },
    submitFailed: {
      on: {
        final_submit: {
          target: 'submitting',
        },
      },
    },
  },
});

export type NewOrderFsm = FsmTypeHelper<typeof newOrderFsmConstructor>;

// entries actions
finiteStateMachineProvider.defineActions<NewOrderFsm>('new_order_fsm', {
  // tmp
  request_all_context: (fsmInstance) => {
    productStorageContextConsumer.request();
    productPriceStorageContextConsumer.request();
    productFinalPriceStorageContextConsumer.request();

    productStorageContextConsumer.subscribe(() => {
      if (
        productPriceStorageContextConsumer.getState().target === 'complete' &&
        productFinalPriceStorageContextConsumer.getState().target === 'complete'
      ) {
        fsmInstance.transition('context_request_complete');
      }
    });
    productPriceStorageContextConsumer.subscribe(() => {
      if (
        productStorageContextConsumer.getState().target === 'complete' &&
        productFinalPriceStorageContextConsumer.getState().target === 'complete'
      ) {
        fsmInstance.transition('context_request_complete');
      }
    });
    productFinalPriceStorageContextConsumer.subscribe(() => {
      if (
        productStorageContextConsumer.getState().target === 'complete' &&
        productPriceStorageContextConsumer.getState().target === 'complete'
      ) {
        fsmInstance.transition('context_request_complete');
      }
    });
  },

  set_context: (fsmInstance) => {
    fsmInstance.setContext({
      finalPriceStorage: productFinalPriceStorageContextConsumer.getResponse() as AlwatrDocumentStorage<ProductPrice>,
    });
    fsmInstance.setContext({
      priceStorage: productPriceStorageContextConsumer.getResponse() as AlwatrDocumentStorage<ProductPrice>,
    });
    fsmInstance.setContext({
      productStorage: productStorageContextConsumer.getResponse() as AlwatrDocumentStorage<Product>,
    });
  },

  set_order_local_storage: (fsmInstance) => {
    localStorage.setItem(newOrderLocalStorageKey, JSON.stringify(fsmInstance.getContext().order));
  },

  check_item_list: (fsmInstance) => {
    if (fsmInstance.getState().from != 'selectProduct' && !fsmInstance.getContext().order?.itemList?.length) {
      fsmInstance.transition('select_product');
    }
  },

  scroll_to_top: (fsmInstance): void => {
    if (fsmInstance.getState().target != fsmInstance.getState().from) {
      scrollToTopCommand.request({});
    }
  },

  set_empty_shipping_info: (fsmInstance) => {
    fsmInstance.getContext().order.shippingInfo ??= {};
  },

  submit_order: async (fsmInstance) => {
    const order = await submitOrderCommandTrigger.requestWithResponse(fsmInstance.getContext().order);
    if (order == null) {
      fsmInstance.transition('submit_failed');
      return;
    }
    // else
    fsmInstance.transition('submit_success', {registeredOrderId: order.id});
  },

  reset_new_order: (fsmInstance): void => {
    localStorage.removeItem(newOrderLocalStorageKey);
    fsmInstance.getContext().order = getLocalStorageItem(newOrderLocalStorageKey, {id: 'new', status: 'draft'});
  },
});

// condition
finiteStateMachineProvider.defineActions<NewOrderFsm>('new_order_fsm', {
  validate_order: (fsmInstance) => {
    if (
      !fsmInstance.getContext().order.itemList?.length &&
        fsmInstance.getContext().order.shippingInfo == null
    ) {
      return false;
    }
    // else
    try {
      validator(orderInfoSchema, fsmInstance.getContext().order, true);
      return true;
    }
    catch (err) {
      const _err = err as Error & {cause?: Record<string, string | undefined>};
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
      return false;
    }
  },
});

finiteStateMachineProvider.defineSignals('new_order_fsm', [
  {
    signalId: 'order_item_qty_add',
    callback: (event: ClickSignalType<OrderItem>, fsmInstance): void => {
      const qty = event.detail.qty + 1;
      if (qty <= 0) return;
      event.detail.qty = qty;
      fsmInstance.transition('qty_update');
    },
  },
  {
    signalId: 'order_item_qty_remove',
    callback: (event: ClickSignalType<OrderItem>, fsmInstance): void => {
      const qty = event.detail.qty - 1;
      if (qty <= 0) return;
      event.detail.qty = qty;
      fsmInstance.transition('qty_update');
    },
  },
  {
    signalId: 'order_item_qty_update',
    callback: (detail: {item: OrderItem; qty: number}, fsmInstance): void => {
      if (detail.qty <= 0) return;
      detail.item.qty = detail.qty;
      fsmInstance.transition('qty_update');
    },
  },
]);
