import {
  customElement,
  AlwatrSmartElement,
  css,
  html,
  state,
  LocalizeMixin,
  mapObject,
} from '@alwatr/element';
import {message, replaceNumber} from '@alwatr/i18n';

import {orderStorageContextConsumer} from './context.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Order} from '@alwatr/type/src/customer-order-management.js';
import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';
import type {TopAppBarContent} from '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';
import './app-footer';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-list': AlwatrPageOrderList;
  }
}

/**
 * Alwatr Customer Order Management Order List Page
 */
@customElement('alwatr-page-order-list')
export class AlwatrPageOrderList extends LocalizeMixin(AlwatrSmartElement) {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    main {
      display: block;
      flex-grow: 1;
      padding: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track));
      overflow-y: auto;
    }

    alwatr-icon-box {
      margin-bottom: var(--sys-spacing-track);
    }
  `;

  @state()
    orderStorage?: AlwatrDocumentStorage<Order>;

  override connectedCallback(): void {
    super.connectedCallback();
    this._signalListenerList.push(
        orderStorageContextConsumer.subscribe((orderStorage) => {
          this.orderStorage = orderStorage;
        }),
    );
  }

  override render(): unknown {
    this._logger.logMethod('render');
    const topAppBar:TopAppBarContent = {
      type: 'medium',
      headline: message('page_order_list_headline'),
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
      tinted: 2,
    };

    return html`
      <alwatr-top-app-bar .content=${topAppBar}></alwatr-top-app-bar>
      <main>${mapObject(this, this.orderStorage?.data, this._orderItemTemplate, message('loading'))}</main>
      <alwatr-app-footer></alwatr-app-footer>
    `;
  }

  protected _orderItemTemplate(order: Order): unknown {
    const content: IconBoxContent = {
      stated: true,
      tinted: 1,
      icon: 'receipt-outline',
      flipRtl: true,
      headline: message('order_item_headline').replace('${orderId}', replaceNumber(order.id.padStart(2, '0'))),
      description: message('order_item_status') + ': ' + message('order_status_' + order.status),
      href: '/order/' + order.id,
    };
    return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
  }
}
