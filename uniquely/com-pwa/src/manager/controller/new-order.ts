import {FsmTypeHelper, finiteStateMachineProvider} from '@alwatr/fsm';
import {message} from '@alwatr/i18n';
import {OrderDraft, OrderItem, orderInfoSchema, tileQtyStep} from '@alwatr/type/customer-order-management.js';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';
import {getLocalStorageItem} from '@alwatr/util';
import {validator} from '@alwatr/validator';

import {orderStorageContextConsumer} from '../context-provider/order-storage.js';
import {
  productPriceStorageContextConsumer,
  productFinalPriceStorageContextConsumer,
} from '../context-provider/price-storage.js';
import {productStorageContextConsumer} from '../context-provider/product-storage.js';
import {submitOrderCommandTrigger} from '../context.js';

import type {ClickSignalType} from '@alwatr/type';

const newOrderLocalStorageKey = 'draft-order-x3';

export const newOrderFsmConstructor = finiteStateMachineProvider.defineConstructor('new_order_fsm', {
  initial: 'pending',
  context: {
    orderId: '',
    newOrder: <OrderDraft>(
      getLocalStorageItem(newOrderLocalStorageKey, {id: 'new', status: 'draft', shippingInfo: {}, itemList: []})
    ),
    orderStorage: orderStorageContextConsumer.getResponse(),
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
        request_update: {},
        change_order_id: {
          target: 'routing',
        },
      },
    },
    pending: {
      entry: 'request_server_contexts',
      on: {
        change_order_id: {},
        context_request_initial: {},
        context_request_offlineLoading: {},
        context_request_onlineLoading: {},
        context_request_loadingFailed: {
          target: 'contextError',
        },
        context_request_reloading: {
          target: 'routing',
          condition: 'is_all_context_ready',
        },
        context_request_complete: {
          target: 'routing',
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
    routing: {
      entry: 'routing',
      on: {
        new_order: {
          target: 'newOrder',
        },
        show_detail: {
          target: 'orderDetail',
        },
        not_found: {
          target: 'notFound',
        },
      },
    },
    orderDetail: {
      on: {},
    },
    notFound: {
      on: {},
    },
    newOrder: {
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
      },
    },
    selectProduct: {
      on: {
        submit: {
          target: 'newOrder',
        },
      },
    },
    shippingForm: {
      on: {
        submit: {
          target: 'newOrder',
        },
      },
    },
    review: {
      on: {
        back: {
          target: 'newOrder',
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
          target: 'newOrder',
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
  orderStorageContextConsumer, // FIXME: require need param
] as const;

// entries actions
finiteStateMachineProvider.defineActions<NewOrderFsm>('new_order_fsm', {
  request_server_contexts: () => {
    serverContextList.forEach((contextConsumer) => contextConsumer.require());
  },

  routing: (fsmInstance) => {
    const {orderId, orderStorage} = fsmInstance.getContext();
    console.warn({orderId, orderStorage});
    if (orderId === 'new') {
      fsmInstance.transition('new_order');
    }
    else if (orderStorage?.data[orderId] != null) {
      fsmInstance.transition('show_detail');
    }
    else {
      fsmInstance.transition('not_found');
    }
  },

  save_local_storage: (fsmInstance) => {
    localStorage.setItem(newOrderLocalStorageKey, JSON.stringify(fsmInstance.getContext().newOrder));
  },

  check_item_list: (fsmInstance) => {
    if (!fsmInstance.getContext().newOrder.itemList?.length) {
      fsmInstance.transition('select_product');
    }
  },

  submit_order: async (fsmInstance) => {
    const order = await submitOrderCommandTrigger.requestWithResponse(fsmInstance.getContext().newOrder);
    if (order == null) {
      fsmInstance.transition('submit_failed');
      return;
    }
    // else
    fsmInstance.transition('submit_success', {orderId: order.id});
  },

  reset_new_order: (fsmInstance): void => {
    localStorage.removeItem(newOrderLocalStorageKey);
    fsmInstance.setContext({newOrder: {id: 'new', status: 'draft', shippingInfo: {}, itemList: []}});
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
  validate_order: (fsmInstance): boolean => {
    try {
      const order = fsmInstance.getContext().newOrder;
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

  is_all_context_ready: (): boolean => {
    return serverContextList.every((serverContext) => serverContext.getResponse() != null);
  },
});

finiteStateMachineProvider.defineSignals<NewOrderFsm>('new_order_fsm', [
  {
    callback: (_, fsmInstance): void => {
      // calculateOrderPrice
      const order = fsmInstance.getContext().newOrder;
      let totalPrice = 0;
      let finalTotalPrice = 0;
      for (const item of order.itemList ?? []) {
        totalPrice += item.price * item.qty * tileQtyStep;
        finalTotalPrice += item.finalPrice * item.qty * tileQtyStep;
      }
      order.totalPrice = Math.round(totalPrice);
      order.finalTotalPrice = Math.round(finalTotalPrice);
    },
  },
  {
    signalId: 'order_item_qty_add',
    callback: (event: ClickSignalType<OrderItem>, fsmInstance): void => {
      const orderItem = event.detail;
      orderItem.qty++;
      fsmInstance.transition('request_update');
    },
  },
  {
    signalId: 'order_item_qty_remove',
    callback: (event: ClickSignalType<OrderItem>, fsmInstance): void => {
      const orderItem = event.detail;
      orderItem.qty--;
      if (orderItem.qty < 1) orderItem.qty = 1;
      fsmInstance.transition('request_update');
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
      const productStorage = productStorageContextConsumer.getResponse();
      fsmInstance.transition(`context_request_${productStorageContextConsumer.getState().target}`, {
        productStorage,
      });
    },
    receivePrevious: 'NextCycle',
  },
  {
    signalId: productPriceStorageContextConsumer.id,
    callback: (_, fsmInstance): void => {
      const priceStorage = productPriceStorageContextConsumer.getResponse();
      fsmInstance.transition(`context_request_${productPriceStorageContextConsumer.getState().target}`, {
        priceStorage,
      });
    },
    receivePrevious: 'NextCycle',
  },
  {
    signalId: productFinalPriceStorageContextConsumer.id,
    callback: (_, fsmInstance): void => {
      const finalPriceStorage = productFinalPriceStorageContextConsumer.getResponse();
      fsmInstance.transition(`context_request_${productFinalPriceStorageContextConsumer.getState().target}`, {
        finalPriceStorage,
      });
    },
    receivePrevious: 'NextCycle',
  },
  {
    signalId: orderStorageContextConsumer.id,
    callback: (_, fsmInstance): void => {
      const orderStorage = orderStorageContextConsumer.getResponse();
      fsmInstance.transition(`context_request_${orderStorageContextConsumer.getState().target}`, {
        orderStorage,
      });
    },
    receivePrevious: 'NextCycle',
  },
]);
