import {serverContextConsumer} from '@alwatr/context';
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
import {eventTrigger} from '@alwatr/signal';
import '@alwatr/ui-kit/card/icon-box.js';

import {config} from '../../config.js';

import type {AlwatrDocumentStorage, ClickSignalType} from '@alwatr/type';
import type {ComUser, Order} from '@alwatr/type/customer-order-management.js';
import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';


declare global {
  interface HTMLElementTagNameMap {
    'alwatr-user-info-box': AlwatrUserInfoBox;
  }
}

/**
 * Alwatr User Item Box Element.
 */
@customElement('alwatr-user-info-box')
export class AlwatrUserInfoBox extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: block;
    }
  `;

  protected orderListFsm = serverContextConsumer<AlwatrDocumentStorage<Order>>(
      'order_storage_context_' + this.content?.id,
      {
        url: config.api + '/storage/order-list/' + this.content?.id,
      },
  );

  @property({attribute: false})
    content?: ComUser | null;

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
      eventTrigger.dispatch<ClickSignalType<ComUser>>(this.clickSignalId, {
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
    if (!this.content) return;

    const iconBoxContent: IconBoxContent = {
      headline: `نماینده ${this.content.phoneNumber}`,
      icon: 'receipt-outline',
      flipRtl: true,
      stated: Boolean(this.clickSignalId),
      elevated: 1,
    };

    return html`
      <alwatr-icon-box .content=${iconBoxContent}>
        ${'نماینده' + ': ' + this.content.fullName}
      </alwatr-icon-box>
    `;
  }
}
