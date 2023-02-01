import {customElement, AlwatrSmartElement, css, html, property} from '@alwatr/element';
import {serviceRequest} from '@alwatr/fetch';
import {showSnackbar} from '@alwatr/ui-kit/snackbar/show-snackbar.js';
import {validator, type JsonSchema} from '@alwatr/validator';

import {config} from './config.js';

import type {AlwatrTextField} from '@alwatr/ui-kit/text-field/text-field.js';

import '@alwatr/ui-kit/text-field/text-field.js';
import '@alwatr/ui-kit/button/button.js';
import './tech-dep/radio-group.js';


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
export class AlwatrSupplyChainForm extends AlwatrSmartElement {
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
      margin-top: var(--sys-spacing-track);
      display: flex;
      flex-direction: row-reverse;
      gap: var(--sys-spacing-track);
    }
  `;

  @property({type: Boolean, reflect: true})
    disabled = false;

  static validSchema: JsonSchema = {
    name: String,
    phone: Number,
    activity: String,
  };

  async submit(): Promise<void> {
    let bodyJson = this.getFormData();
    this._logger.logMethodArgs('submit', bodyJson);

    try {
      bodyJson = validator(AlwatrSupplyChainForm.validSchema, bodyJson);
    }
    catch (err) {
      this._logger.error('submit', 'invalid_form_data', (err as Error).cause);
      showSnackbar({message: 'اطلاعات فرم صحیح نمی‌باشد.'});
      return;
    }

    this.disabled = true;
    try {
      await serviceRequest({
        method: 'PUT',
        url: config.api + '/form/',
        queryParameters: {
          storage: 'supply-chain',
        },
        token: config.token,
        bodyJson,
      });
    }
    catch (err) {
      this._logger.error('submit', 'request_failed', (err as Error).cause);
      this.disabled = false;
      showSnackbar({message: 'لطفا از اتصال خود به اینترنت اطمینان حاصل فرمایید و مجددا ارسال کنید.'});
      return;
    }

    this.dispatchEvent(new CustomEvent('form-submitted'));
  }

  async cancel(): Promise<void> {
    this.dispatchEvent(new CustomEvent('form-canceled'));
  }

  getFormData(): Record<string, unknown> {
    this._logger.logMethod('getFormData');
    const data: Record<string, string> = {};
    for (const inputElement of this.renderRoot.querySelectorAll<AlwatrTextField>(
        'alwatr-text-field',
    )) {
      data[inputElement.name] = inputElement.value;
    }
    return data;
  }

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
        <alwatr-button elevated filled @click=${this.submit}>ارسال فرم</alwatr-button>
        <alwatr-button @click=${this.cancel}>انصراف</alwatr-button>
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
