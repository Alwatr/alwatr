import {FsmTypeHelper, finiteStateMachineProvider} from '@alwatr/fsm';
import {message} from '@alwatr/i18n';
import {requestableContextConsumer} from '@alwatr/signal';
import {OrderDraft, OrderItem, Product, ProductPrice, orderInfoSchema} from '@alwatr/type/customer-order-management.js';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';
import {getLocalStorageItem} from '@alwatr/util';
import {validator} from '@alwatr/validator';

import {config} from '../../config.js';
import {scrollToTopCommand} from '../context.js';

import type {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';


const productStorageContextConsumer = requestableContextConsumer.bind<
  AlwatrDocumentStorage<Product>,
  {productStorageName: string}
>('product-storage-context');

const productPriceStorageContextProvider = requestableContextConsumer.bind<
  AlwatrDocumentStorage<ProductPrice>,
  {productPriceStorageName: string}
>('product-price-context');

const finalProductPriceStorageContextProvider = requestableContextConsumer.bind<
  AlwatrDocumentStorage<ProductPrice>,
  {productPriceStorageName: string}
>('final-product-price-context');

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
      entry: [
        'initial_request_product_storage',
        'initial_request_product_price_storage',
        'initial_request_product_final_price_storage',
      ],
      on: {
        context_request_initial: {},
        context_request_pending: {},
        context_request_error: {
          target: 'contextError',
        },
        context_request_complete: {
          target: 'edit',
          condition: 'check_all_context_load_complete',
        },
        context_request_reloading: {
          target: 'reloading',
        },
      },
    },
    contextError: {
      on: {
        request_context: {
          target: 'pending',
          actions: [
            'reload_request_product_storage',
            'reload_request_product_price_storage',
            'reload_request_product_final_price_storage',
          ],
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
    reloading: {
      on: {
        context_request_error: {
          target: 'edit',
          actions: 'show_fetch_failed_snackbar',
        },
        context_request_complete: {
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
  set_order_local_storage: (fsmInstance) => {
    localStorage.setItem(newOrderLocalStorageKey, JSON.stringify(fsmInstance.getContext().order));
  },

  initial_request_product_storage: () => {
    if (productStorageContextConsumer.getValue().state === 'initial') {
      for (const productStorageName of config.productStorageList) {
        productStorageContextConsumer.request({productStorageName: productStorageName});
      }
    }
  },
  initial_request_product_price_storage: () => {
    if (productPriceStorageContextProvider.getValue().state === 'initial') {
      productPriceStorageContextProvider.request({productPriceStorageName: config.finalPriceListName});
    }
  },
  initial_request_product_final_price_storage: () => {
    if (finalProductPriceStorageContextProvider.getValue().state === 'initial') {
      finalProductPriceStorageContextProvider.request({productPriceStorageName: config.finalPriceListName});
    }
  },

  reload_request_product_storage: () => {
    if (productStorageContextConsumer.getValue().state === 'reloading') return;
    // else
    for (const productStorageName of config.productStorageList) {
      productStorageContextConsumer.request({productStorageName: productStorageName});
    }
  },
  reload_request_product_price_storage: () => {
    if (productPriceStorageContextProvider.getValue().state === 'reloading') return;
    // else
    productPriceStorageContextProvider.request({productPriceStorageName: config.finalPriceListName});
  },
  reload_request_product_final_price_storage: () => {
    if (finalProductPriceStorageContextProvider.getValue().state === 'reloading') return;
    // else
    finalProductPriceStorageContextProvider.request({productPriceStorageName: config.finalPriceListName});
  },

  check_item_list: (fsmInstance) => {
    if (fsmInstance.getState().from != 'selectProduct' && !fsmInstance.getContext().order?.itemList?.length) {
      fsmInstance.transition('select_product');
    }
  },

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
      // this._logger.incident('validateOrder', _err.name, 'validation failed', _err);
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

  scroll_to_top: (fsmInstance): void => {
    if (fsmInstance.getState().target != fsmInstance.getState().from) {
      scrollToTopCommand.request({});
    }
  },

  show_fetch_failed_snackbar: (): void => snackbarSignalTrigger.request({messageKey: 'fetch_failed_description'}),

  set_empty_shipping_info: (fsmInstance) => {
    if (fsmInstance.getState().from != 'selectProduct' && !fsmInstance.getContext().order?.itemList?.length) {
      fsmInstance.transition('select_product');
    }
  },

  submit_order: () => {
    // const order = await submitOrderCommandTrigger.requestWithResponse(fsmInstance.getContext().order);
    // if (order == null) {
    //   fsmInstance.transition('submit_failed');
    //   return;
    // }
    // // else
    // fsmInstance.transition('submit_success', {registeredOrderId: order.id});
  },

  reset_new_order: (fsmInstance): void => {
    localStorage.removeItem(newOrderLocalStorageKey);
    fsmInstance.getContext().order = getLocalStorageItem(newOrderLocalStorageKey, {
      id: 'new',
      status: 'draft',
    });
  },
});

// condition
finiteStateMachineProvider.defineActions('new_order_fsm', {
  check_all_context_load_complete: (): boolean => {
    return (
      finalProductPriceStorageContextProvider.getValue().state === 'complete' &&
      productPriceStorageContextProvider.getValue().state === 'complete' &&
      productPriceStorageContextProvider.getValue().state === 'complete'
    );
  },
});

finiteStateMachineProvider.defineSignals('new_order_fsm', [{
  signalId: 'order_item_qty_add',
  callback: (event: ClickSignalType<OrderItem>): void => {
    qtyUpdate(event.detail, 1); // TODO: set type with action
  },
},
{
  signalId: 'order_item_qty_remove',
  callback: (event: ClickSignalType<OrderItem>): void => {
    qtyUpdate(event.detail, -1);
  },
}]);

function qtyUpdate(orderItem: OrderItem, add: number): void {
  const qty = orderItem.qty + add;
  if (qty <= 0) return;
  orderItem.qty = qty;
  // this.fsm.transition('qty_update');
}
