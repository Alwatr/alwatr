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
    orderStorage?: AlwatrDocumentStorage<Order> | null;

  @property({attribute: 'order-click-signal-id'})
    orderClickSignalId?: string;

  override render(): unknown {
    this._logger.logMethod('render');
    if (this.orderStorage == null) return nothing;

    return mapObject(this, this.orderStorage.data, (order) => {
      return html`<alwatr-order-status-box
        order-click-signal-id=${ifDefined(this.orderClickSignalId)}
        .order=${order}
      ></alwatr-order-status-box>`;
    });
  }
}
