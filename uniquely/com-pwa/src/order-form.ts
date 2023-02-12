import {customElement, css, html, property, LocalizeMixin, AlwatrSmartElement} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {commandTrigger} from '@alwatr/signal';

import type {Order} from '@alwatr/type/src/customer-order-management.js';
import type {RadioGroupOptions} from '@alwatr/ui-kit/radio-group/radio-group.js';
import type {AlwatrTextField} from '@alwatr/ui-kit/text-field/text-field.js';

import '@alwatr/ui-kit/text-field/text-field.js';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-order-form': AlwatrOrderForm;
  }
}

/**
 * Alwatr Customer Order Management Order Form
 */
@customElement('alwatr-order-form')
export class AlwatrOrderForm extends LocalizeMixin(AlwatrSmartElement) {
  static formId = 'order';

  get _radioGroupOptions(): RadioGroupOptions {
    return {
      title: message('order_form_lading_title'),
      radioGroup: [
        {label: message('order_form_trolley')},
        {label: message('order_form_trolley')},
        {label: message('order_form_trolley')},
        {label: message('order_form_trolley')},
      ],
    };
  }

  static override styles = css`
    :host {
      display: block;
      transition: opacity var(--sys-motion-duration-medium) var(--sys-motion-easing-normal);
      padding: calc(4 * var(--sys-spacing-track))
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

    const response = await commandTrigger.requestWithResponse<Partial<Order>, boolean>('submit-form-command', {});

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
      data[inputElement.name] = inputElement.value;
    }
    return data;
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      <alwatr-text-field
        name="receiver"
        type="string"
        outlined
        active-outline
        stated
        placeholder=${message('order_form_receiver_name')}
      ></alwatr-text-field>
      <alwatr-text-field
        name="receiver-national-code"
        type="number"
        outlined
        active-outline
        stated
        placeholder=${message('order_form_receiver_national_code')}
      ></alwatr-text-field>
      <alwatr-text-field
        name="receiver-address"
        type="text"
        outlined
        active-outline
        stated
        placeholder=${message('order_form_address')}
      ></alwatr-text-field>
      <alwatr-radio-group
        name="activity"
        .options=${this._radioGroupOptions}
      ></alwatr-radio-group>
      <div class="button-container">
        <alwatr-button outlined @click=${this.submit}>${message('order_form_submit_form')}</alwatr-button>
        <alwatr-button @click=${this.cancel}>${message('cancel')}</alwatr-button>
      </div>
    `;
  }
}
