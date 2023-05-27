import {
  AlwatrBaseElement,
  LocalizeMixin,
  SignalMixin,
  css,
  customElement,
  html,
  property,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';

import type {ComUserIncOrder} from '@alwatr/type/customer-order-management.js';
import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';


declare global {
  interface HTMLElementTagNameMap {
    'alwatr-user-inc-order-box': AlwatrUserInfoBox;
  }
}

/**
 * Alwatr User Include Order Box Element.
 */
@customElement('alwatr-user-info-box')
export class AlwatrUserInfoBox extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: block;
    }

    .bold-text {
      font-weight: var(--ref-font-weight-bold);
    }
  `;

  @property()
    userIncOrder?: ComUserIncOrder;

  override render(): unknown {
    this._logger.logMethod?.('render');
    if (this.userIncOrder == null) return;

    const userProfileIconBox: IconBoxContent = {
      tinted: 1,
      headline: this.userIncOrder.fullName,
      icon: 'person-circle-outline',
    };

    return html`
      <alwatr-icon-box .content=${userProfileIconBox}>
        <span>${message('phone_number')}:‌
          <span class="bold-text" dir="ltr">+${this.userIncOrder.phoneNumber}</span>
        </span><br />
        <span>${message('province')}:‌ ${this.userIncOrder.province}</span><br />
        <span>${message('city')}:‌ ${this.userIncOrder.city}</span><br />
        <div class="break"></div>

        ${this._renderOrderListIncOrder()}
      </alwatr-icon-box>
    `;
  }

  protected _renderOrderListIncOrder(): unknown {
    return html``;
  }
}
