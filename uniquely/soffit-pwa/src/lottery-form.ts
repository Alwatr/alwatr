import {customElement, css, html, property, LocalizeMixin, SignalMixin, AlwatrBaseElement} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import {submitFormCommandTrigger} from './context.js';

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

  async submit(): Promise<void> {
    const bodyJson = this.getFormData();
    this._logger.logMethodArgs('submit', bodyJson);

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

  async cancel(): Promise<void> {
    this.dispatchEvent(new CustomEvent('form-canceled'));
  }

  getFormData(): Record<string, string | number | boolean> {
    this._logger.logMethod('getFormData');
    const data: Record<string, string> = {};
    for (const inputElement of this.renderRoot.querySelectorAll<AlwatrTextField>(
        'alwatr-text-field,alwatr-radio-group',
    )) {
      data[inputElement.name] = inputElement.value as string;
    }
    return data;
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      <alwatr-text-field
        .name=${'code'}
        .type=${'number'}
        .placeholder=${message('lottery_code')}
        outlined
        active-outline
        stated
      ></alwatr-text-field>
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
        outlined
        active-outline
        stated
        .placeholder=${message('phone_number')}
      ></alwatr-text-field>
      <alwatr-radio-group
        .name=${'activity'}
        .options=${this._radioGroupOptions}
      ></alwatr-radio-group>
      <div class="button-container">
        <alwatr-button outlined @click=${this.submit}>${message('submit_form')}</alwatr-button>
        <alwatr-button @click=${this.cancel}>${message('cancel')}</alwatr-button>
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
