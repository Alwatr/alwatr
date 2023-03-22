import {
  customElement,
  css,
  html,
  property,
  LocalizeMixin,
  SignalMixin,
  AlwatrBaseElement,
  mapObject,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import {submitFormCommandTrigger} from '../../manager/context.js';

import type {RadioGroupOptions} from '@alwatr/ui-kit/radio-group/radio-group.js';
import type {AlwatrTextField} from '@alwatr/ui-kit/text-field/text-field.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-lottery-form': AlwatrLotteryForm;
  }
}

/**
 * Soffit lottery form element
 *
 * @attr {Boolean} invisible
 */
@customElement('alwatr-lottery-form')
export class AlwatrLotteryForm extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static formId = 'lottery';

  get _radioGroupOptions(): RadioGroupOptions {
    return {
      title: message('activity_type'),
      radioGroup: [
        {label: message('tile_player'), value: 'tile_player'},
        {label: message('tile_installer'), value: 'tile_installer'},
        {label: message('seller_shopkeeper'), value: 'seller_shopkeeper'},
        {label: message('contractor'), value: 'contractor'},
        {label: message('manufacturer'), value: 'manufacturer'},
        {label: message('other'), value: 'other'},
      ],
    };
  }

  static override styles = css`
    :host {
      display: block;
      transition: opacity var(--sys-motion-duration-medium) var(--sys-motion-easing-normal);
    }

    :host([disabled]) {
      pointer-events: none;
      opacity: var(--sys-surface-disabled-opacity);
    }

    alwatr-text-field {
      display: block;
      margin-top: var(--sys-spacing-track);
    }
    alwatr-text-field:first-of-type {
      margin-top: 0;
    }

    :host([invisible]) * {
      opacity: 0;
    }

    .button-container {
      display: flex;
      flex-direction: row-reverse;
      gap: var(--sys-spacing-track);
      margin-top: var(--sys-spacing-track);
    }
  `;

  @property({type: Boolean, reflect: true})
    disabled = false;

  protected async submit(): Promise<void> {
    const bodyJson = this.getFormData();
    this._logger.logMethodArgs?.('submit', bodyJson);

    this.disabled = true;

    const response = await submitFormCommandTrigger.requestWithResponse({
      formId: (this.constructor as typeof AlwatrLotteryForm).formId,
      data: bodyJson,
    });

    if (response) {
      this.dispatchEvent(new CustomEvent('form-submitted'));
    }
    else {
      this.disabled = false;
    }
  }

  protected async cancel(): Promise<void> {
    this.dispatchEvent(new CustomEvent('form-canceled'));
  }

  protected getFormData(): Record<string, string | number | boolean> {
    this._logger.logMethod?.('getFormData');
    const data: Record<string, string> = {};
    for (const inputElement of this.renderRoot.querySelectorAll<AlwatrTextField>(
        'alwatr-text-field,alwatr-radio-group',
    )) {
      if (inputElement.content == null) continue;
      data[inputElement.content.name] = inputElement.content.value;
    }
    return data;
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return [this.inputTemplate(), this.partButtonTemplate()];
  }

  protected inputTemplate(): unknown {
    this._logger.logMethod?.('render');

    const textFieldContentRecord = {
      code: {
        type: 'number',
        name: 'code',
        placeholder: message('lottery_code'),
      },
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
    };
    return [
      mapObject(this, textFieldContentRecord, (textFieldContent) => {
        return html`
          <alwatr-text-field .content=${textFieldContent} outlined active-outline stated></alwatr-text-field>
        `;
      }),
      html` <alwatr-radio-group .name=${'activity'} .options=${this._radioGroupOptions}></alwatr-radio-group> `,
    ];
  }

  protected partButtonTemplate(): unknown {
    return html`
      <div class="button-container">
        <alwatr-button .content=${{labelKey: 'submit_form'}} @click=${this.submit} outlined></alwatr-button>
        <alwatr-button .content=${{labelKey: 'cancel'}} @click=${this.cancel}></alwatr-button>
      </div>
    `;
  }

  async animateExpand(): Promise<void> {
    for (const element of this.renderRoot.querySelectorAll<HTMLElement>('*')) {
      element.style.opacity = '1';
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  async animateCollapse(): Promise<void> {
    for (const element of [...this.renderRoot.querySelectorAll<HTMLElement>('*')].reverse()) {
      element.style.opacity = '0';
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
  }
}
