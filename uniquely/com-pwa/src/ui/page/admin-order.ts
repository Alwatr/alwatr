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
import {message, number, replaceNumber} from '@alwatr/i18n';
import '@alwatr/icon';
import {calcDiscount} from '@alwatr/math';
import {redirect} from '@alwatr/router';
import {eventListener} from '@alwatr/signal';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/card/surface.js';

import {config} from '../../config.js';
import {buttons} from '../../manager/buttons.js';
import {productStorageContextConsumer} from '../../manager/context-provider/product-storage.js';
import {userListIncOrderStorageContextConsumer} from '../../manager/context-provider/user-list-storage.js';
import {scrollToTopCommand, topAppBarContextProvider} from '../../manager/context.js';
import '../stuff/order-status-box.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Order, OrderDraft, OrderItem, OrderShippingInfo, Product} from '@alwatr/type/customer-order-management.js';
import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-admin-order': AlwatrPageAdminOrder;
  }
}

/**
 * Alwatr Customer Order Management Order Form Page
 */
@customElement('alwatr-page-admin-order')
export class AlwatrPageAdminOrder extends UnresolvedMixin(LocalizeMixin(SignalMixin(AlwatrBaseElement))) {
  static override styles: CSSResultGroup = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
      gap: var(--sys-spacing-track);
    }

    :host([state='reloading']) > * {
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

    .bold-text {
      font-weight: var(--ref-font-weight-bold);
    }

    [hidden] {
      display: none;
    }
  `;

  @state()
    gotState = userListIncOrderStorageContextConsumer.getState().target;

  @property({type: String})
    orderId?: string;

  @property({type: String})
    userId?: string;

  override connectedCallback(): void {
    super.connectedCallback();

    this._addSignalListeners(userListIncOrderStorageContextConsumer.subscribe(() => {
      this.gotState = userListIncOrderStorageContextConsumer.getState().target;
    }, {receivePrevious: 'NextCycle'}));

    this._addSignalListeners(productStorageContextConsumer.subscribe(() => {
      if (productStorageContextConsumer.getState().target === 'complete') {
        this.requestUpdate();
      }
    }, {receivePrevious: 'NextCycle'}));

    this._addSignalListeners(eventListener.subscribe(buttons.backToAdminOrderList.clickSignalId, () => {
      redirect({sectionList: ['admin-order-list']});
    }));

    this._addSignalListeners(eventListener.subscribe(buttons.retry.clickSignalId, () => {
      if (userListIncOrderStorageContextConsumer.getState().target !== 'complete') {
        userListIncOrderStorageContextConsumer.request();
      }
      if (productStorageContextConsumer.getState().target !== 'complete') {
        productStorageContextConsumer.request();
      }
    }));

    this._addSignalListeners(eventListener.subscribe(buttons.reloadAdminOrderListStorage.clickSignalId, () => {
      userListIncOrderStorageContextConsumer.request();
      productStorageContextConsumer.request();
    }));
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);
    if (changedProperties.has('gotState')) {
      this.setAttribute('state', this.gotState);
    }
    if (changedProperties.has('orderId')) {
      scrollToTopCommand.request({smooth: true});
    }
  }

  protected override render(): unknown {
    this._logger.logMethod?.('render');
    return userListIncOrderStorageContextConsumer.fsm.render({
      initial: 'onlineLoading',
      offlineLoading: 'onlineLoading',
      onlineLoading: this._renderStateLoading,
      loadingFailed: this._renderStateLoadingFailed,
      reloadingFailed: 'complete',
      reloading: 'complete',
      complete: this._renderStateComplete,
    }, this);
  }

  protected _renderStateLoading(): unknown {
    this._logger.logMethod?.('_renderStateLoading');

    topAppBarContextProvider.setValue({
      headlineKey: 'loading',
      startIcon: buttons.backToAdminOrderList,
      endIconList: [buttons.reloadAdminOrderListStorage],
    });
    const content: IconBoxContent = {
      tinted: 1,
      icon: 'cloud-download-outline',
      headline: message('loading'),
    };
    return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
  }

  protected _renderStateLoadingFailed(): unknown {
    this._logger.logMethod?.('_renderStateLoadingFailed');

    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_list_headline',
      startIcon: buttons.backToAdminOrderList,
      endIconList: [buttons.reloadAdminOrderListStorage],
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
        <alwatr-button .content=${buttons.retry}></alwatr-button>
      </div>
    `;
  }

  protected _render_notFound(): unknown {
    this._logger.logMethod?.('_render_notFound');

    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_list_headline',
      startIcon: buttons.backToAdminOrderList,
      endIconList: [buttons.reloadAdminOrderListStorage],
    });
    const content: IconBoxContent = {
      headline: message('page_order_detail_not_found'),
      icon: 'close',
      tinted: 1,
    };
    return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
  }

  protected _renderStateComplete(): unknown {
    this._logger.logMethod?.('_renderStateComplete');

    topAppBarContextProvider.setValue({
      headlineKey: 'page_order_list_headline',
      startIcon: buttons.backToAdminOrderList,
      endIconList: [buttons.reloadAdminOrderListStorage],
    });

    if (this.userId == null || this.orderId == null) {
      return this._render_notFound();
    }
    const order = userListIncOrderStorageContextConsumer.getResponse()?.data[this.userId]?.orderList[this.orderId];
    if (order == null) {
      return this._render_notFound();
    }

    const productStorageStateTarget = productStorageContextConsumer.getState().target;
    if (productStorageStateTarget === 'reloadingFailed') {
      return this._renderStateLoadingFailed();
    }
    else if (productStorageStateTarget !== 'complete' && productStorageStateTarget !== 'reloading') {
      return this._renderStateLoading();
    }
    const productStorage = productStorageContextConsumer.getResponse();

    return [
      this._render_status(order),
      this._render_itemList(order.itemList, productStorage),
      this._render_shippingInfo(order.shippingInfo),
      this._render_summary(order),
    ];
  }

  protected _render_status(order: Order | OrderDraft): unknown {
    this._logger.logMethod?.('_render_status');
    return html`<alwatr-order-status-box .content=${order}></alwatr-order-status-box>`;
  }

  protected _render_itemList(
      itemList: Array<OrderItem>,
      productStorage: AlwatrDocumentStorage<Product> | null | undefined,
  ): unknown {
    this._logger.logMethod?.('_render_itemList');

    return mapIterable(this, itemList, (item) => {
      const product = productStorage?.data[item.productId];
      if (product == null) {
        this._logger.error('itemDetailTemplate', 'product_not_found', {productId: item.productId});
        return html`<alwatr-surface tinted>${message('order_item_not_exist')}</alwatr-surface>`;
      }

      return html`<alwatr-surface tinted class="product-item">
        <img src="${config.serverContext.cdn + '/medium/' + product.image.id}" />
        <div class="detail-container">
          <div>${product.title.fa}</div>
          <div>
            <span>${message('order_item_price')}:</span>
            <span>
              <span>${number(item.marketPrice)}</span>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_final_price')}:</span>
            <span>
              <span class="bold-text">${number(item.agencyPrice)}</span>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_qty_m2')}:</span>
            <span><span>${number(item.qty * config.order.factor.box2m2)}</span> m²</span>
          </div>
          <div>
            <span>${message('order_item_qty_tile')}:</span>
            <span>
              <span>${number(item.qty * config.order.factor.box2tile)}</span>
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
              <span class="bold-text">${number(item.qty * config.order.factor.box2m2 * item.agencyPrice)}</span>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_total_price')}:</span>
            <span>
              <span>${number(item.qty * config.order.factor.box2m2 * item.marketPrice)}</span>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_discount')}:</span>
            <span>
              <span>
                (٪${number(calcDiscount(item.marketPrice, item.agencyPrice))})
                ${number(item.qty * config.order.factor.box2m2 * (item.marketPrice - item.agencyPrice))}
              </span>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
        </div>
      </alwatr-surface>`;
    });
  }

  protected _render_shippingInfo(shippingInfo?: Partial<OrderShippingInfo>): unknown {
    this._logger.logMethod?.('_render_shippingInfo');

    const nullStr = '…' as const;

    // if (!shippingInfo) {
    //   return html`<alwatr-surface tinted><div>
    // }

    return html`<alwatr-surface tinted>
      <div class="detail-container">
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
          <span>
            ${shippingInfo?.carType ? message('order_shipping_car_type_key_' + shippingInfo?.carType) : nullStr}
          </span>
        </div>
        <div>
          <span>${message('order_shipping_lading_type_title')}:</span>
          <span>
            ${shippingInfo?.ladingType
              ? message(
                  'order_shipping_lading_type_key_' +
                    (shippingInfo?.carType != 'trailer_truck' ? 'hand' : shippingInfo?.ladingType),
              )
              : nullStr}
          </span>
        </div>
        <div>
          <span>${message('order_shipping_time_period_title')}:</span>
          <span>
            ${shippingInfo?.timePeriod ? message('order_shipping_time_period_key_' + shippingInfo.timePeriod) : nullStr}
          </span>
        </div>
        <div ?hidden=${!shippingInfo?.description}>
          <span>${message('order_shipping_description_title')}:</span>
          <span>${shippingInfo?.description}</span>
        </div>
      </div>
    </alwatr-surface>`;
  }

  protected _render_summary(order: Order): unknown {
    this._logger.logMethod?.('_render_summary');
    if (!order.itemList?.length) return nothing;

    return html`<alwatr-surface tinted>
      <div class="detail-container">
        <div>
          <span>${message('order_summary_total_price')}:</span>
          <span>
            <span>${number(order.subTotalMarket)}</span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_summary_total_final_price')}:</span>
          <span>
            <span class="bold-text">${number(order.subTotalAgency)}</span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_summary_discount')}:</span>
          <span>
            <span>
              (٪${number(calcDiscount(order.subTotalMarket, order.subTotalAgency))})
              ${number(order.subTotalMarket - order.subTotalAgency)}
            </span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div ?hidden=${order.ladingFee === 0}>
          <span
            >${message('order_summary_lading_price').replace(
      '${carCount}',
      number(order.ladingFee / (config.order.lading[order.shippingInfo.carType!]?.fee ?? order.ladingFee)),
  )}:
          </span>
          <span>
            <span>${number(order.ladingFee)}</span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div ?hidden=${order.palletCost === 0}>
          <span>
            ${message('order_summary_palette_price').replace(
      '${paletteCount}',
      number(order.palletCost / config.order.pallet.price),
  )}:
          </span>
          <span>
            <span>${number(order.palletCost)}</span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_shipping_shipment_price_title')}:</span>
          <span>${message('order_shipping_shipment_price_value')}</span>
        </div>
        <div>
          <span>${message('order_summary_discount_after_lading_price')}:</span>
          <span>
            <span>
              (٪${number(calcDiscount(order.subTotalMarket, order.subTotalAgency + order.totalShippingFee))})
              ${number(order.subTotalMarket - order.subTotalAgency - order.totalShippingFee)}
            </span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_summary_final_total_price')}:</span>
          <span>
            <span class="bold-text">${number(order.subTotalAgency + order.ladingFee + order.palletCost)}</span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
      </div>
    </alwatr-surface>`;
  }
}
