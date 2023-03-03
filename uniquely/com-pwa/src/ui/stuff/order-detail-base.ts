import {
  css,
  html,
  mapIterable,
  LocalizeMixin,
  SignalMixin,
  AlwatrBaseElement,
  type CSSResultGroup,
} from '@alwatr/element';
import {message, number, replaceNumber} from '@alwatr/i18n';
import '@alwatr/icon';
import {calcDiscount} from '@alwatr/math';
import '@alwatr/ui-kit/button/icon-button.js';
import '@alwatr/ui-kit/card/surface.js';

import './order-status-box.js';
import {config} from '../../config.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Order, OrderShippingInfo, OrderDraft, OrderItem, Product} from '@alwatr/type/customer-order-management.js';
import type {IconButtonContent} from '@alwatr/ui-kit/button/icon-button.js';

export class AlwatrOrderDetailBase extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles: CSSResultGroup = css`
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
      --_surface-color-on: var(--sys-color-on-surface-variant-hsl);
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: var(--sys-spacing-track);
      gap: var(--sys-spacing-track);
    }

    alwatr-surface > img {
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

    .btn-container {
      display: flex;
      text-align: end;
      justify-content: space-between;
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
    input {
      display: block;
      padding: 0;
      font: inherit;
      width: 100%;
      flex-grow: 1;
      border-radius: inherit;
      border: none;
      outline: transparent;
      text-align: inherit;
      background-color: transparent;
      color: inherit;
      caret-color: var(--sys-color-primary);
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
        return html`<alwatr-surface tinted>${message('product_not_exist')}</alwatr-surface>`;
      }

      const qtyStep = 3.6;
      item.qty ||= qtyStep * 100;

      return html`<alwatr-surface tinted>
        <img src="${config.cdn + product.image.id}" />
        <div class="detail-container">
          <div>${product.title.fa}</div>
          <div>
            <span>${message('order_item_price')}:</span>
            <span>
              <span>${number(item.price)}</span>
              <alwatr-icon name="toman"></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_final_price')}:</span>
            <span>
              <span>${number(item.finalPrice)}</span>
              <alwatr-icon name="toman"></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_qty_m2')}:</span>
            <span><span>${number(item.qty)}</span> m²</span>
          </div>
          <div>
            <span>${message('order_item_qty_tile')}:</span>
            <span>
              <span>${number((item.qty / qtyStep) * 10)}</span>
              <alwatr-icon name="stop-outline"></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_qty_box')}:</span>
            <span>
              <span>${number(item.qty / qtyStep)}</span>
              <alwatr-icon name="cube-outline"></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_final_total_price')}:</span>
            <span>
              <span>${number(item.qty * item.finalPrice)}</span>
              <alwatr-icon name="toman"></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_total_price')}:</span>
            <span>
              <span>${number(item.qty * item.price)}</span>
              <alwatr-icon name="toman"></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_discount')}:</span>
            <span>
              <span>
                (${number(calcDiscount(item.price, item.finalPrice))}%)
                ${number(item.qty * (item.price - item.finalPrice))}
              </span>
              <alwatr-icon name="toman"></alwatr-icon>
            </span>
          </div>
          ${this.render_part_item_qty_input(item, editable)}
        </div>
      </alwatr-surface>`;
    });
  }

  protected render_part_item_qty_input(orderItem: OrderItem, editable: boolean): unknown {
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
        <input .type=${'number'} .value=${(orderItem.qty ?? 0) + ''}></input>
        <alwatr-icon-button .content=${removeBtn}></alwatr-icon-button>
      </alwatr-surface>
    `;
  }

  protected render_part_shipping_info(shippingInfo: OrderShippingInfo): unknown {
    this._logger.logMethod('render_part_shipping_info');
    return html`<alwatr-surface tinted>
      <div class="detail-container">
        <div>
          <span>${message('order_shipping_recipient_name')}:</span>
          <span>${shippingInfo.recipientName}</span>
        </div>
        <div>
          <span>${message('order_shipping_recipient_national_code')}:</span>
          <span>${replaceNumber(shippingInfo.recipientNationalCode)}</span>
        </div>
        <div>
          <span>${message('order_shipping_address')}:</span>
          <span>${replaceNumber(shippingInfo.address)}</span>
        </div>
        <div>
          <span>${message('order_shipping_car_type_title')}:</span>
          <span>${shippingInfo.carType}</span>
        </div>
        <div>
          <span>${message('order_shipping_shipment_type_title')}:</span>
          <span>${shippingInfo.shipmentType}</span>
        </div>
        <div>
          <span>${message('order_shipping_time_period_title')}:</span>
          <span>${message('time_period_' + shippingInfo.timePeriod)}</span>
        </div>
      </div>
    </alwatr-surface>`;
  }

  protected render_part_summary(order: Order | OrderDraft): unknown {
    this._logger.logMethod('render_part_summary');

    const totalPrice = order.totalPrice ?? 0;
    const finalPrice = order.finalPrice ?? 0;
    const shippingPriceTemplate = order.shippingPrice
      ? html`<b>${number(order.shippingPrice)}</b><alwatr-icon name="toman"></alwatr-icon>`
      : message('no_shipping_price_yet');

    return html`<alwatr-surface tinted>
      <div class="detail-container">
        <div>
          <span>${message('order_total_price')}:</span>
          <span>
            <span>${number(totalPrice)}</span>
            <alwatr-icon name="toman"></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_discount')}:</span>
          <span>
            <span> (${number(calcDiscount(totalPrice, finalPrice))}%) ${number(totalPrice - finalPrice)} </span>
            <alwatr-icon name="toman"></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_shipping_price')}:</span>
          <span>${shippingPriceTemplate}</span>
        </div>
        <div>
          <span>${message('order_final_total_price')}:</span>
          <span>
            <span>${number(finalPrice)}</span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
      </div>
    </alwatr-surface>`;
  }
}
