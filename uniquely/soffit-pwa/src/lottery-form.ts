import {customElement, css, html, property, AlwatrSmartElement, state, DirectionMixin} from '@alwatr/element';
import {serviceRequest} from '@alwatr/fetch';
import {message} from '@alwatr/i18n';
import {snackbarSignalTrigger} from '@alwatr/ui-kit/snackbar/show-snackbar.js';
import {validator, type JsonSchema} from '@alwatr/validator';

import {config} from './config.js';


import type {AlwatrTextField} from '@alwatr/ui-kit/text-field/text-field.js';

import '@alwatr/ui-kit/text-field/text-field.js';
import '@alwatr/ui-kit/button/button.js';
import './tech-dep/radio-group.js';

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
export class AlwatrLotteryForm extends DirectionMixin(AlwatrSmartElement) {
  static formId = 'lottery';

  @state() protected _radioGroupContent = {
    title: message('activity_type'),
    radioGroup: [
      {label: message('tile_player')},
      {label: message('tile_installer')},
      {label: message('seller_shopkeeper')},
      {label: message('contractor')},
      {label: message('manufacturer')},
      {label: message('other')},
    ],
  };

  static validSchema: JsonSchema = {
    code: String,
    name: String,
    phone: Number,
    activity: String,
  };

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
    let bodyJson = this.getFormData();
    this._logger.logMethodArgs('submit', bodyJson);

    try {
      bodyJson = validator<Record<string, string | number>>(
          (this.constructor as typeof AlwatrLotteryForm).validSchema,
          bodyJson,
      );
    }
    catch (err) {
      this._logger.accident('submit', 'invalid_form_data', 'validator failed on form data', (err as Error).cause);
      snackbarSignalTrigger.request({message: message('invalid_form_data')});
      return;
    }

    this.disabled = true;
    try {
      await serviceRequest({
        method: 'PUT',
        url: config.api + '/form/',
        queryParameters: {
          form: (this.constructor as typeof AlwatrLotteryForm).formId,
        },
        token: config.token,
        bodyJson,
      });
    }
    catch (err) {
      this._logger.error('submit', 'request_failed', (err as Error).cause);
      this.disabled = false;
      snackbarSignalTrigger.request({message: message('check_network_connection')});
      return;
    }

    this.dispatchEvent(new CustomEvent('form-submitted'));
  }

  async cancel(): Promise<void> {
    this.dispatchEvent(new CustomEvent('form-canceled'));
  }

  getFormData(): Record<string, string | number | boolean | undefined> {
    this._logger.logMethod('getFormData');
    const data: Record<string, string> = {};
    for (const inputElement of this.renderRoot.querySelectorAll<AlwatrTextField>(
        'alwatr-text-field,alwatr-radio-group',
    )) {
      data[inputElement.name] = inputElement.value;
    }
    return data;
  }

  override render(): unknown {
    super.render();
    return html`
      <alwatr-text-field
        name="code"
        type="number"
        outlined
        active-outline
        stated
        placeholder=${message('lottery_number')}
      ></alwatr-text-field>
      <alwatr-text-field
        name="name"
        type="text"
        outlined
        active-outline
        stated
        placeholder=${message('first_and_last_name')}
      ></alwatr-text-field>
      <alwatr-text-field
        name="phone"
        type="tel"
        outlined
        active-outline
        stated
        placeholder=${message('phone_number')}
      ></alwatr-text-field>
      <alwatr-radio-group name="activity" .content=${this._radioGroupContent}></alwatr-radio-group>
      <div class="button-container">
        <alwatr-button outlined @click=${this.submit}>${message('send_form')}</alwatr-button>
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
