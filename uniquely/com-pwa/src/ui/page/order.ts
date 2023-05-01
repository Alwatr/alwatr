import {
  AlwatrBaseElement,
  css,
  CSSResultGroup,
  customElement,
  html,
  LocalizeMixin,
  mapIterable,
  nothing,
  property,
  PropertyValues,
  SignalMixin,
  state,
  UnresolvedMixin,
} from '@alwatr/element';
import {finiteStateMachineConsumer} from '@alwatr/fsm';
import {message, number, replaceNumber} from '@alwatr/i18n';
import '@alwatr/icon';
import {calcDiscount} from '@alwatr/math';
import {redirect} from '@alwatr/router';
import {AlwatrDocumentStorage} from '@alwatr/type';
import {
  Order,
  OrderDraft,
  OrderItem,
  OrderShippingInfo,
  Product,
  tileQtyStep,
} from '@alwatr/type/customer-order-management.js';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/card/surface.js';

import {config} from '../../config.js';
import {buttons} from '../../manager/buttons.js';
import {scrollToTopCommand, topAppBarContextProvider} from '../../manager/context.js';
import '../stuff/order-shipping-form.js';
import '../stuff/order-status-box.js';
import '../stuff/select-product.js';

import type {OrderFsm} from '../../manager/controller/order.js';
import type {IconButtonContent} from '@alwatr/ui-kit/button/icon-button.js';
import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';
import type {AlwatrTextField} from '@alwatr/ui-kit/text-field/text-field.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order': AlwatrPageNewOrder;
  }
}

/**
 * Alwatr Customer Order Management Order Form Page
 */
@customElement('alwatr-page-order')
export class AlwatrPageNewOrder extends UnresolvedMixin(LocalizeMixin(SignalMixin(AlwatrBaseElement))) {
  static override styles: CSSResultGroup = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
      gap: var(--sys-spacing-track);
    }

    :host([state=reloading]) > * {
      opacity: var(--sys-surface-disabled-opacity);
    }

    alwatr-surface {
      --_surface-color-on: var(--sys-color-on-surface-variant-hsl);
    }

    .product-item {
      display: flex;
      flex-direction: row;
      gap: var(--sys-spacing-track);
    }

    .product-item > img {
      display: block;
      width: calc(6 * var(--sys-spacing-track));
      border-radius: var(--sys-radius-small);
      align-self: flex-start;
    }

    .detail-container {
      flex-grow: 1;
    }

    .detail-container > * {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--sys-spacing-track);
    }

    .detail-container > *:last-child {
      margin-bottom: 0;
    }

    .submit-container {
      text-align: end;
    }

    /* ----- */
    .number-field {
      --_surface-color-on: var(--sys-color-on-surface-variant-hsl);
      /* --_surface-color-bg: var(--sys-color-surface-variant-hsl); */
      display: flex;
      align-items: center;
      padding: 0;
      font-family: var(--sys-typescale-body-large-font-family-name);
      font-weight: var(--sys-typescale-body-large-font-weight);
      font-size: var(--sys-typescale-body-large-font-size);
      letter-spacing: var(--sys-typescale-body-large-letter-spacing);
      line-height: var(--sys-typescale-body-large-line-height);
      border-radius: var(--sys-radius-xsmall);
      text-align: center;
      box-shadow: none;
      border-bottom: 1px solid var(--sys-color-outline);
      border-radius: var(--sys-radius-xsmall) var(--sys-radius-xsmall) 0 0;
      width: calc(20 * var(--sys-spacing-track));
      margin-right: auto;
    }
    alwatr-text-field {
      display: block;
      padding: 0;
      width: 100%;
      flex-grow: 1;
      border-radius: inherit;
    }

    /* So not group these selectors! */
    input::placeholder {
      font: inherit;
      color: var(--sys-color-on-surface-variant);
    }
    input::-webkit-input-placeholder {
      font: inherit;
      color: var(--sys-color-on-surface-variant);
    }
    input::-moz-placeholder {
      font: inherit;
      color: var(--sys-color-on-surface-variant);
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `;

  protected fsm = finiteStateMachineConsumer<OrderFsm>('order_fsm_' + this.ali, 'order_fsm');

  @state()
    gotState = this.fsm.getState().target;

  set orderId(orderId: string) {
    this.fsm.transition('change_order_id', {orderId});
  }

  @property({type: String})
  get orderId(): string {
    return this.fsm.getContext().orderId;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this._addSignalListeners(
        this.fsm.defineSignals([
          {
            callback: (): void => {
              const state = this.fsm.getState();
              this.gotState = state.target;
              if (state.by === 'request_update') {
                this.requestUpdate();
              }
            },
            receivePrevious: 'NextCycle',
          },
          {
            signalId: buttons.submit.clickSignalId,
            transition: 'submit',
          },
          {
            signalId: buttons.submitShippingForm.clickSignalId,
            transition: 'submit',
          },
          {
            signalId: buttons.selectProductSubmit.clickSignalId,
            transition: 'submit',
          },
          {
            signalId: buttons.editOrder.clickSignalId,
            transition: 'back',
          },
          {
            signalId: buttons.submitFinal.clickSignalId,
            transition: 'final_submit',
          },
          {
            signalId: buttons.editItems.clickSignalId,
            transition: 'select_product',
          },
          {
            signalId: buttons.retry.clickSignalId,
            transition: 'retry',
          },
          {
            signalId: buttons.editShippingForm.clickSignalId,
            transition: 'edit_shipping',
          },
          // FIXME: handle `reload` state
          // {
          //   signalId: buttons.reload.clickSignalId,
          //   transition: ''
          // },
          {
            signalId: buttons.showRegisteredOrderDetail.clickSignalId,
            callback: (): void => {
              redirect({sectionList: ['order', this.fsm.getContext().orderId ?? '']});
            },
          },
          {
            signalId: buttons.backToOrderList.clickSignalId,
            callback: (): void => redirect({sectionList: ['order-list']}),
          },
          {
            signalId: buttons.newOrder.clickSignalId,
            callback: (): void => {
              this.fsm.transition('new_order');
            },
          },
        ]),
    );
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);
    if (changedProperties.has('gotState')) {
      scrollToTopCommand.request({smooth: true});
    }
  }

  protected override render(): unknown {
    this._logger.logMethod?.('render');
    return this.fsm.render(
        {
          routing: 'pending',
          pending: this._renderStatePending,
          notFound: this._renderStateNotFound,
          orderDetail: this._renderStateOrderDetail,
          newOrder: this._renderStateNewOrder,
          contextError: this._renderStateContextError,
          selectProduct: this._renderStateSelectProduct,
          shippingForm: this._renderStateShippingForm,
          review: this._renderStateReview,
          submitting: this._renderStateSubmitting,
          submitSuccess: this._renderStateSubmitSuccess,
          submitFailed: this._renderStateSubmitFailed,
        },
        this,
    );
  }

  protected _renderStateNotFound(): unknown {
    this._logger.logMethod?.('_render_notFound');

    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_list_headline',
      startIcon: buttons.backToOrderList,
    });
    const content: IconBoxContent = {
      headline: message('page_order_detail_not_found'),
      icon: 'close',
      tinted: 1,
    };
    return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
  }

  protected _renderStateOrderDetail(): unknown {
    this._logger.logMethod?.('_render_orderDetail');

    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_list_headline',
      startIcon: buttons.backToOrderList,
      endIconList: [buttons.print, buttons.reload],
    });

    const order = this.fsm.getContext().orderStorage!.data[this.fsm.getContext().orderId];
    return [
      this._render_status(order),
      this._render_itemList(order.itemList, this.fsm.getContext().productStorage),
      this._render_shippingInfo(order.shippingInfo),
      this._render_summary(order),
    ];
  }

  protected _renderStateNewOrder(): unknown {
    this._logger.logMethod?.('_render_newOrder');

    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_headline',
      startIcon: buttons.backToHome,
    });
    const order = this.fsm.getContext().newOrder;

    return html`
      ${this._render_itemList(order.itemList ?? [], this.fsm.getContext().productStorage, true)}
      <div class="btn-container">
        <alwatr-button .content=${buttons.editItems}></alwatr-button>
      </div>
      ${this._render_shippingInfo(order.shippingInfo)}
      <div class="btn-container">
        <alwatr-button .content=${buttons.editShippingForm}></alwatr-button>
      </div>
      ${this._render_summary(order)}
      <div class="submit-container">
        <alwatr-button .content=${buttons.submit}></alwatr-button>
      </div>
    `;
  }

  protected _renderStateContextError(): unknown {
    this._logger.logMethod?.('_render_contextError');

    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_list_headline',
      startIcon: buttons.backToHome,
    });
    const content: IconBoxContent = {
      icon: 'cloud-offline-outline',
      tinted: 1,
      headline: message('fetch_failed_headline'),
      description: message('fetch_failed_description'),
    };

    return html`
      <alwatr-icon-box .content=${content}></alwatr-icon-box>
      <div>
        <alwatr-button .icon=${buttons.retry.icon} .clickSignalId=${buttons.retry.clickSignalId}>
          ${message('retry')}
        </alwatr-button>
      </div>
    `;
  }

  protected _renderStateSelectProduct(): unknown {
    this._logger.logMethod?.('_render_selectProduct');

    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_headline',
      startIcon: buttons.backToHome,
    });

    return html`
      <alwatr-select-product
        .order=${this.fsm.getContext().newOrder}
        .productStorage=${this.fsm.getContext().productStorage}
        .finalPriceStorage=${this.fsm.getContext().finalPriceStorage}
        .priceStorage=${this.fsm.getContext().priceStorage}
      ></alwatr-select-product>
      <div class="btn-container">
        <alwatr-button .content=${buttons.selectProductSubmit} elevated></alwatr-button>
      </div>
    `;
  }

  protected _renderStateShippingForm(): unknown {
    this._logger.logMethod?.('_render_shippingForm');

    const order = this.fsm.getContext().newOrder;
    return html`
      <alwatr-surface tinted>
        <alwatr-order-shipping-form .formData=${order.shippingInfo}></alwatr-order-shipping-form>
      </alwatr-surface>
      <div class="btn-container">
        <alwatr-button .content=${buttons.submitShippingForm}></alwatr-button>
      </div>
    `;
  }

  protected _renderStateReview(): unknown {
    this._logger.logMethod?.('_render_review');

    const order = this.fsm.getContext().newOrder as Order;
    return [
      this._render_status(order),
      this._render_itemList(order.itemList, this.fsm.getContext().productStorage),
      this._render_shippingInfo(order.shippingInfo),
      this._render_summary(order),
      html`
        <div class="submit-container">
          <alwatr-button .content=${buttons.editOrder}></alwatr-button>
          <alwatr-button .content=${buttons.submitFinal}></alwatr-button>
        </div>
      `,
    ];
  }

  protected _renderStateSubmitting(): unknown {
    this._logger.logMethod?.('_render_submitting');

    const content: IconBoxContent = {
      headline: message('page_order_submitting_message'),
      icon: 'cloud-upload-outline',
      tinted: 1,
    };
    return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
  }

  protected _renderStateSubmitSuccess(): unknown {
    const content: IconBoxContent = {
      headline: message('page_order_submit_success_message'),
      icon: 'cloud-done-outline',
      tinted: 1,
    };
    return html`
      <alwatr-icon-box .content=${content}></alwatr-icon-box>
      <div class="submit-container">
        <alwatr-button .content=${buttons.showRegisteredOrderDetail}></alwatr-button>
        <alwatr-button .content=${buttons.newOrder}>${message('page_order_headline')}</alwatr-button>
      </div>
    `;
  }

  protected _renderStateSubmitFailed(): unknown {
    this._logger.logMethod?.('_render_submitFailed');

    const content: IconBoxContent = {
      headline: message('page_order_submit_failed_message'),
      icon: 'cloud-offline-outline',
      tinted: 1,
    };
    return html`
      <alwatr-icon-box .content=${content}></alwatr-icon-box>
      <div class="submit-container">
        <alwatr-button .content=${buttons.retry}></alwatr-button>
      </div>
    `;
  }

  protected _renderStatePending(): unknown {
    this._logger.logMethod?.('_render_pending');

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
  }

  protected _render_message(key: string, icon: string): unknown {
    this._logger.logMethod?.('_render_message');
    const content: IconBoxContent = {
      headline: message(key),
      icon: icon,
      tinted: 1,
    };

    return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
  }

  protected _render_status(order: Order | OrderDraft): unknown {
    this._logger.logMethod?.('_render_status');
    return html`<alwatr-order-status-box .content=${order}></alwatr-order-status-box>`;
  }

  protected _render_itemList(
      itemList: Array<OrderItem>,
      productStorage: AlwatrDocumentStorage<Product> | null | undefined,
      editable = false,
  ): unknown {
    this._logger.logMethod?.('_render_itemList');

    return mapIterable(this, itemList, (item) => {
      const product = productStorage?.data[item.productId];
      if (product == null) {
        this._logger.error('itemDetailTemplate', 'product_not_found', {productId: item.productId});
        return html`<alwatr-surface tinted>${message('order_item_not_exist')}</alwatr-surface>`;
      }

      item.qty ||= 80;

      return html`<alwatr-surface tinted class="product-item">
        <img src="${config.cdn + '/medium/' + product.image.id}" />
        <div class="detail-container">
          <div>${product.title.fa}</div>
          <div>
            <span>${message('order_item_price')}:</span>
            <span>
              <span>${number(item.price)}</span>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_final_price')}:</span>
            <span>
              <span>${number(item.finalPrice)}</span>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_qty_m2')}:</span>
            <span><span>${number(item.qty * tileQtyStep)}</span> m²</span>
          </div>
          <div>
            <span>${message('order_item_qty_tile')}:</span>
            <span>
              <span>${number(item.qty * 10)}</span>
              <alwatr-icon .name=${'stop-outline'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_qty_box')}:</span>
            <span>
              <span>${number(item.qty)}</span>
              <alwatr-icon .name=${'cube-outline'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_final_total_price')}:</span>
            <span>
              <span>${number(item.qty * tileQtyStep * item.finalPrice)}</span>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_total_price')}:</span>
            <span>
              <span>${number(item.qty * tileQtyStep * item.price)}</span>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_discount')}:</span>
            <span>
              <span>
                (٪${number(calcDiscount(item.price, item.finalPrice))})
                ${number(item.qty * tileQtyStep * (item.price - item.finalPrice))}
              </span>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          ${this._render_itemQtyInput(item, editable)}
        </div>
      </alwatr-surface>`;
    });
  }

  protected _render_itemQtyInput(orderItem: OrderItem, editable: boolean): unknown {
    this._logger.logMethod?.('_render_itemQtyInput');

    if (!editable) return;

    // TODO: new element
    const addBtn: IconButtonContent = {
      icon: 'add-outline',
      clickSignalId: 'order_item_qty_add',
      clickDetail: orderItem,
    };
    const removeBtn: IconButtonContent = {
      icon: 'remove-outline',
      clickSignalId: 'order_item_qty_remove',
      clickDetail: orderItem,
    };

    return html`
      <alwatr-surface class="number-field" stated tinted="2">
        <alwatr-icon-button .content=${addBtn}></alwatr-icon-button>
        <alwatr-text-field
          .type=${'number'}
          .value=${orderItem.qty + ''}
          @input-change=${(event: CustomEvent): void => this._onQtyInputChange(event, orderItem)}
        ></alwatr-text-field>
        <alwatr-icon-button .content=${removeBtn}></alwatr-icon-button>
      </alwatr-surface>
    `;
  }

  protected _render_shippingInfo(shippingInfo?: Partial<OrderShippingInfo>): unknown {
    this._logger.logMethod?.('_render_shippingInfo');

    const nullStr = '…' as const;

    return html`<alwatr-surface tinted>
      <div>
        <div>
          <span>${message('order_shipping_recipient_name_title')}:</span>
          <span>${shippingInfo?.recipientName || nullStr}</span>
        </div>
        <div>
          <span>${message('order_shipping_recipient_national_code_title')}:</span>
          <span>${replaceNumber(shippingInfo?.recipientNationalCode || nullStr)}</span>
        </div>
        <div>
          <span>${message('order_shipping_address_title')}:</span>
          <span>${replaceNumber(shippingInfo?.address || nullStr)}</span>
        </div>
        <div>
          <span>${message('order_shipping_car_type_title')}:</span>
          <span
            >${shippingInfo?.carType ? message('order_shipping_car_type_key_' + shippingInfo?.carType) : nullStr}</span
          >
        </div>
        <div>
          <span>${message('order_shipping_lading_type_title')}:</span>
          <span
            >${shippingInfo?.ladingType
              ? message('order_shipping_lading_type_key_' + shippingInfo?.ladingType)
              : nullStr}</span
          >
        </div>
        <div>
          <span>${message('order_shipping_time_period_title')}:</span>
          <span
            >${shippingInfo?.timePeriod
              ? message('order_shipping_time_period_key_' + shippingInfo.timePeriod)
              : nullStr}</span
          >
        </div>
        <div>
          <span>${message('order_shipping_shipment_price_title')}:</span>
          <span>${message('order_shipping_shipment_price_value')}</span>
        </div>
        <div>
          <span>${message('order_shipping_description_title')}:</span>
          <span>${shippingInfo?.description || message('order_shipping_info_empty_description')}</span>
        </div>
      </div>
    </alwatr-surface>`;
  }

  protected _render_summary(order: Order | OrderDraft): unknown {
    this._logger.logMethod?.('_render_summary');
    if (!order.itemList?.length) return nothing;

    const totalPrice = order.totalPrice ?? 0;
    const finalTotalPrice = order.finalTotalPrice ?? 0;
    const ladingPrice = order.ladingPrice ?? 1_850_000;
    const ladingPriceTemplate =
      ladingPrice > 0
        ? html`${number(ladingPrice)}<alwatr-icon .name=${'toman'}></alwatr-icon>`
        : message('order_summary_no_lading_price_yet');

    return html`<alwatr-surface tinted>
      <div class="detail-container">
        <div>
          <span>${message('order_summary_total_price')}:</span>
          <span>
            <span>${number(totalPrice)}</span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_summary_total_final_price')}:</span>
          <span>
            <span>${number(finalTotalPrice)}</span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_summary_discount')}:</span>
          <span>
            <span>
              (٪${number(calcDiscount(totalPrice, finalTotalPrice))}) ${number(totalPrice - finalTotalPrice)}
            </span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_summary_lading_price')}:</span>
          <span>${ladingPriceTemplate}</span>
        </div>
        <div>
          <span>${message('order_summary_discount_after_lading_price')}:</span>
          <span>
            <span>
              (٪${number(calcDiscount(totalPrice, finalTotalPrice + ladingPrice))})
              ${number(totalPrice - finalTotalPrice - ladingPrice)}
            </span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_summary_final_total_price')}:</span>
          <span>
            <span>${number(finalTotalPrice + ladingPrice)}</span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
      </div>
    </alwatr-surface>`;
  }

  protected _onQtyInputChange(event: CustomEvent, orderItem: OrderItem): void {
    const target = event.target as AlwatrTextField;
    this._logger.logMethodArgs?.('_onQtyInputChange', target.value);
    const qty = +target.value || 80;
    orderItem.qty = qty;
    this.requestUpdate();
  }
}
