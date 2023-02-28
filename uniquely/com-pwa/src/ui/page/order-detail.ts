import {
  customElement,
  css,
  html,
  mapIterable,
  nothing,
  StateMachineMixin,
  UnresolvedMixin,
  LocalizeMixin,
  SignalMixin,
  AlwatrBaseElement,
} from '@alwatr/element';
import {message, number, replaceNumber} from '@alwatr/i18n';
import '@alwatr/icon';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';

import {config} from '../../config.js';
import {pageOrderDetailFsm} from '../../manager/controller/order-detail.js';

import type {OrderItem} from '@alwatr/type/customer-order-management.js';
import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-detail': AlwatrPageOrderDetail;
  }
}

/**
 * Alwatr Customer Order Management Order Form Page
 */
@customElement('alwatr-page-order-detail')
export class AlwatrPageOrderDetail extends StateMachineMixin(
    pageOrderDetailFsm,
    UnresolvedMixin(LocalizeMixin(SignalMixin(UnresolvedMixin(AlwatrBaseElement)))),
) {
  static override styles = css`
    :host {
      display: block;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }

    alwatr-surface {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    alwatr-surface,
    alwatr-icon-box {
      margin-bottom: var(--sys-spacing-track);
      gap: var(--sys-spacing-track);
    }

    alwatr-surface > img {
      display: block;
      width: 6rem;
      border-radius: var(--sys-radius-medium);
    }

    .detail-container {
      flex-grow: 1;
    }

    .detail-container > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  `;

  override render(): unknown {
    this._logger.logMethod('render');
    return this[`render_${this.stateMachine.state.to}`]?.();
  }

  render_loading(): unknown {
    this._logger.logMethod('render_loading');
    return message('loading');
  }

  render_reloading(): unknown {
    this._logger.logMethod('render_reloading');
    return this.render_detail();
  }

  render_notFound(): unknown {
    this._logger.logMethod('render_notFound');
    return message('order_not_found');
  }

  protected render_detail(): unknown {
    this._logger.logMethod('render_detail');

    // validate order id
    const order = this.stateMachine.context.orderStorage?.data[this.stateMachine.context.orderId ?? ''] ?? null;
    if (order === null) {
      this.stateMachine.transition('INVALID_ORDER');
      return;
    }

    const iconBoxContent: IconBoxContent = {
      stated: true,
      tinted: 1,
      icon: 'receipt-outline',
      flipRtl: true,
      headline: message('order_item_headline').replace(
          '${orderId}',
          replaceNumber(`${order.id}`.padStart(2, '0')),
      ),
      description: message('order_item_status') + ': ' + message('order_status_' + order.status),
      href: `/order/${order.id}/tracking`,
    };
    return html`
      <alwatr-icon-box .content=${iconBoxContent}></alwatr-icon-box>
      ${mapIterable(this, order?.itemList, this._itemDetailTemplate, message('loading'))}
      <alwatr-surface elevated>
        <div class="detail-container">
          <div>
            <span>${message('order_shipping_recipient_name')}:</span>
            <span>
              <b>${order.delivery?.recipientName}</b>
            </span>
          </div>
          <div>
            <span>${message('order_shipping_recipient_national_code')}:</span>
            <span>
              <b>${order.delivery?.recipientNationalCode}</b>
            </span>
          </div>
          <div>
            <span>${message('order_shipping_address')}:</span>
            <span><b>${order.delivery?.address}</b></span>
          </div>
          <div>
            <span>${message('order_shipping_car_type_title')}:</span>
            <span>
              <b>${order.delivery?.carType}</b>
            </span>
          </div>
          <div>
            <span>${message('order_shipping_shipment_type_title')}:</span>
            <span>
              <b>${order.delivery?.shipmentType}</b>
            </span>
          </div>
          <div>
            <span>${message('order_shipping_time_period_title')}:</span>
            <span>
              <b>${message('time_period_' + order.delivery?.timePeriod.replace('-', '_'))}</b>
            </span>
          </div>
        </div>
      </alwatr-surface>

      <alwatr-surface elevated>
        <div class="detail-container">
          <div>
            <span>${message('order_detail_shipping_price')}:</span>
            <span>
              <b>${number(order.shippingPrice)}</b>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_detail_total_price')}:</span>
            <span>
              <b>${number(order.totalPrice)}</b>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_detail_final_price')}:</span>
            <span>
              <b>${number(order.finalPrice)}</b>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
        </div>
      </alwatr-surface>
      <alwatr-button tinted class="add-button" @click=${this._addNewItem}
        >${message('order_detail_add_product_button')}
      </alwatr-button>
    `;
  }

  protected _addNewItem(): void {
    this._logger.logMethod('_addNewItem');
    this.dispatchEvent(new CustomEvent('request-redirect', {detail: {page: 'product'}}));
  }

  protected _itemDetailTemplate(item: OrderItem): unknown {
    const product = this.stateMachine.context.productStorage?.data[item.productId];
    if (product == null) {
      this._logger.error('itemDetailTemplate', 'product_not_found', {productId: item.productId});
      return nothing;
    }

    return html`
      <alwatr-surface elevated>
        <img src="${config.cdn + product.image.id}" />
        <div class="detail-container">
          <b>${product.title.fa}</b>
          <div>
            <span>${message('order_detail_price')}:</span>
            <span>
              <b>${number(item.price)}</b>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_detail_final_price')}:</span>
            <span>
              <b>${number(item.finalPrice)}</b>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_detail_qty')}:</span>
            <span><b>${item.qty}</b></span>
          </div>
        </div>
      </alwatr-surface>
    `;
  }
}
