import {customElement, html, mapObject} from '@alwatr/element';
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

  protected override _inputTemplate(): unknown {
    this._logger.logMethod?.('inputTemplate');

    const textFieldContentRecord = {
      name: {
        type: 'text',
        name: 'name',
        placeholder: message('full_name'),
      },
      phone: {
        type: 'tel',
        name: 'phone',
        placeholder: message('phone_number'),
      },
      code: {
        type: 'text',
        name: 'activity',
        placeholder: message('activity_area'),
      },
    };
    return [
      mapObject(this, textFieldContentRecord, (textFieldContent) => {
        return html`
          <alwatr-text-field .content=${textFieldContent} outlined active-outline stated></alwatr-text-field>
        `;
      })];
  }
}
