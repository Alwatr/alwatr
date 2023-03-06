import {customElement, html} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import {AlwatrLotteryForm} from './lottery-form.js';

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

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      <alwatr-text-field
        .name=${'name'}
        .type=${'text'}
        .placeholder=${message('full_name')}
        outlined
        active-outline
        stated
      ></alwatr-text-field>
      <alwatr-text-field
        .name=${'phone'}
        .type=${'tel'}
        .placeholder=${message('phone_number')}
        outlined
        active-outline
        stated
      ></alwatr-text-field>
      <alwatr-text-field
        .name=${'activity'}
        .type=${'text'}
        .placeholder=${message('activity_area')}
        outlined
        active-outline
        stated
      ></alwatr-text-field>
      <div class="button-container">
        <alwatr-button outlined @click=${this.submit}>${message('submit_form')}</alwatr-button>
        <alwatr-button @click=${this.cancel}>${message('cancel')}</alwatr-button>
      </div>
    `;
  }
}
