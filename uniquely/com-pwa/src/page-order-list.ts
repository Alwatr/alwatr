import {
  customElement,
  AlwatrSmartElement,
  css,
  html,
  state,
  LocalizeMixin,
  map,
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

  constructor() {
    super();
    this._orderItemTemplate = this._orderItemTemplate.bind(this);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this._signalListenerList.push(
        orderStorageContextConsumer.subscribe((orderStorage) => {
          this.orderStorage = orderStorage;
          console.warn(orderStorage);
        }),
    );
  }

  protected content = {
    topAppBar: <TopAppBarContent>{
      type: 'medium',
      headline: 'page_order_list_headline',
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
    },
  } as const;

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      <alwatr-top-app-bar
        .content=${{...this.content.topAppBar, headline: message(this.content.topAppBar.headline)}}
      ></alwatr-top-app-bar>
      <main>${this.orderStorage == null
          ? message('loading')
          : map(Object.keys(this.orderStorage.data), this._orderItemTemplate)}</main>
      <alwatr-app-footer></alwatr-app-footer>
    `;
  }

  protected _orderItemTemplate(orderId: string): unknown {
    if (this.orderStorage == null) return;
    const order = this.orderStorage.data[orderId];
    const content: IconBoxContent = {
      stated: true,
      elevated: 1,
      icon: 'receipt-outline',
      flipRtl: true,
      headline: message('order_item_headline').replace('${orderId}', replaceNumber(order.id.padStart(2, '0'))),
      description: message('order_item_status') + ': ' + message('order_status_' + order.status),
      href: '/order/' + order.id,
    };
    return html`<alwatr-icon-box .content=${content}></alwatr-icon-box>`;
  }
}
