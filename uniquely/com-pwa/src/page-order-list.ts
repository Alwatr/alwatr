import {
  customElement,
  css,
  html,
  state,
  LocalizeMixin,
  mapObject,
  SignalMixin,
  AlwatrBaseElement,
} from '@alwatr/element';
import {message, replaceNumber} from '@alwatr/i18n';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

import './app-footer';
import {orderStorageContextConsumer, topAppBarContextProvider} from './context.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Order} from '@alwatr/type/customer-order-management.js';
import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-list': AlwatrPageOrderList;
  }
}

/**
 * Alwatr Customer Order Management Order List Page
 */
@customElement('alwatr-page-order-list')
export class AlwatrPageOrderList extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: block;
      padding: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }

    :host > * {
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
          this.requestUpdate();
        }),
    );

    topAppBarContextProvider.setValue({
      type: 'small',
      headline: message('page_order_list_headline'),
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
      tinted: 2,
    });
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return mapObject(this, this.orderStorage?.data, this._orderItemTemplate, message('loading'));
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
