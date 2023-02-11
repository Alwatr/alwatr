import {customElement, AlwatrSmartElement, css, html, unsafeHTML, state, nothing} from '@alwatr/element';
import {message} from '@alwatr/i18n';

import {orderStorageContextConsumer, orderListPageContentContextConsumer} from './context.js';

import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

import type {BoxType, PageOrderListContent} from './type.js';
import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Order} from '@alwatr/type/src/customer-order-management.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-list': AlwatrPageOrderList;
  }
}

/**
 * Soffit Order List Page
 */
@customElement('alwatr-page-order-list')
export class AlwatrPageOrderList extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
    }

    main {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      gap: var(--sys-spacing-track);
    }

    alwatr-icon-box {
      width: 40%;
      flex-grow: 1;
    }

    alwatr-icon-box[wide] {
      width: 100%;
    }

    footer {
      direction: ltr;
      text-align: center;
      color: var(--sys-color-on-secondary-container);
      padding: calc(2 * var(--sys-spacing-track)) var(--sys-spacing-track) var(--sys-spacing-track);
      background-color: var(--sys-color-secondary-container);
    }

    .version {
      font-size: var(--sys-typescale-label-small-font-size);
      line-height: var(--sys-typescale-label-small-line-height);
      letter-spacing: var(--sys-typescale-label-small-letter-spacing);
      opacity: 0.4;
      user-select: none;
      -webkit-user-select: none;
    }
  `;

  @state() content?: PageOrderListContent;
  @state() orderList?: AlwatrDocumentStorage<Order>;

  override connectedCallback(): void {
    super.connectedCallback();

    this._signalListenerList.push(
        orderListPageContentContextConsumer.subscribe((content) => {this.content = content;}),
        orderStorageContextConsumer.subscribe((orderList) => {this.orderList = orderList;}),
    );
  }

  override render(): unknown {
    this._logger.logMethod('render');
    if (this.content == null) return nothing;
    return html`
      <alwatr-top-app-bar .content=${this.content.topAppBar}></alwatr-top-app-bar>
      <main>${this._orderListTemplate()}</main>
      <footer>
        <div>A good ceiling is vital.<br />a SOFFIT ceiling can be an inspiration.</div>
        <div class="version">Soffit Order Management v${_ALWATR_VERSION_}</div>
      </footer>
    `;
  }

  protected* _orderListTemplate(): unknown {
    if (this.orderList == null) return;
    for (const orderListKey of Object.keys(this.orderList.data)) {
      const order = this.orderList.data[orderListKey];
      const headline = 'سفارش - ' + order.id;
      const description = 'وضعیت:‌ ' + message('order_status_' + order.status as Lowercase<string>);
      yield this._boxTemplate({
        highlight: true,
        stated: true,
        elevated: 2,
        headline: headline,
        description: description,
      });
    }
  }

  protected _boxTemplate(box: BoxType): unknown {
    const slot = box.slot == null ? nothing : unsafeHTML(box.slot);
    return html`<alwatr-icon-box .content=${box} ?wide=${box.wide}>${slot}</alwatr-icon-box>`;
  }
}
