import {
  css,
  html,
  mapIterable,
  LocalizeMixin,
  SignalMixin,
  AlwatrBaseElement,
  type CSSResultGroup,
  nothing,
} from '@alwatr/element';
import {message, number, replaceNumber} from '@alwatr/i18n';
import '@alwatr/icon';
import {calcDiscount} from '@alwatr/math';
import '@alwatr/ui-kit/button/icon-button.js';
import '@alwatr/ui-kit/card/surface.js';

import './order-lading-form.js';
import './order-status-box.js';
import {config} from '../../config.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Order, OrderLadingInfo, OrderDraft, OrderItem, Product} from '@alwatr/type/customer-order-management.js';
import type {IconButtonContent} from '@alwatr/ui-kit/button/icon-button.js';

export class AlwatrOrderDetailBase extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles: CSSResultGroup = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
      gap: var(--sys-spacing-track);
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

      return html`<alwatr-surface tinted class="product-item">
        <img src="${config.cdn + product.image.id}" />
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
            <span><span>${number(item.qty)}</span> m²</span>
          </div>
          <div>
            <span>${message('order_item_qty_tile')}:</span>
            <span>
              <span>${number((item.qty / qtyStep) * 10)}</span>
              <alwatr-icon .name=${'stop-outline'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_qty_box')}:</span>
            <span>
              <span>${number(item.qty / qtyStep)}</span>
              <alwatr-icon .name=${'cube-outline'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_final_total_price')}:</span>
            <span>
              <span>${number(item.qty * item.finalPrice)}</span>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_total_price')}:</span>
            <span>
              <span>${number(item.qty * item.price)}</span>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
            </span>
          </div>
          <div>
            <span>${message('order_item_discount')}:</span>
            <span>
              <span>
                (٪${number(calcDiscount(item.price, item.finalPrice))})
                ${number(item.qty * (item.price - item.finalPrice))}
              </span>
              <alwatr-icon .name=${'toman'}></alwatr-icon>
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

  protected render_part_lading_info(ladingInfo?: Partial<OrderLadingInfo>): unknown {
    this._logger.logMethod('render_part_lading_info');

    const nullStr = '…' as const;

    return html`<alwatr-surface tinted>
      <div>
        <div>
          <span>${message('order_lading_recipient_name_title')}:</span>
          <span>${ladingInfo?.recipientName ?? nullStr}</span>
        </div>
        <div>
          <span>${message('order_lading_recipient_national_code_title')}:</span>
          <span>${replaceNumber(ladingInfo?.recipientNationalCode ?? nullStr)}</span>
        </div>
        <div>
          <span>${message('order_lading_address_title')}:</span>
          <span>${replaceNumber(ladingInfo?.address ?? nullStr)}</span>
        </div>
        <div>
          <span>${message('order_lading_car_type_title')}:</span>
          <span>${ladingInfo?.carType ?? nullStr}</span>
        </div>
        <div>
          <span>${message('order_lading_lading_type_title')}:</span>
          <span>${ladingInfo?.ladingType ?? nullStr}</span>
        </div>
        <div>
          <span>${message('order_lading_time_period_title')}:</span>
          <span>${ladingInfo?.timePeriod ? message('time_period_' + ladingInfo.timePeriod) : nullStr}</span>
        </div>
        <div>
          <span>${message('order_lading_shipment_price_title')}:</span>
          <span>${message('order_lading_shipment_price_value')}</span>
        </div>
      </div>
    </alwatr-surface>`;
  }

  protected render_part_summary(order: Order | OrderDraft): unknown {
    this._logger.logMethod('render_part_summary');
    if (!order.itemList?.length) return nothing;

    const totalPrice = order.totalPrice ?? 0;
    const finalTotalPrice = order.finalTotalPrice ?? 0;
    const ladingPrice = order.ladingPrice ?? 1_850_000;
    const ladingPriceTemplate =
      ladingPrice > 0
        ? html`${number(ladingPrice)}<alwatr-icon .name=${'toman'}></alwatr-icon>`
        : message('no_lading_price_yet');

    return html`<alwatr-surface tinted>
      <div class="detail-container">
        <div>
          <span>${message('order_total_price')}:</span>
          <span>
            <span>${number(totalPrice)}</span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_total_final_price')}:</span>
          <span>
            <span>${number(finalTotalPrice)}</span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_discount')}:</span>
          <span>
            <span> (٪${number(calcDiscount(totalPrice, finalTotalPrice))}) ${number(totalPrice - finalTotalPrice)} </span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_lading_price')}:</span>
          <span>${ladingPriceTemplate}</span>
        </div>
        <div>
          <span>${message('order_discount_after_lading')}:</span>
          <span>
            <span>
              (٪${number(calcDiscount(totalPrice, finalTotalPrice + ladingPrice))})
              ${number(totalPrice - finalTotalPrice - ladingPrice)}
            </span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
        <div>
          <span>${message('order_final_total_price')}:</span>
          <span>
            <span>${number(finalTotalPrice + ladingPrice)}</span>
            <alwatr-icon .name=${'toman'}></alwatr-icon>
          </span>
        </div>
      </div>
    </alwatr-surface>`;
  }

  protected render_part_lading_form(ladingInfo?: Partial<OrderLadingInfo>): unknown {
    this._logger.logMethod('render_part_summary');
    return html`<alwatr-surface tinted>
      <alwatr-order-lading-form .ladingInfo=${ladingInfo}></alwatr-order-lading-form>
    </alwatr-surface>`;
  }
}
