import {customElement, FiniteStateMachineController, html, state, UnresolvedMixin} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {redirect} from '@alwatr/router';
import {requestableContextConsumer} from '@alwatr/signal';
import {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';
import {tileQtyStep, orderInfoSchema} from '@alwatr/type/customer-order-management.js';
import {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';
import {getLocalStorageItem} from '@alwatr/util';
import {validator} from '@alwatr/validator';

import {scrollToTopCommand, submitOrderCommandTrigger, topAppBarContextProvider} from '../../manager/context.js';
import {AlwatrOrderDetailBase} from '../stuff/order-detail-base.js';
import '../stuff/select-product.js';

import type {
  Order,
  OrderDraft,
  OrderShippingInfo,
  OrderItem,
  Product,
  ProductPrice,
} from '@alwatr/type/customer-order-management.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-new-order': AlwatrPageNewOrder;
  }
}

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

const buttons = {
  back: {
    icon: 'arrow-back-outline',
    flipRtl: true,
    clickSignalId: 'page_new_order_back_click_event',
  },
  backToHome: {
    icon: 'arrow-back-outline',
    flipRtl: true,
    clickSignalId: 'back_to_home_click_event',
  },
  editItems: {
    icon: 'create-outline',
    clickSignalId: 'page_new_order_edit_items_click_event',
  },
  submit: {
    icon: 'checkmark-outline',
    clickSignalId: 'page_new_order_submit_click_event',
  },
  edit: {
    icon: 'create-outline',
    clickSignalId: 'page_new_order_edit_click_event',
  },
  submitFinal: {
    icon: 'checkmark-outline',
    clickSignalId: 'page_new_order_submit_final_click_event',
  },
  submitShippingForm: {
    icon: 'checkmark-outline',
    clickSignalId: 'page_new_order_submit_shipping_form_click_event',
  },
  editShippingForm: {
    icon: 'checkmark-outline',
    clickSignalId: 'page_new_order_edit_shipping_form_click_event',
  },
  newOrder: {
    icon: 'add-outline',
    clickSignalId: 'page_new_order_new_order_click_event',
  },
  detail: {
    icon: 'information-outline',
    clickSignalId: 'page_new_order_detail_click_event',
  },
  tracking: {
    icon: 'chatbox-outline',
    clickSignalId: 'page_new_order_tracking_click_event',
  },
  reload: {
    icon: 'reload-outline',
    // flipRtl: true,
    clickSignalId: 'order_list_reload_click_event',
  },
  retry: {
    icon: 'reload-outline',
    clickSignalId: 'page_new_order_retry_click_event',
  },
} as const;

/**
 * Alwatr Customer Order Management Order Form Page
 */
@customElement('alwatr-page-new-order')
export class AlwatrPageNewOrder extends UnresolvedMixin(AlwatrOrderDetailBase) {
  private _stateMachine = new FiniteStateMachineController(this, {
    id: 'new_order_' + this.ali,
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
        entry: (): void => {
          this.gotState = this._stateMachine.state.target;
          localStorage.setItem(newOrderLocalStorageKey, JSON.stringify(this._stateMachine.context.order));
        },
        on: {},
      },
      pending: {
        entry: (): void => {
          const productStorage = productStorageContextConsumer.getValue();
          const priceStorage = productPriceStorageContextProvider.getValue();
          const finalPriceStorage = finalProductPriceStorageContextProvider.getValue();
          if (productStorage.state == 'initial') productStorageContextConsumer.request({productStorageName: 'tile'});
          if (priceStorage.state == 'initial') {
            productPriceStorageContextProvider.request({productPriceStorageName: 'tile'});
          }
          if (finalPriceStorage.state == 'initial') {
            finalProductPriceStorageContextProvider.request({productPriceStorageName: 'tile'});
          }
        },
        on: {
          context_request_initial: {},
          context_request_pending: {},
          context_request_error: {
            target: 'contextError',
          },
          context_request_complete: {
            target: 'edit',
            condition: (): boolean => {
              if (
                productStorageContextConsumer.getValue().state === 'complete' &&
                productPriceStorageContextProvider.getValue().state === 'complete' &&
                finalProductPriceStorageContextProvider.getValue().state === 'complete'
              ) {
                return true;
              }
              return false;
            },
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
            actions: (): void => {
              productStorageContextConsumer.request({productStorageName: 'tile'});
              productPriceStorageContextProvider.request({productPriceStorageName: 'tile'});
              finalProductPriceStorageContextProvider.request({productPriceStorageName: 'tile'});
            },
          },
        },
      },
      edit: {
        entry: (): void => {
          if (this._stateMachine.state.from != 'selectProduct' && !this._stateMachine.context.order?.itemList?.length) {
            this._stateMachine.transition('select_product');
          }
        },
        on: {
          select_product: {
            target: 'selectProduct',
          },
          edit_shipping: {
            target: 'shippingForm',
            actions: (): void => {
              this._stateMachine.context.order.shippingInfo ??= {};
            },
          },
          submit: {
            target: 'review',
            condition: (): boolean => {
              if (
                !this._stateMachine.context.order.itemList?.length &&
                this._stateMachine.context.order.shippingInfo == null
              ) {
                return false;
              }
              // else
              return this.validateOrder();
            },
          },
          qty_update: {},
        },
      },
      selectProduct: {
        entry: (): void => {
          if (this._stateMachine.state.target != this._stateMachine.state.from) {
            scrollToTopCommand.request({});
          }
        },
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
            actions: (): void => snackbarSignalTrigger.request({messageKey: 'fetch_failed_description'}),
          },
          context_request_complete: {
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
          back: {},
          final_submit: {
            target: 'submitting',
            actions: async (): Promise<void> => {
              const order = await submitOrderCommandTrigger.requestWithResponse(this._stateMachine.context.order);
              if (order == null) {
                this._stateMachine.transition('submit_failed');
                return;
              }
              // else
              this._stateMachine.transition('submit_success', {registeredOrderId: order.id});
            },
          },
        },
      },
      submitting: {
        on: {
          submit_success: {
            target: 'submitSuccess',
            actions: (): void => {
              localStorage.removeItem(newOrderLocalStorageKey);
              this._stateMachine.context.order =
                getLocalStorageItem(newOrderLocalStorageKey, {id: 'new', status: 'draft'});
            },
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
            actions: (): void => {
              this._stateMachine.context.registeredOrderId = null;
            },
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
    signalList: [
      {
        signalId: buttons.submit.clickSignalId,
        transition: 'submit',
      },
      {
        signalId: buttons.submitShippingForm.clickSignalId,
        transition: 'submit',
      },
      {
        signalId: buttons.edit.clickSignalId,
        transition: 'back',
      },
      {
        signalId: buttons.submitFinal.clickSignalId,
        transition: 'final_submit',
      },
      {
        signalId: buttons.editItems.clickSignalId,
        transition: 'final_submit',
      },
      {
        signalId: buttons.retry.clickSignalId,
        transition: 'final_submit',
      },
      {
        signalId: buttons.editShippingForm.clickSignalId,
        transition: 'edit_shipping',
      },
      {
        signalId: buttons.tracking.clickSignalId,
        actions: (): void => {
          const orderId = this._stateMachine.context.registeredOrderId as string;
          this._stateMachine.transition('new_order');
          redirect({sectionList: ['order-tracking', orderId]});
        },
      },
      {
        signalId: buttons.detail.clickSignalId,
        actions: (): void => {
          const orderId = this._stateMachine.context.registeredOrderId as string;
          this._stateMachine.transition('new_order');
          redirect({sectionList: ['order-detail', orderId]});
        },
      },
      {
        signalId: buttons.newOrder.clickSignalId,
        actions: (): void => {
          this._stateMachine.transition('new_order');
          redirect('/new-order/');
        },
      },
      {
        signalId: 'order_item_qty_add',
        actions: (event: ClickSignalType<OrderItem>): void => {
          this.qtyUpdate(event.detail, 1); // TODO: set type with action
        },
      },
      {
        signalId: 'order_item_qty_remove',
        actions: (event: ClickSignalType<OrderItem>): void => {
          this.qtyUpdate(event.detail, -1);
        },
      },
    ],
  });

  @state()
    gotState = this._stateMachine.state.target;

  override connectedCallback(): void {
    super.connectedCallback();

    this._signalListenerList.push(
        productStorageContextConsumer.subscribe(
            (context) => {
              this._stateMachine.transition(`context_request_${context.state}`, {productStorage: context.content});
            },
            {receivePrevious: 'NextCycle'},
        ),
    );

    this._signalListenerList.push(
        productPriceStorageContextProvider.subscribe(
            (context) => {
              this._stateMachine.transition(`context_request_${context.state}`, {priceStorage: context.content});
            },
            {receivePrevious: 'NextCycle'},
        ),
    );

    this._signalListenerList.push(
        finalProductPriceStorageContextProvider.subscribe(
            (context) => {
              this._stateMachine.transition(`context_request_${context.state}`, {finalPriceStorage: context.content});
            },
            {receivePrevious: 'NextCycle'},
        ),
    );

    this._signalListenerList.push(
        finalProductPriceStorageContextProvider.subscribe(
            (context) => {
              this._stateMachine.transition(`context_request_${context.state}`, {finalPriceStorage: context.content});
            },
            {receivePrevious: 'NextCycle'},
        ),
    );
  }

  protected override render(): unknown {
    this._logger.logMethod('render');
    return this._stateMachine.render({
      pending: () => {
        topAppBarContextProvider.setValue({
          headlineKey: 'loading',
          startIcon: buttons.backToHome,
        });
        const content: IconBoxContent = {
          tinted: 1,
          icon: 'cloud-download-outline',
          headline: message('loading'),
        };
        return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
      },

      edit: () => {
        topAppBarContextProvider.setValue({
          headlineKey: 'page_new_order_headline',
          startIcon: buttons.backToHome,
        });
        const order = this._stateMachine.context.order;
        return [
          this.render_part_item_list(order.itemList ?? [], this._stateMachine.context.productStorage, true),
          html`
            <div class="btn-container">
              <alwatr-button .icon=${buttons.editItems.icon} .clickSignalId=${buttons.editItems.clickSignalId}>
                ${message('page_new_order_edit_items')}
              </alwatr-button>
            </div>
          `,
          this.render_part_shipping_info(order.shippingInfo),
          html`
            <div class="btn-container">
              <alwatr-button
                .icon=${buttons.editShippingForm.icon}
                .clickSignalId=${buttons.editShippingForm.clickSignalId}
              >
                ${message('page_new_order_shipping_edit')}
              </alwatr-button>
            </div>
          `,
          this.render_part_summary(order),
          html`
            <div class="submit-container">
              <alwatr-button
                .icon=${buttons.submit.icon}
                .clickSignalId=${buttons.submit.clickSignalId}
                ?disabled=${!this._stateMachine.context.order.itemList?.length}
                >${message('page_new_order_submit')}
              </alwatr-button>
            </div>
          `,
        ];
      },

      contextError: () => {
        topAppBarContextProvider.setValue({
          headlineKey: 'page_order_list_headline',
          startIcon: buttons.backToHome,
          endIconList: [buttons.reload],
        });
        const content: IconBoxContent = {
          icon: 'cloud-offline-outline',
          tinted: 1,
          headline: message('fetch_failed_headline'),
          description: message('fetch_failed_description'),
        };
        return html`
          <alwatr-icon-box .content=${content}></alwatr-icon-box>
          <alwatr-button .icon=${buttons.reload.icon} .clickSignalId=${buttons.reload.clickSignalId}>
            ${message('retry')}
          </alwatr-button>
        `;
      },

      reloading: 'selectProduct',
      selectProduct: () => {
        topAppBarContextProvider.setValue({
          headlineKey: 'page_new_order_headline',
          startIcon: buttons.backToHome,
        });
        return [
          html`<alwatr-select-product></alwatr-select-product>`,
          html`
            <div class="btn-container">
              <alwatr-button
                elevated
                .icon=${buttons.submit.icon}
                .clickSignalId=${buttons.submit.clickSignalId}
                ?disabled=${!this._stateMachine.context.order.itemList?.length}
                >${message('select_product_submit_button')}
              </alwatr-button>
            </div>
          `,
        ];
      },

      shippingForm: () => {
        const order = this._stateMachine.context.order;
        return [
          this.render_part_item_list(order.itemList ?? [], this._stateMachine.context.productStorage, false),
          this.render_part_shipping_form(order.shippingInfo as Partial<OrderShippingInfo>),
          html`
            <div class="btn-container">
              <alwatr-button
                .icon=${buttons.submitShippingForm.icon}
                .clickSignalId=${buttons.submitShippingForm.clickSignalId}
              >
                ${message('page_new_order_shipping_submit')}
              </alwatr-button>
            </div>
          `,
        ];
      },

      review: () => {
        const order = this._stateMachine.context.order as Order;
        return [
          this.render_part_status(order),
          this.render_part_item_list(order.itemList, this._stateMachine.context.productStorage),
          this.render_part_shipping_info(order.shippingInfo),
          this.render_part_summary(order),
          html`
            <div class="submit-container">
              <alwatr-button .icon=${buttons.edit.icon} .clickSignalId=${buttons.edit.clickSignalId}>
                ${message('page_new_order_edit')}
              </alwatr-button>
              <alwatr-button .icon=${buttons.submitFinal.icon} .clickSignalId=${buttons.submitFinal.clickSignalId}>
                ${message('page_new_order_submit_final')}
              </alwatr-button>
            </div>
          `,
        ];
      },

      submitting: () => {
        const content: IconBoxContent = {
          headline: message('page_new_order_submitting_message'),
          icon: 'cloud-upload-outline',
          tinted: 1,
        };
        return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
      },

      submitSuccess: () => {
        const content: IconBoxContent = {
          headline: message('page_new_order_submit_success_message'),
          icon: 'cloud-done-outline',
          tinted: 1,
        };
        return [
          html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`,
          html`
            <div class="submit-container">
              <alwatr-button .icon=${buttons.detail.icon} .clickSignalId=${buttons.detail.clickSignalId}>
                ${message('page_new_order_detail_button')}
              </alwatr-button>
              <alwatr-button .icon=${buttons.newOrder.icon} .clickSignalId=${buttons.newOrder.clickSignalId}>
                ${message('page_new_order_headline')}
              </alwatr-button>
            </div>
          `,
        ];
      },

      submitFailed: () => {
        const content: IconBoxContent = {
          headline: message('page_new_order_submit_failed_message'),
          icon: 'cloud-offline-outline',
          tinted: 1,
        };
        return [
          html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`,
          html`
            <div class="submit-container">
              <alwatr-button .icon=${buttons.retry.icon} .clickSignalId=${buttons.retry.clickSignalId}>
                ${message('page_new_order_retry_button')}
              </alwatr-button>
            </div>
          `,
        ];
      },
    });
  }

  protected calculateOrderPrice(): void {
    const order = this._stateMachine.context.order;
    let totalPrice = 0;
    let finalTotalPrice = 0;
    for (const item of order.itemList ?? []) {
      totalPrice += item.price * item.qty * tileQtyStep;
      finalTotalPrice += item.finalPrice * item.qty * tileQtyStep;
    }
    order.totalPrice = Math.round(totalPrice);
    order.finalTotalPrice = Math.round(finalTotalPrice);
  }

  protected validateOrder(): boolean {
    try {
      validator(orderInfoSchema, this._stateMachine.context.order, true);
      return true;
    }
    catch (err) {
      const _err = err as Error & {cause?: Record<string, string | undefined>};
      this._logger.incident('validateOrder', _err.name, 'validation failed', _err);
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
  }

  protected qtyUpdate(orderItem: OrderItem, add: number): void {
    const qty = orderItem.qty + add;
    if (qty <= 0) return;
    orderItem.qty = qty;
    this._stateMachine.transition('qty_update');
  }
}
