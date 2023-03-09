import {customElement, FiniteStateMachineController, html, state, UnresolvedMixin} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {redirect} from '@alwatr/router';
import {eventListener} from '@alwatr/signal';
import {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';
import {
  Order,
  OrderDraft,
  orderInfoSchema,
  OrderItem,
  Product,
  ProductPrice,
  tileQtyStep,
} from '@alwatr/type/customer-order-management.js';
import {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';
import {getLocalStorageItem} from '@alwatr/util';
import {validator} from '@alwatr/validator';

import {fetchPriceStorage} from '../../manager/context-provider/price-storage.js';
import {fetchProductStorage} from '../../manager/context-provider/product-storage.js';
import {
  finalPriceStorageContextConsumer,
  priceStorageContextConsumer,
  productStorageContextConsumer,
  scrollToTopCommand,
  submitOrderCommandTrigger,
  topAppBarContextProvider,
} from '../../manager/context.js';
import {AlwatrOrderDetailBase} from '../stuff/order-detail-base.js';
import '../stuff/select-product.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-new-order': AlwatrPageNewOrder;
  }
}

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
    id: 'fsm-new-order-' + this.ali,
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
        entry: () => {
          this.gotState = this._stateMachine.state.target;
          localStorage.setItem(newOrderLocalStorageKey, JSON.stringify(this._stateMachine.context.order));

          if (
            this._stateMachine.state.target != 'shippingForm' &&
            this._stateMachine.state.target != this._stateMachine.state.from
          ) {
            scrollToTopCommand.request({});
          }

          if (
            this._stateMachine.state.target === 'edit' &&
            this._stateMachine.state.from != 'selectProduct' &&
            !this._stateMachine.context.order?.itemList?.length
          ) {
            this._stateMachine.transition('SELECT_PRODUCT');
          }
          else if (this._stateMachine.state.target === 'edit' || this._stateMachine.state.target === 'review') {
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
        },
        on: {},
      },
      pending: {
        entry: () => {
          if (productStorageContextConsumer.getValue() == null) {
            fetchProductStorage();
          }
          if (priceStorageContextConsumer.getValue() == null || finalPriceStorageContextConsumer.getValue() == null) {
            fetchPriceStorage();
          }
        },
        on: {
          LOADED_SUCCESS: {
            target: 'edit',
            condition: () => {
              if (
                this._stateMachine.context.finalPriceStorage == null ||
                this._stateMachine.context.priceStorage == null ||
                this._stateMachine.context.productStorage == null
              ) {
                return false;
              }
              return true;
            },
          },
        },
      },
      edit: {
        on: {
          SELECT_PRODUCT: {
            target: 'selectProduct',
          },
          EDIT_SHIPPING: {
            target: 'shippingForm',
            actions: () => {
              this._stateMachine.context.order.shippingInfo ??= {};
            },
          },
          SUBMIT: {
            target: 'review',
            condition: () => {
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
          QTY_UPDATE: {},
        },
      },
      selectProduct: {
        on: {
          SUBMIT: {
            target: 'edit',
          },
        },
      },
      shippingForm: {
        on: {
          SUBMIT: {
            target: 'edit',
          },
        },
      },
      review: {
        on: {
          BACK: {},
          FINAL_SUBMIT: {
            target: 'submitting',
            actions: async () => {
              const order = await submitOrderCommandTrigger.requestWithResponse(this._stateMachine.context.order);
              if (order == null) {
                this._stateMachine.transition('SUBMIT_FAILED');
                return;
              }
              // else
              this._stateMachine.transition('SUBMIT_SUCCESS', {registeredOrderId: order.id});
            },
          },
        },
      },
      submitting: {
        on: {
          SUBMIT_SUCCESS: {
            target: 'submitSuccess',
            actions: () => {
              localStorage.removeItem(newOrderLocalStorageKey);
              // TODO: this._stateMachine.context.order = getLocalStorageItem(newOrderLocalStorageKey, {id: 'new', status: 'draft'});
            },
          },
          SUBMIT_FAILED: {
            target: 'submitFailed',
          },
        },
      },
      submitSuccess: {
        on: {
          NEW_ORDER: {
            target: 'edit',
            actions: () => {
              // TODO: registeredOrderId = ''
            },
          },
        },
      },
      submitFailed: {
        on: {
          FINAL_SUBMIT: {
            target: 'submitting',
          },
        },
      },
    },
  } as const);

  @state()
    gotState = this._stateMachine.state.target;

  override connectedCallback(): void {
    super.connectedCallback();

    topAppBarContextProvider.setValue({
      headlineKey: 'page_new_order_headline',
      startIcon: buttons.backToHome,
    });

    this._signalListenerList.push(
        productStorageContextConsumer.subscribe((productStorage) => {
          this._stateMachine.transition('LOADED_SUCCESS', {productStorage});
        }),
    );

    this._signalListenerList.push(
        priceStorageContextConsumer.subscribe((priceStorage) => {
          this._stateMachine.transition('LOADED_SUCCESS', {priceStorage});
        }),
    );

    this._signalListenerList.push(
        finalPriceStorageContextConsumer.subscribe((finalPriceStorage) => {
          this._stateMachine.transition('LOADED_SUCCESS', {finalPriceStorage});
        }),
    );
    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.submit.clickSignalId, () => {
          this._stateMachine.transition('SUBMIT');
        }),
    );
    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.edit.clickSignalId, () => {
          this._stateMachine.transition('BACK');
        }),
    );
    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.submitFinal.clickSignalId, () => {
          this._stateMachine.transition('FINAL_SUBMIT');
        }),
    );
    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.editItems.clickSignalId, () => {
          this._stateMachine.transition('SELECT_PRODUCT');
        }),
    );
    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.editShippingForm.clickSignalId, () => {
          this._stateMachine.transition('EDIT_SHIPPING');
        }),
    );
    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.submitShippingForm.clickSignalId, () => {
          this._stateMachine.transition('SUBMIT');
        }),
    );
    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.tracking.clickSignalId, () => {
          const orderId = this._stateMachine.context.registeredOrderId as string;
          this._stateMachine.transition('NEW_ORDER');
          redirect({sectionList: ['order-tracking', orderId]});
        }),
    );
    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.detail.clickSignalId, () => {
          const orderId = this._stateMachine.context.registeredOrderId as string;
          this._stateMachine.transition('NEW_ORDER');
          redirect({sectionList: ['order-detail', orderId]});
        }),
    );
    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.newOrder.clickSignalId, () => {
          this._stateMachine.transition('NEW_ORDER');
          redirect('/new-order/');
        }),
    );

    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType>(buttons.retry.clickSignalId, async () => {
          this._stateMachine.transition('FINAL_SUBMIT');
        }),
    );

    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType<OrderItem>>('order_item_qty_add', (event) => {
          this.qtyUpdate(event.detail, 1);
        }),
    );

    this._signalListenerList.push(
        eventListener.subscribe<ClickSignalType<OrderItem>>('order_item_qty_remove', (event) => {
          this.qtyUpdate(event.detail, -1);
        }),
    );
  }

  protected override render(): unknown {
    this._logger.logMethod('render');
    return this._stateMachine.render({
      edit: () => {
        const order = this._stateMachine.context.order;
        return [
          // this.render_part_status(order),
          this.render_part_item_list(order.itemList ?? [], this._stateMachine.context.productStorage, true),
          this.render_part_btn_product(),
          this.render_part_shipping_info(order.shippingInfo),
          this.render_part_btn_shipping_edit(),
          this.render_part_summary(order),
          this.render_part_btn_submit(),
        ];
      },

      selectProduct: () => {
        return [html`<alwatr-select-product></alwatr-select-product>`];
      },

      shippingForm: () => {
        const order = this._stateMachine.context.order;
        return [
          this.render_part_item_list(order.itemList ?? [], this._stateMachine.context.productStorage, false),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.render_part_shipping_form(order.shippingInfo!),
          this.render_part_btn_shipping_submit(),
        ];
      },

      review: () => {
        const order = this._stateMachine.context.order as Order;
        return [
          this.render_part_status(order),
          this.render_part_item_list(order.itemList, this._stateMachine.context.productStorage),
          this.render_part_shipping_info(order.shippingInfo),
          this.render_part_summary(order),
          this.render_part_btn_final_submit(),
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
        return [html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`, this.render_part_btn_submit_success()];
      },

      submitFailed: () => {
        const content: IconBoxContent = {
          headline: message('page_new_order_submit_failed_message'),
          icon: 'cloud-offline-outline',
          tinted: 1,
        };
        return [html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`, this.render_part_btn_submit_failed()];
      },
    });
  }

  protected render_part_btn_select_product(): unknown {
    return html`
      <div class="btn-container">
        <alwatr-button
          elevated
          .icon=${buttons.submit.icon}
          .clickSignalId=${buttons.submit.clickSignalId}
          ?disabled=${!this._stateMachine.context.order.itemList?.length}
          >${message('select_product_submit_button')}</alwatr-button
        >
      </div>
    `;
  }

  protected render_part_btn_product(): unknown {
    return html`
      <div class="btn-container">
        <alwatr-button .icon=${buttons.editItems.icon} .clickSignalId=${buttons.editItems.clickSignalId}>
          ${message('page_new_order_edit_items')}
        </alwatr-button>
      </div>
    `;
  }

  protected render_part_btn_shipping_edit(): unknown {
    return html`<div class="btn-container">
      <alwatr-button .icon=${buttons.editShippingForm.icon} .clickSignalId=${buttons.editShippingForm.clickSignalId}
        >${message('page_new_order_shipping_edit')}</alwatr-button
      >
    </div>`;
  }

  protected render_part_btn_shipping_submit(): unknown {
    return html`<div class="btn-container">
      <alwatr-button .icon=${buttons.submitShippingForm.icon} .clickSignalId=${buttons.submitShippingForm.clickSignalId}
        >${message('page_new_order_shipping_submit')}</alwatr-button
      >
    </div>`;
  }

  protected render_part_btn_submit(): unknown {
    return html`
      <div class="submit-container">
        <alwatr-button
          .icon=${buttons.submit.icon}
          .clickSignalId=${buttons.submit.clickSignalId}
          ?disabled=${!this._stateMachine.context.order.itemList?.length}
          >${message('page_new_order_submit')}</alwatr-button
        >
      </div>
    `;
  }

  protected render_part_btn_submit_success(): unknown {
    return html`
      <div class="submit-container">
        <alwatr-button .icon=${buttons.detail.icon} .clickSignalId=${buttons.detail.clickSignalId}
          >${message('page_new_order_detail_button')}</alwatr-button
        >
        <alwatr-button .icon=${buttons.newOrder.icon} .clickSignalId=${buttons.newOrder.clickSignalId}
          >${message('page_new_order_headline')}</alwatr-button
        >
      </div>
    `;
  }

  protected render_part_btn_submit_failed(): unknown {
    return html`
      <div class="submit-container">
        <alwatr-button .icon=${buttons.retry.icon} .clickSignalId=${buttons.retry.clickSignalId}
          >${message('page_new_order_retry_button')}</alwatr-button
        >
      </div>
    `;
  }

  protected render_part_btn_final_submit(): unknown {
    return html`
      <div class="submit-container">
        <alwatr-button .icon=${buttons.edit.icon} .clickSignalId=${buttons.edit.clickSignalId}
          >${message('page_new_order_edit')}</alwatr-button
        >
        <alwatr-button .icon=${buttons.submitFinal.icon} .clickSignalId=${buttons.submitFinal.clickSignalId}
          >${message('page_new_order_submit_final')}</alwatr-button
        >
      </div>
    `;
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
    this._stateMachine.transition('QTY_UPDATE');
  }
}
