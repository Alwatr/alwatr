import {FsmTypeHelper, finiteStateMachineProvider} from '@alwatr/fsm';
import {message} from '@alwatr/i18n';
import {orderInfoSchema, orderShippingInfoSchema} from '@alwatr/type/customer-order-management.js';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';
import {getLocalStorageItem, setLocalStorageItem} from '@alwatr/util';
import {validator} from '@alwatr/validator';

import {config} from '../../config.js';
import {orderStorageContextConsumer} from '../context-provider/order-storage.js';
import {
  productPriceStorageContextConsumer,
  productFinalPriceStorageContextConsumer,
} from '../context-provider/price-storage.js';
import {productStorageContextConsumer} from '../context-provider/product-storage.js';
import {submitOrderCommandTrigger} from '../context.js';
import {logger} from '../logger.js';

import type {ClickSignalType} from '@alwatr/type';
import type {OrderDraft, OrderItem} from '@alwatr/type/customer-order-management.js';

const newOrderLocalStorageKey = 'draft_order_x5';

export const orderFsmConstructor = finiteStateMachineProvider.defineConstructor('order_fsm', {
  initial: 'pending',
  context: {
    orderId: '',
    newOrder: (
      getLocalStorageItem(newOrderLocalStorageKey, {id: 'new', status: 'draft', shippingInfo: {}, itemList: []})
    ) as OrderDraft,
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
          actions: 'require_server_contexts',
        },
        context_request_complete: {},
        request_update: {},
        change_order_id: {
          target: 'routing',
        },
      },
    },
    pending: {
      entry: 'require_server_contexts',
      on: {
        change_order_id: {
          // prevent to transition to routing.
        },
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
        not_found_in_loading: {
          target: 'pending',
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
          condition: 'validate_shipping_info',
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
        },
      },
    },
    submitting: {
      entry: 'submit_order',
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
        },
      },
    },
  },
});

export type OrderFsm = FsmTypeHelper<typeof orderFsmConstructor>;

const serverContextList = [
  productStorageContextConsumer,
  productPriceStorageContextConsumer,
  productFinalPriceStorageContextConsumer,
  orderStorageContextConsumer, // FIXME: require need param
] as const;

// entries actions
finiteStateMachineProvider.defineActions<OrderFsm>('order_fsm', {
  require_server_contexts: () => {
    serverContextList.forEach((contextConsumer) => contextConsumer.require());
  },

  routing: (fsmInstance) => {
    const orderId = fsmInstance.getContext().orderId;
    const orderStorage = orderStorageContextConsumer.getResponse();
    if (orderId === 'new') {
      fsmInstance.transition('new_order');
    }
    else if (orderStorage?.data[orderId] != null) {
      fsmInstance.transition('show_detail', {orderStorage});
    }
    else if (orderStorageContextConsumer.getState().target !== 'complete') {
      fsmInstance.transition('not_found_in_loading');
    }
    else {
      fsmInstance.transition('not_found');
    }
  },

  save_local_storage: (fsmInstance) => {
    setLocalStorageItem(newOrderLocalStorageKey, fsmInstance.getContext().newOrder);
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
    // TODO: update context directly
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
finiteStateMachineProvider.defineActions<OrderFsm>('order_fsm', {
  validate_order: (fsmInstance): boolean => {
    try {
      const order = fsmInstance.getContext().newOrder;
      if (!order.itemList?.length) throw new Error('invalid_type');
      // else
      fsmInstance.setContext({
        newOrder: validator<OrderDraft>(orderInfoSchema, order, true),
      });
      return true;
    }
    catch (err) {
      const _err = err as Error & {cause?: Record<string, string | undefined>};
      logger.accident('validate_order', 'order_invalid', 'order is invalid', _err.cause);
      if (_err.cause?.itemPath?.indexOf('shippingInfo') !== -1) {
        snackbarSignalTrigger.request({
          message: message('page_order_shipping_info_not_valid_message'),
        });
        fsmInstance.transition('edit_shipping');
      }
      else {
        snackbarSignalTrigger.request({
          message: message('page_order_order_not_valid_message'),
        });
      }
      return false;
    }
  },

  validate_shipping_info: (fsmInstance): boolean => {
    try {
      validator(orderShippingInfoSchema, fsmInstance.getContext().newOrder.shippingInfo, true);
      return true;
    }
    catch (err) {
      const _err = err as Error & {cause?: Record<string, string | undefined>};
      logger.accident('validate_shipping_info', 'order_invalid', 'order shipping onfo is invalid', _err.cause);
      snackbarSignalTrigger.request({
        message: message('page_order_shipping_info_not_valid_message'),
      });
      return false;
    }
  },

  is_all_context_ready: (): boolean => {
    return serverContextList.every((serverContext) => serverContext.getResponse() != null);
  },
});

finiteStateMachineProvider.defineSignals<OrderFsm>('order_fsm', [
  // {
  //   callback: (_, fsmInstance): void => {
  //     // calculateOrderPrice
  //     const order = fsmInstance.getContext().newOrder;
  //     let totalPrice = 0;
  //     let finalTotalPrice = 0;
  //     for (const item of order.itemList ?? []) {
  //       totalPrice += item.price * item.qty * tileQtyStep;
  //       finalTotalPrice += item.finalPrice * item.qty * tileQtyStep;
  //     }
  //     order.totalPrice = Math.round(totalPrice);
  //     order.finalTotalPrice = Math.round(finalTotalPrice);
  //   },
  // },
  {
    signalId: 'order_item_qty_add',
    callback: (event: ClickSignalType<OrderItem>, fsmInstance): void => {
      const orderItem = event.detail;
      if (orderItem.qty === 1) {
        orderItem.qty = config.order.pallet.boxSize;
      }
      else {
        orderItem.qty += config.order.pallet.boxSize;
      }
      fsmInstance.transition('request_update');
    },
  },
  {
    signalId: 'order_item_qty_remove',
    callback: (event: ClickSignalType<OrderItem>, fsmInstance): void => {
      const orderItem = event.detail;
      orderItem.qty -= config.order.pallet.boxSize;
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

export function updateOrderCalculate(order: OrderDraft): void {
  order.subTotalMarket = 0;
  order.subTotalAgency = 0;
  order.palletCost = 0;
  order.shippingFee = 0;
  order.ladingFee = 0;
  order.itemList ??= [];

  let itemListCount = 0;
  for (const item of order.itemList) {
    if (!item.qty) item.qty = config.order.pallet.boxSize;
    order.subTotalMarket += item.marketPrice * item.qty;
    order.subTotalAgency += item.agencyPrice * item.qty;
    itemListCount += item.qty;
  }
  order.subTotalMarket = Math.round(order.subTotalMarket * config.order.factor.box2m2);
  order.subTotalAgency = Math.round(order.subTotalAgency * config.order.factor.box2m2);

  if (
    itemListCount > 0 &&
    order.shippingInfo?.ladingType === 'pallet' &&
    order.shippingInfo?.carType === 'trailer_truck'
  ) {
    order.palletCost = Math.ceil(itemListCount / config.order.pallet.boxSize) * config.order.pallet.price;
  }

  if (itemListCount > 0 && order.shippingInfo?.carType) {
    const ladingConfig = config.order.lading[order.shippingInfo.carType];
    order.ladingFee = Math.ceil(itemListCount / ladingConfig.capacity) * ladingConfig.fee;
  }

  order.totalShippingFee = order.palletCost + order.ladingFee + order.shippingFee;
}
