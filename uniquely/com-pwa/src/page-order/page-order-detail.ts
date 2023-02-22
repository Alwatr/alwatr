import {
  customElement,
  css,
  html,
  LocalizeMixin,
  AlwatrBaseElement,
  SignalMixin,
  property,
  PropertyValues,
  mapIterable,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import {topAppBarContextProvider} from '../context.js';

import type {Order, OrderDraft, OrderItem} from '@alwatr/type/customer-order-management.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-detail': AlwatrPageOrderDetail;
  }
}

/**
 * Alwatr Customer Order Management Order Form Page
 */
@customElement('alwatr-page-order-detail')
export class AlwatrPageOrderDetail extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static formId = 'order';

  static override styles = css`
    :host {
      display: block;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }

    alwatr-surface {
      margin-bottom: var(--sys-spacing-track);
    }

    alwatr-surface > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  `;

  @property({attribute: false})
    order?: Order | OrderDraft | null;

  override connectedCallback(): void {
    super.connectedCallback();

    topAppBarContextProvider.setValue({
      type: 'small',
      headline: message('page_order_detail_headline'),
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
      tinted: 2,
    });
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      ${mapIterable(this, this.order?.itemList, this._itemDetailTemplate, message('loading'))}
      <button @click=${this._addNewItem}>Add new product</button>
    `;
  }

  protected _addNewItem(): void {
    this._logger.logMethod('_addNewItem');
    this.dispatchEvent(new CustomEvent('request-redirect', {detail: {page: 'product'}}));
  }

  protected _itemDetailTemplate(item: OrderItem): unknown {
    return html`
      <alwatr-surface elevated>
        <div>
          <span>${message('order_detail_product_id')}:</span>
          <span><b>${item.productId}</b></span>
        </div>
        <div>
          <span>${message('order_detail_qty')}:</span>
          <span><b>${item.qty}</b></span>
        </div>
        <div>
          <span>${message('order_detail_price')}:</span>
          <span><b>${item.price}</b></span>
        </div>
        <div>
          <span>${message('order_detail_final_price')}:</span>
          <span><b>${item.finalPrice}</b></span>
        </div>
      </alwatr-surface>
    `;
  }
}
