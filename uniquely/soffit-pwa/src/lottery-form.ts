import {customElement, AlwatrSmartElement, css, html, property} from '@alwatr/element';
// import {fetch} from '@alwatr/fetch';

// import {config} from './tech-dep/config.js';

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
 */
@customElement('alwatr-lottery-form')
export class AlwatrLotteryForm extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: block;
      transition: opacity var(--sys-motion-duration-small) var(--sys-motion-easing-linear);
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

    fieldset {
      display: block;
      padding: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track));
      font-family: var(--sys-typescale-body-large-font-family-name);
      font-weight: var(--sys-typescale-body-large-font-weight);
      font-size: var(--sys-typescale-body-large-font-size);
      letter-spacing: var(--sys-typescale-body-large-letter-spacing);
      line-height: var(--sys-typescale-body-large-line-height);
      border: 1px solid var(--sys-color-outline);
      border-radius: var(--sys-radius-xsmall);
      background-color: transparent;
      margin: var(--sys-spacing-track) 0;
    }

    fieldset:active,
    fieldset:focus,
    fieldset:focus-within {
      border-color: var(--sys-color-primary);
    }

    fieldset legend {
      padding: 0 var(--sys-spacing-track);
    }

    fieldset div {
      margin-top: var(--sys-spacing-track);
    }
    fieldset div:first-of-type {
      margin-top: 0;
    }

    fieldset label,
    input[type='radio'] {
      display: inline-block;
      vertical-align: middle;
      margin: 0;
    }

    input[type='radio'] {
      width: 20px;
      height: 20px;
      accent-color: var(--sys-color-primary);
    }
  `;

  @property({type: Boolean, reflect: true})
    disabled = false;

  async submit(): Promise<void> {
    const bodyJson = this.getFormData();
    this._logger.logMethodArgs('_submit', bodyJson);
    this.disabled = true;
    await new Promise((resolve) => setTimeout(resolve, 3_000));
    this.disabled = false;
    this.dispatchEvent(new CustomEvent('form-submitted'));
    // return fetch({
    //   url: config.api + '/',
    //   token: config.token,
    //   method: 'PUT',
    //   bodyJson,
    // });
  }

  getFormData(): Record<string, unknown> {
    this._logger.logMethod('_getInputData');
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
        type="text"
        outlined
        active-outline
        stated
        placeholder="شماره قرعه‌کشی"
      ></alwatr-text-field>
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
        placeholder="شماره موبایل"
      ></alwatr-text-field>
      <alwatr-radio-group></alwatr-radio-group>
      <alwatr-button outlined @click=${this.submit}>ارسال فرم</alwatr-button>
    `;
  }
}
