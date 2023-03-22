import {FsmTypeHelper, finiteStateMachineProvider} from '@alwatr/fsm';
import {message} from '@alwatr/i18n';
import {OrderDraft, OrderItem, orderInfoSchema} from '@alwatr/type/customer-order-management.js';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';
import {getLocalStorageItem} from '@alwatr/util';
import {validator} from '@alwatr/validator';

import {
  productPriceStorageContextConsumer,
  productFinalPriceStorageContextConsumer,
} from '../context-provider/price-storage.js';
import {productStorageContextConsumer} from '../context-provider/product-storage.js';
import {submitOrderCommandTrigger} from '../context.js';

import type {ClickSignalType} from '@alwatr/type';

const newOrderLocalStorageKey = 'draft-order-x2';

export const newOrderFsmConstructor = finiteStateMachineProvider.defineConstructor('new_order_fsm', {
  initial: 'pending',
  context: {
    registeredOrderId: <string | null>null,
    order: <OrderDraft>(
      getLocalStorageItem(newOrderLocalStorageKey, {id: 'new', status: 'draft', shippingInfo: {}, itemList: []})
    ),
    productStorage: productStorageContextConsumer.getResponse(),
    priceStorage: productPriceStorageContextConsumer.getResponse(),
    finalPriceStorage: productFinalPriceStorageContextConsumer.getResponse(),
  },
  stateRecord: {
    $all: {
      entry: 'save_local_storage',
      on: {
        context_request_reloadingFailed: {
          actions: 'notify_context_reloadingFailed',
        },
        retry: {
          actions: 'request_server_contexts',
        },
        context_request_complete: {},
      },
    },
    pending: {
      entry: 'request_server_contexts',
      on: {
        context_request_initial: {},
        context_request_offlineLoading: {},
        context_request_onlineLoading: {},
        context_request_loadingFailed: {
          target: 'contextError',
        },
        context_request_reloading: {
          target: 'edit',
          condition: 'is_all_context_ready',
        },
        context_request_complete: {
          target: 'edit',
          condition: 'is_all_context_ready',
        },
      },
    },
    contextError: {
      on: {
        retry: {
          target: 'pending',
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
      on: {
        submit: {
          target: 'edit',
        },
      },
    },
    shippingForm: {
      on: {
        submit: {
          target: 'edit',
        },
      },
    },
    review: {
      on: {
        back: {
          target: 'edit',
        },
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
        },
        submit_failed: {
          target: 'submitFailed',
        },
      },
    },
    submitSuccess: {
      entry: 'reset_new_order',
      on: {
        new_order: {
          target: 'edit',
        },
      },
    },
    submitFailed: {
      on: {
        retry: {
          target: 'submitting',
          actions: 'submit_order',
        },
      },
    },
  },
});

export type NewOrderFsm = FsmTypeHelper<typeof newOrderFsmConstructor>;

const serverContextList = [
  productStorageContextConsumer,
  productPriceStorageContextConsumer,
  productFinalPriceStorageContextConsumer,
] as const;

// entries actions
finiteStateMachineProvider.defineActions<NewOrderFsm>('new_order_fsm', {
  request_server_contexts: () => {
    serverContextList.forEach((contextConsumer) => contextConsumer.require());
  },

  save_local_storage: (fsmInstance) => {
    localStorage.setItem(newOrderLocalStorageKey, JSON.stringify(fsmInstance.getContext().order));
  },

  check_item_list: (fsmInstance) => {
    if (!fsmInstance.getContext().order.itemList?.length) {
      fsmInstance.transition('select_product');
    }
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
    fsmInstance.setContext({order: {id: 'new', status: 'draft', shippingInfo: {}, itemList: []}});
  },

  notify_context_reloadingFailed: async (fsmInstance) => {
    const response = await snackbarSignalTrigger.requestWithResponse({
      message: 'خطا در به‌روزرسانی لیست قیمت‌ها!',
      actionLabelKey: 'retry',
      duration: 10_000,
    });
    if (response.actionButton) {
      fsmInstance.transition('retry');
    }
  },
});

// condition
finiteStateMachineProvider.defineActions<NewOrderFsm>('new_order_fsm', {
  validate_order: (fsmInstance) => {
    try {
      const order = fsmInstance.getContext().order;
      if (!order.itemList?.length) throw new Error('invalid_type');
      // else
      validator(orderInfoSchema, order, true);
      return true;
    }
    catch (err) {
      const _err = err as Error & {cause?: Record<string, string | undefined>};
      if (_err.cause?.itemPath?.indexOf('shippingInfo') !== -1) {
        snackbarSignalTrigger.request({
          message: message('page_new_order_shipping_info_not_valid_message'),
        });
        fsmInstance.transition('edit_shipping');
      }
      else {
        snackbarSignalTrigger.request({
          message: message('page_new_order_order_not_valid_message'),
        });
      }
      return false;
    }
  },

  is_all_context_ready: () => {
    return serverContextList.every((serverContext) => serverContext.getResponse() != null);
  },
});

finiteStateMachineProvider.defineSignals<NewOrderFsm>('new_order_fsm', [
  {
    signalId: 'order_item_qty_add',
    callback: (event: ClickSignalType<OrderItem>, fsmInstance): void => {
      const orderItem = event.detail;
      orderItem.qty++;
      fsmInstance.transition('qty_update');
    },
  },
  {
    signalId: 'order_item_qty_remove',
    callback: (event: ClickSignalType<OrderItem>, fsmInstance): void => {
      const orderItem = event.detail;
      orderItem.qty--;
      if (orderItem.qty < 1) orderItem.qty = 1;
      fsmInstance.transition('qty_update');
    },
  },
  {
    // fsm: productStorageContextConsumer.fsm,
    // transitionPrefix: 'context_request_',
    // mapContexts: {
    //   'productStorage': 'response',
    // },
    signalId: productStorageContextConsumer.id,
    callback: (_, fsmInstance): void => {
      fsmInstance.transition(`context_request_${productStorageContextConsumer.getState().target}`, {
        productStorage: productStorageContextConsumer.getResponse(),
      });
    },
  },
  {
    signalId: productPriceStorageContextConsumer.id,
    callback: (_, fsmInstance): void => {
      fsmInstance.transition(`context_request_${productPriceStorageContextConsumer.getState().target}`, {
        priceStorage: productPriceStorageContextConsumer.getResponse(),
      });
    },
  },
  {
    signalId: productFinalPriceStorageContextConsumer.id,
    callback: (_, fsmInstance): void => {
      fsmInstance.transition(`context_request_${productFinalPriceStorageContextConsumer.getState().target}`, {
        finalPriceStorage: productFinalPriceStorageContextConsumer.getResponse(),
      });
    },
  },
]);
