import {
  customElement,
  css,
  html,
  mapIterable,
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
import {pageOrderDetailStateMachine} from '../../manager/controller/order-detail.js';
import '../stuff/order-item-box.js';

import type {Order, OrderDelivery, OrderItem} from '@alwatr/type/customer-order-management.js';

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
    pageOrderDetailStateMachine,
    UnresolvedMixin(LocalizeMixin(SignalMixin(AlwatrBaseElement))),
) {
  static override styles = css`
    :host {
      display: block;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }

    alwatr-order-item-box {
      margin-bottom: var(--sys-spacing-track);
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
      align-self: flex-start;
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

  protected override render(): unknown {
    this._logger.logMethod('render');
    return this[`render_state_${this.stateMachine.state.to}`]?.();
  }

  protected render_state_loading(): unknown {
    this._logger.logMethod('render_state_loading');
    return this.render_part_message('loading');
  }

  protected render_state_notFound(): unknown {
    this._logger.logMethod('render_state_notFound');
    return this.render_part_message('order_not_found');
  }

  protected render_state_reloading(): unknown {
    this._logger.logMethod('render_state_reloading');
    return this.render_state_detail();
  }

  protected render_state_detail(): unknown {
    this._logger.logMethod('render_state_detail');

    // validate order id
    const order = this.stateMachine.context.orderStorage?.data[this.stateMachine.context.orderId ?? ''] ?? null;
    if (order === null) {
      this.stateMachine.transition('INVALID_ORDER');
      return;
    }

    return [
      this.render_part_status(order),
      this.render_part_item_list(order.itemList),
      this.render_part_delivery(order.delivery),
      this.render_part_summary(order),
    ];
  }

  protected render_part_message(key: string): unknown {
    this._logger.logMethod('render_part_message');
    // TODO: add icon
    return html`<div class="message">${message(key)}</div>`;
  }

  protected render_part_status(order: Order): unknown {
    this._logger.logMethod('render_part_status');
    return html`<alwatr-order-item-box .order=${order}></alwatr-order-item-box>`;
  }

  protected render_part_item_list(itemList: Array<OrderItem>): unknown {
    this._logger.logMethod('render_part_item_list');
    return mapIterable(this, itemList, (item) => {
      const product = this.stateMachine.context.productStorage?.data[item.productId];
      if (product == null) {
        this._logger.error('itemDetailTemplate', 'product_not_found', {productId: item.productId});
        return html`<alwatr-surface elevated>${message('product_not_exist')}</alwatr-surface>`;
      }
      return html`<alwatr-surface elevated>
        <img src="${config.cdn + product.image.id}" />
        <div class="detail-container">
          <b>${product.title.fa}</b>
          <div>
            <span>${message('order_item_price')}:</span>
            <span>
              <b>${number(item.price)}</b>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_final_price')}:</span>
            <span>
              <b>${number(item.finalPrice)}</b>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_qty')}:</span>
            <span><b>${number(item.qty)}</b></span>
          </div>
          <div>
            <span>${message('order_item_total_price')}:</span>
            <span>
              <b>${number(item.qty * item.price)}</b>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_final_total_price')}:</span>
            <span>
              <b>${number(item.qty * item.finalPrice)}</b>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_discount')}:</span>
            <span>
              <b>
                (${number(((item.price - item.finalPrice) / item.price) * 100)}%)
                ${number(item.price - item.finalPrice)}
              </b>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
        </div>
      </alwatr-surface>`;
    });
  }

  protected render_part_delivery(delivery: OrderDelivery): unknown {
    this._logger.logMethod('render_part_delivery');
    return html`<alwatr-surface elevated>
      <div class="detail-container">
        <div>
          <span>${message('order_shipping_recipient_name')}:</span>
          <span>
            <b>${delivery.recipientName}</b>
          </span>
        </div>
        <div>
          <span>${message('order_shipping_recipient_national_code')}:</span>
          <span>
            <b>${replaceNumber(delivery.recipientNationalCode)}</b>
          </span>
        </div>
        <div>
          <span>${message('order_shipping_address')}:</span>
          <span><b>${replaceNumber(delivery.address)}</b></span>
        </div>
        <div>
          <span>${message('order_shipping_car_type_title')}:</span>
          <span>
            <b>${delivery.carType}</b>
          </span>
        </div>
        <div>
          <span>${message('order_shipping_shipment_type_title')}:</span>
          <span>
            <b>${delivery.shipmentType}</b>
          </span>
        </div>
        <div>
          <span>${message('order_shipping_time_period_title')}:</span>
          <span>
            <b>${message('time_period_' + delivery.timePeriod.replace('-', '_'))}</b>
          </span>
        </div>
      </div>
    </alwatr-surface>`;
  }

  protected render_part_summary(order: Order): unknown {
    this._logger.logMethod('render_part_summary');
    return html`<alwatr-surface elevated>
      <div class="detail-container">
        <div>
          <span>${message('order_total_price')}:</span>
          <span>
            <b>${number(order.totalPrice)}</b>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_discount')}:</span>
          <span>
            <b>
              (${number(((order.totalPrice - order.finalPrice) / order.totalPrice) * 100)}%)
              ${number(order.totalPrice - order.finalPrice)}
            </b>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_shipping_price')}:</span>
          <span>
            <b>${number(order.shippingPrice)}</b>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_final_total_price')}:</span>
          <span>
            <b>${number(order.finalPrice)}</b>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
      </div>
    </alwatr-surface>`;
  }
}
