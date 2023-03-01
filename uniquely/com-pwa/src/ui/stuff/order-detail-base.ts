import {css, html, mapIterable, LocalizeMixin, SignalMixin, AlwatrBaseElement} from '@alwatr/element';
import {message, number, replaceNumber} from '@alwatr/i18n';
import '@alwatr/icon';
import {calcDiscount} from '@alwatr/math';
import '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import './order-status-box.js';
import {config} from '../../config.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Order, OrderShippingInfo, OrderDraft, OrderItem, Product} from '@alwatr/type/customer-order-management.js';

export class AlwatrOrderDetailBase extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: block;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }

    alwatr-order-status-box {
      margin-bottom: var(--sys-spacing-track);
    }

    alwatr-surface {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    alwatr-surface {
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

    alwatr-text-field {
      /* width: 5em; */
      /* padding: 0 var(--sys-spacing-track); */
      /* border-radius: 0; */
      /* border: none; */
      /* border-bottom: 1px solid var(--sys-color-outline); */
    }
  `;

  protected render_part_message(key: string): unknown {
    this._logger.logMethod('render_part_message');
    // TODO: add icon
    return html`<div class="message">${message(key)}</div>`;
  }

  protected render_part_status(order: Order | OrderDraft): unknown {
    this._logger.logMethod('render_part_status');
    return html`<alwatr-order-status-box .content=${order}></alwatr-order-status-box>`;
  }

  protected render_part_item_list(
      itemList: Array<OrderItem>,
      productStorage: AlwatrDocumentStorage<Product> | null,
      editable = false,
  ): unknown {
    this._logger.logMethod('render_part_item_list');
    return mapIterable(this, itemList, (item) => {
      const product = productStorage?.data[item.productId];
      if (product == null) {
        this._logger.error('itemDetailTemplate', 'product_not_found', {productId: item.productId});
        return html`<alwatr-surface elevated>${message('product_not_exist')}</alwatr-surface>`;
      }

      const itemQtyTemplate = editable
        ? html`<alwatr-text-field .type=${'number'} .value=${(item.qty ?? 0) + ''}></alwatr-text-field>`
        : html`<span><b>${number(item.qty)}</b> m²</span>`;

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
            ${itemQtyTemplate}
          </div>
          <div>
            <span>${message('order_item_final_total_price')}:</span>
            <span>
              <b>${number(item.qty * item.finalPrice)}</b>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_total_price')}:</span>
            <span>
              <b>${number(item.qty * item.price)}</b>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_discount')}:</span>
            <span>
              <b> (${number(calcDiscount(item.price, item.finalPrice))}%) ${number(item.price - item.finalPrice)} </b>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
        </div>
      </alwatr-surface>`;
    });
  }

  protected render_part_shipping_info(shippingInfo: OrderShippingInfo): unknown {
    this._logger.logMethod('render_part_shipping_info');
    return html`<alwatr-surface elevated>
      <div class="detail-container">
        <div>
          <span>${message('order_shipping_recipient_name')}:</span>
          <span>
            <b>${shippingInfo.recipientName}</b>
          </span>
        </div>
        <div>
          <span>${message('order_shipping_recipient_national_code')}:</span>
          <span>
            <b>${replaceNumber(shippingInfo.recipientNationalCode)}</b>
          </span>
        </div>
        <div>
          <span>${message('order_shipping_address')}:</span>
          <span><b>${replaceNumber(shippingInfo.address)}</b></span>
        </div>
        <div>
          <span>${message('order_shipping_car_type_title')}:</span>
          <span>
            <b>${shippingInfo.carType}</b>
          </span>
        </div>
        <div>
          <span>${message('order_shipping_shipment_type_title')}:</span>
          <span>
            <b>${shippingInfo.shipmentType}</b>
          </span>
        </div>
        <div>
          <span>${message('order_shipping_time_period_title')}:</span>
          <span>
            <b>${message('time_period_' + shippingInfo.timePeriod)}</b>
          </span>
        </div>
      </div>
    </alwatr-surface>`;
  }

  protected render_part_summary(order: Order | OrderDraft): unknown {
    this._logger.logMethod('render_part_summary');

    const totalPrice = order.totalPrice ?? 0;
    const finalPrice = order.finalPrice ?? 0;
    const shippingPriceTemplate = order.shippingPrice
      ? html`<b>${number(order.shippingPrice)}</b><alwatr-icon .name=${'toman'}></alwatr-icon>`
      : message('no_shipping_price_yet');

    return html`<alwatr-surface elevated>
      <div class="detail-container">
        <div>
          <span>${message('order_total_price')}:</span>
          <span>
            <b>${number(totalPrice)}</b>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_discount')}:</span>
          <span>
            <b> (${number(calcDiscount(totalPrice, finalPrice))}%) ${number(totalPrice - finalPrice)} </b>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_shipping_price')}:</span>
          <span>${shippingPriceTemplate}</span>
        </div>
        <div>
          <span>${message('order_final_total_price')}:</span>
          <span>
            <b>${number(finalPrice)}</b>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
      </div>
    </alwatr-surface>`;
  }
}
