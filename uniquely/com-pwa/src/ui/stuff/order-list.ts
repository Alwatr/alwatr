import {
  customElement,
  AlwatrBaseElement,
  html,
  property,
  css,
  mapObject,
  type PropertyValues,
} from '@alwatr/element';
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
    content?: AlwatrDocumentStorage<Order> | null;

  @property({attribute: 'order-click-signal-id'})
    orderClickSignalId?: string;

  protected override shouldUpdate(changedProperties: PropertyValues<this>): boolean {
    return super.shouldUpdate(changedProperties) && this.content != null;
  }

  override render(): unknown {
    this._logger.logMethod('render');
    if (this.content == null) return;

    return mapObject(this, this.content.data, (order) => {
      return html`<alwatr-order-status-box
        .content=${order}
        .clickSignalId=${this.orderClickSignalId}
      ></alwatr-order-status-box>`;
    });
  }
}
