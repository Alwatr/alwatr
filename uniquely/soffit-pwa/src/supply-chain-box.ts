import {customElement, html, state} from '@alwatr/element';
import {message} from '@alwatr/i18n';

import {AlwatrLotteryBox} from './lottery-box.js';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

import './supply-chain-form.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-supply-chain-box': AlwatrSupplyChainBox;
  }
}

/**
 * Soffit supply chain box element
 */
@customElement('alwatr-supply-chain-box')
export class AlwatrSupplyChainBox extends AlwatrLotteryBox {
  @state() override iconBoxContent: IconBoxContent = {
    icon: 'infinite-outline',
    headline: message('supply_chain_form_title'),
    elevated: 2,
  };

  protected override _boxContentTemplate(): unknown {
    if (this.expanded) {
      return html`<alwatr-supply-chain-form
        id="form"
        invisible
        @form-submitted=${this._formSubmitted}
        @form-canceled=${this._formCanceled}
      ></alwatr-supply-chain-form>`;
    }

    else if (this.submitted) {
      return html`<span class="success">${message('information_saved')}</span>`;
    }

    else {
      return html`${message('supply_chain_form_title')}`;
    }
  }
}
