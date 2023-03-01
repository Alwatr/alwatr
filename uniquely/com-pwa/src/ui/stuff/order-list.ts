import {customElement, AlwatrBaseElement, html, property, nothing, css, mapObject, ifDefined} from '@alwatr/element';
import '@alwatr/ui-kit/card/icon-box.js';

import './order-status-box.js';

import type {AlwatrDocumentStorage} from '@alwatr/type';
import type {Order} from '@alwatr/type/customer-order-management.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-order-list': AlwatrOrderList;
  }
}

/**
 * Alwatr Order List Element.
 */
@customElement('alwatr-order-list')
export class AlwatrOrderList extends AlwatrBaseElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host > * {
      margin-bottom: var(--sys-spacing-track);
    }
  `;

  @property({attribute: false})
    storage?: AlwatrDocumentStorage<Order> | null;

  @property({attribute: 'order-click-signal-id'})
    orderClickSignalId?: string;

  override render(): unknown {
    this._logger.logMethod('render');
    if (this.storage == null) return nothing;

    return mapObject(this, this.storage.data, (order) => {
      return html`<alwatr-order-status-box
        click-signal-id=${ifDefined(this.orderClickSignalId)}
        .content=${order}
      ></alwatr-order-status-box>`;
    });
  }
}
