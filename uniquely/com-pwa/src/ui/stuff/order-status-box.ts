import {
  customElement,
  AlwatrBaseElement,
  html,
  property,
  css,
  SignalMixin,
  LocalizeMixin,
  type PropertyValues,
} from '@alwatr/element';
import {message, replaceNumber, date} from '@alwatr/i18n';
import {eventTrigger} from '@alwatr/signal';
import '@alwatr/ui-kit/card/icon-box.js';

import type {ClickSignalType} from '@alwatr/type';
import type {OrderDraft, Order} from '@alwatr/type/customer-order-management.js';
import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-order-status-box': AlwatrOrderStatusBox;
  }
}

/**
 * Alwatr Order Item Box Element.
 */
@customElement('alwatr-order-status-box')
export class AlwatrOrderStatusBox extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: block;
    }
  `;

  @property({attribute: false})
    content?: Order | OrderDraft | null;

  @property({attribute: 'click-signal-id'})
    clickSignalId?: string;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._onClickEvent);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._onClickEvent);
  }

  private _onClickEvent(event: MouseEvent): void {
    this._logger.logMethodArgs?.('click', {clickSignalId: this.clickSignalId});
    if (this.content && this.clickSignalId) {
      eventTrigger.dispatch<ClickSignalType<Order | OrderDraft>>(this.clickSignalId, {
        x: event.clientX,
        y: event.clientY,
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        detail: this.content,
      });
    }
  }

  protected override shouldUpdate(changedProperties: PropertyValues<this>): boolean {
    return super.shouldUpdate(changedProperties) && this.content != null;
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    const content = this.content;

    const headline =
      content?.status === 'draft'
        ? message('order_status_box_headline_new')
        : message('order_status_box_headline').replace('${orderId}', replaceNumber(content?.id.padStart(2, '0') ?? ''));

    const iconBoxContent: IconBoxContent = {
      headline,
      icon: 'receipt-outline',
      flipRtl: true,
      stated: Boolean(this.clickSignalId),
      elevated: 1,
    };

    const createdAt = date(new Date(content?.meta?.created ?? 0));

    return html`
      <alwatr-icon-box .content=${iconBoxContent}>
        ${message('order_status_box_status') + ': ' + message('order_status_' + content?.status)} <br />
        ${message('order_status_box_created') + ': ' + createdAt}
      </alwatr-icon-box>
    `;
  }
}
