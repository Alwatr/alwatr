import {customElement, css, html, LocalizeMixin, AlwatrBaseElement, SignalMixin, property} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import {topAppBarContextProvider} from '../context.js';

import type {OrderDraft} from '@alwatr/type/customer-order-management.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-tracking': AlwatrPageOrderTracking;
  }
}

/**
 * Tracking an order with support chat.
 */
@customElement('alwatr-page-order-tracking')
export class AlwatrPageOrderTracking extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: block;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }
  `;

  @property({attribute: false})
    order?: OrderDraft | null;

  override connectedCallback(): void {
    super.connectedCallback();

    topAppBarContextProvider.setValue({
      type: 'medium',
      headline: message('page_order_tracking_headline'),
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
      tinted: 2,
    });
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      order tracking
    `;
  }
}