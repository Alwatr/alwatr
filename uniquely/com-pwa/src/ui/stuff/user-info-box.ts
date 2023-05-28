import {
  AlwatrBaseElement,
  LocalizeMixin,
  SignalMixin,
  css,
  customElement,
  html,
  mapObject,
  property,
} from '@alwatr/element';
import {date, message} from '@alwatr/i18n';

import type {ComUserIncOrder, Order} from '@alwatr/type/customer-order-management.js';
import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-user-inc-order-box': AlwatrUserInfoBox;
  }
}

/**
 * Alwatr User Include Order Box Element.
 */
@customElement('alwatr-user-info-box')
export class AlwatrUserInfoBox extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: block;
    }

    .bold-text {
      font-weight: var(--ref-font-weight-bold);
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

    .order-info {
      /* background-color: ; */
      cursor: pointer;
    }

    .order-info:hover {

    }
  `;

  @property()
    userIncOrder?: ComUserIncOrder;

  override render(): unknown {
    this._logger.logMethod?.('render');
    if (this.userIncOrder == null) return;

    const userProfileIconBox: IconBoxContent = {
      tinted: 1,
      headline: this.userIncOrder.fullName,
      icon: 'person-circle-outline',
    };

    return html`
      <alwatr-icon-box .content=${userProfileIconBox}>
        <div class="detail-container">
          <div>
            <span>${message('phone_number')}:‌</span>
            <span dir="ltr">+${this.userIncOrder.phoneNumber}</span>
          </div>
          <div>
            <span>${message('province')}:‌</span>
            <span>${this.userIncOrder.province}</span>
          </div>
          <div>
            <span>${message('city')}:‌</span>
            <span>${this.userIncOrder.city}</span>
          </div>
          <div class="break"></div>
        </div>
        ${this._renderOrderBox()}
      </alwatr-icon-box>
    `;
  }

  protected _renderOrderBox(): unknown {
    let orderList;
    if (Object.keys(this.userIncOrder!.orderList).length === 0) {
      orderList = html`${message('empty_order_list')}`;
    }
    else {
      orderList = mapObject(this, this.userIncOrder!.orderList, (order) => this._renderOrder(order));
    }

    return html`
      <h3>${message('order_list')}</h3>
      <alwatr-surface class="detail-container">
        ${orderList}
      </alwatr-surface>
    `;
  }

  protected _renderOrder(order: Order): unknown {
    return html`
      <div class="order-info">
        <div>
          <span>${message('order_id')}:‌</span>
          <span>${order.id}</span>
        </div>
        <div>
          <span>${message('order_date')}:‌</span>
          <span>${date(order.meta?.created ?? Date.now())}</span>
        </div>
        <div>
          <span>${message('order_status')}:‌</span>
          <span>${message('order_status_' + order.status)}</span>
        </div>
      </div>
    `;
  }
}
