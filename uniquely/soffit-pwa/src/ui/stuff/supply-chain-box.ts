import {customElement, html} from '@alwatr/element';
import {message} from '@alwatr/i18n';

import {AlwatrLotteryBox} from './lottery-box.js';
import './supply-chain-form.js';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

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
  protected override get _iconBoxContent(): IconBoxContent {
    return {
      icon: 'gift-outline',
      headline: message('supply_chain_form_title'),
      elevated: 1,
      stated: !this.expanded,
      highlight: !this.expanded && !this.submitted,
    };
  }

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
      return html`<span class="success">${message('form_submitted')}</span>`;
    }

    else {
      return html`${message('supply_chain_form_description')}`;
    }
  }
}
