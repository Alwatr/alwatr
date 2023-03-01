import {customElement, AlwatrBaseElement, html, property, nothing, css} from '@alwatr/element';
import {message, replaceNumber} from '@alwatr/i18n';
import {eventTrigger} from '@alwatr/signal';
import '@alwatr/ui-kit/card/icon-box.js';

import type {ClickSignalType} from '@alwatr/type';
import type {OrderDraft, Order} from '@alwatr/type/customer-order-management.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-order-item-box': AlwatrOrderIconBox;
  }
}

/**
 * Alwatr Order Item Box Element.
 */
@customElement('alwatr-order-item-box')
export class AlwatrOrderIconBox extends AlwatrBaseElement {
  static override styles = css`
  :host {
    display: block;
  }
  `;

  @property({attribute: false})
    order?: Order | OrderDraft | null;

  @property({attribute: 'click-signal-id'})
    clickSignalId?: string;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._click);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._click);
  }

  protected _click(event: MouseEvent): void {
    if (this.order == null) return;
    this._logger.logMethodArgs('_click', {signalId: this.clickSignalId, click: this.clickSignalId});
    if (this.clickSignalId) {
      eventTrigger.dispatch<ClickSignalType<Order | OrderDraft>>(this.clickSignalId, {
        x: event.clientX,
        y: event.clientY,
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        detail: this.order,
      });
    }
  }

  override render(): unknown {
    this._logger.logMethod('render');
    if (this.order == null) return nothing;

    return html`
    <alwatr-icon-box .content=${{
    stated: true,
    tinted: 1,
    elevated: 1,
    icon: 'receipt-outline',
    flipRtl: true,
    headline: message('order_item_headline').replace('${orderId}', replaceNumber(this.order.id.padStart(2, '0'))),
    description: message('order_item_status') + ': ' + message('order_status_' + this.order.status),
  }}></alwatr-icon-box>
    `;
  }
}
