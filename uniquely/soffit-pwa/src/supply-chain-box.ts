import {customElement, html} from '@alwatr/element';

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
  protected static override iconBoxContent: IconBoxContent = {
    icon: 'infinite-outline',
    headline: 'زنجیره تامین',
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
      return html`<span class="success">اطلاعات شما با موفقیت ذخیره شد.</span>`;
    }

    else {
      return html`فرم ثبت‌‌نام در زنجیره تامین`;
    }
  }
}
