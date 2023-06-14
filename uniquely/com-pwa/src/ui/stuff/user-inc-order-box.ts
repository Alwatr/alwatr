import {
  AlwatrBaseElement,
  LocalizeMixin,
  SignalMixin,
  css,
  customElement,
  html,
  mapIterable,
  property,
} from '@alwatr/element';
import {date, message} from '@alwatr/i18n';
import {url} from '@alwatr/router';

import type {ComUserIncOrder, Order} from '@alwatr/type/customer-order-management.js';
import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-user-inc-order-box': alwatrUserIncOrderBox;
  }
}

/**
 * Alwatr User Include Order Box Element.
 */
@customElement('alwatr-user-inc-order-box')
export class alwatrUserIncOrderBox extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: block;
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

    .order-container {
      padding: 0;
    }

    .order-info {
      padding: calc(2 * var(--sys-spacing-track));
      cursor: pointer;
    }

    .order-info:hover {
      background-color: var(--sys-color-surface-variant);
      color: var(--sys-color-on-surface-variant);
    }

    .empty-order {
      padding: calc(2 * var(--sys-spacing-track));
    }

    a {
      display: block;
      color: inherit;
      text-decoration: none;
    }
  `;

  @property()
    userIncOrder?: ComUserIncOrder;

  override render(): unknown {
    this._logger.logMethod?.('render');
    const userProfileIconBox: IconBoxContent = {
      tinted: 1,
      headline: this.userIncOrder?.fullName ?? '',
      icon: 'person-circle-outline',
    };

    return html`
      <alwatr-icon-box .content=${userProfileIconBox}>
        <div class="detail-container">
          <div>
            <span>${message('page_admin_order_list_phone_number')}: </span>
            <span dir="ltr">+${this.userIncOrder?.phoneNumber}</span>
          </div>
          <div>
            <span>${message('page_admin_order_list_province')}: </span>
            <span>${this.userIncOrder?.province}</span>
          </div>
          <div>
            <span>${message('page_admin_order_list_city')}: </span>
            <span>${this.userIncOrder?.city}</span>
          </div>
        </div>
        ${this._renderOrderBox()}
      </alwatr-icon-box>
    `;
  }

  protected _renderOrderBox(): unknown {
    let orderListTemplate;
    const orderListValues = Object.values(this.userIncOrder?.orderList ?? {});
    if (orderListValues.length === 0) {
      orderListTemplate = html`
      <span class="empty-order">
        ${message('page_admin_order_list_empty_order_list')}
      <span>`;
    }
    else {
      const orderList = orderListValues.sort((o1, o2) => {
        return (o2.meta?.updated || 0) - (o1.meta?.updated || 0);
      });

      orderListTemplate = mapIterable(this, orderList, (order) => this._renderOrderInfo(order));
    }

    return html`
      <h3>${message('page_admin_order_list_order_list')}:</h3>
      <alwatr-surface class="detail-container order-container"> ${orderListTemplate} </alwatr-surface>
    `;
  }

  protected _renderOrderInfo(order: Order): unknown {
    return html`
      <a class="order-info" href=${url({sectionList: ['admin-order', this.userIncOrder!.id, order.id]})}>
        <div>
          <span>${message('page_admin_order_list_order_id')}:</span>
          <span>${order.id}</span>
        </div>
        <div>
          <span>${message('page_admin_order_list_order_date')}:</span>
          <span>${order.meta?.created ? date(order.meta?.created) : ''}</span>
        </div>
        <div>
          <span>${message('page_admin_order_list_order_status')}:</span>
          <span>${message('order_status_' + order.status)}</span>
        </div>
      </a>
    `;
  }
}
