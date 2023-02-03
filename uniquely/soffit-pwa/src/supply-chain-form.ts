import {customElement, html} from '@alwatr/element';

import {AlwatrLotteryForm} from './lottery-form.js';

import '@alwatr/ui-kit/text-field/text-field.js';
import '@alwatr/ui-kit/button/button.js';
import './tech-dep/radio-group.js';

import type {JsonSchema} from '@alwatr/validator';


declare global {
  interface HTMLElementTagNameMap {
    'alwatr-supply-chain-form': AlwatrSupplyChainForm;
  }
}

/**
 * Soffit lottery form element
 *
 * @attr {Boolean} invisible
 */
@customElement('alwatr-supply-chain-form')
export class AlwatrSupplyChainForm extends AlwatrLotteryForm {
  static override formId = 'supply-chain';

  static override validSchema: JsonSchema = {
    name: String,
    phone: Number,
    activity: String,
  };

  override render(): unknown {
    super.render();
    return html`
      <alwatr-text-field
        name="name"
        type="text"
        outlined
        active-outline
        stated
        placeholder="نام و نام‌خانوادگی"
      ></alwatr-text-field>
      <alwatr-text-field
        name="phone"
        type="tel"
        outlined
        active-outline
        stated
        placeholder="شماره تماس"
      ></alwatr-text-field>
      <alwatr-text-field
        name="activity"
        type="text"
        outlined
        active-outline
        stated
        placeholder="حوزه فعالیت"
      ></alwatr-text-field>
      <div class="button-container">
        <alwatr-button outlined @click=${this.submit}>ارسال فرم</alwatr-button>
        <alwatr-button @click=${this.cancel}>انصراف</alwatr-button>
      </div>
    `;
  }
}
