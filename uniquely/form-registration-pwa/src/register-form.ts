import {customElement, css, html, property, LocalizeMixin, SignalMixin, AlwatrBaseElement} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/text-field/text-field.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

import {submitRegisterFormCommandTrigger} from './context.js';

import type {FormData} from './type.js';
import type {AlwatrTextField} from '@alwatr/ui-kit/text-field/text-field.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-register-form': AlwatrRegisterForm;
  }
}

/**
 * Alwatr Register Form
 */
@customElement('alwatr-register-form')
export class AlwatrRegisterForm extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static formId = 'register';

  static override styles = css`
    :host {
      display: block;
      transition: opacity var(--sys-motion-duration-medium) var(--sys-motion-easing-normal);
      padding: calc(4 * var(--sys-spacing-track));
    }
    :host([disabled]) {
      pointer-events: none;
      opacity: var(--sys-surface-disabled-opacity);
    }
    alwatr-surface {
      padding: calc(2 * var(--sys-spacing-track));
    }
    alwatr-text-field {
      margin-top: var(--sys-spacing-track);
    }
    alwatr-text-field:first-of-type {
      margin-top: 0;
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
    const formData = this.getFormData();
    this._logger.logMethodArgs('submit', formData);
    this.disabled = true;
    await submitRegisterFormCommandTrigger.requestWithResponse(formData);
    this.disabled = false;
  }

  async cancel(): Promise<void> {
    this.resetForm();
  }

  getFormData(): Partial<FormData> {
    this._logger.logMethod('getFormData');
    return {
      formId: AlwatrRegisterForm.formId,
      name: this.renderRoot.querySelector<AlwatrTextField>('alwatr-text-field[name="name"]')?.value,
      phoneNumber: this.renderRoot.querySelector<AlwatrTextField>('alwatr-text-field[name="phone-number"]')?.value,
    };
  }

  resetForm(): void {
    // TODO: reset radio group
    this._logger.logMethod('clearForm');
    for (const inputElement of this.renderRoot.querySelectorAll<AlwatrTextField>('alwatr-text-field')) {
      inputElement.value = '';
    }
  }

  override render(): unknown {
    this._logger.logMethod('render');

    return html`
      <alwatr-surface elevated>
        <alwatr-text-field
          name="name"
          type="string"
          outlined
          active-outline
          stated
          placeholder=${message('register_form_name')}
        ></alwatr-text-field>
        <alwatr-text-field
          name="phone-number"
          type="number"
          outlined
          active-outline
          stated
          placeholder=${message('register_form_phone_number')}
        ></alwatr-text-field>
        <div class="button-container">
          <alwatr-button outlined @click=${this.submit}>${message('register_form_submit_button')}</alwatr-button>
          <alwatr-button @click=${this.cancel}>${message('cancel_form_button')}</alwatr-button>
        </div>
        </alwatr-surface>
    `;
  }
}
