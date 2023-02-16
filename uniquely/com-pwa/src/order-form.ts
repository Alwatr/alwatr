import {customElement, css, html, property, LocalizeMixin, SignalMixin, AlwatrBaseElement} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';
import '@alwatr/ui-kit/text-field/text-field.js';


import {submitOrderCommandTrigger} from './context.js';

import type {OrderDelivery} from '@alwatr/type/src/customer-order-management.js';
import type {AlwatrFieldSet, RadioGroupOptions} from '@alwatr/ui-kit/radio-group/radio-group.js';
import type {AlwatrTextField} from '@alwatr/ui-kit/text-field/text-field.js';


declare global {
  interface HTMLElementTagNameMap {
    'alwatr-order-form': AlwatrOrderForm;
  }
}

/**
 * Alwatr Customer Order Management Order Form
 */
@customElement('alwatr-order-form')
export class AlwatrOrderForm extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static formId = 'order';

  get _carTypeRadioGroupOptions(): RadioGroupOptions {
    return {
      title: message('order_form_car_type_title'),
      radioGroup: [
        {label: message('order_form_trolley'), value: 'y'},
        {label: message('order_form_trolley'), value: 'x'},
      ],
    };
  }

  get _shipmentTypeRadioGroupOptions(): RadioGroupOptions {
    return {
      title: message('order_form_shipment_type_title'),
      radioGroup: [
        {label: message('order_form_trolley'), value: 'y'},
        {label: message('order_form_trolley'), value: 'x'},
      ],
    };
  }

  get _timePeriodRadioGroupOptions(): RadioGroupOptions {
    return {
      title: message('order_form_time_period_title'),
      radioGroup: [
        {label: message('order_form_time_period_1_2w'), value: '1-2w'},
        {label: message('order_form_time_period_2_3w'), value: '2-3w'},
        {label: message('order_form_time_period_3_4w'), value: '3-4w'},
      ],
    };
  }

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
    const formData = this.getFormData();
    this._logger.logMethodArgs('submit', formData);
    this.disabled = true;
    await submitOrderCommandTrigger.requestWithResponse({delivery: formData as OrderDelivery});
    this.disabled = false;
  }

  async cancel(): Promise<void> {
    this.dispatchEvent(new CustomEvent('form-canceled'));
  }

  getFormData(): Partial<OrderDelivery> {
    this._logger.logMethod('getFormData');
    return {
      recipientName: this.renderRoot.querySelector<AlwatrTextField>('alwatr-text-field[name="recipient-name"]')?.value,
      recipientNationalCode: this.renderRoot.querySelector<AlwatrTextField>(
          'alwatr-text-field[name="recipient-national-code"]',
      )?.value,
      address: this.renderRoot.querySelector<AlwatrTextField>('alwatr-text-field[name="address"]')?.value,
      carType: this.renderRoot.querySelector<AlwatrFieldSet>('alwatr-radio-group[name="car-type"]')?.value as 'x' | 'y',
      shipmentType: this.renderRoot.querySelector<AlwatrFieldSet>(
          'alwatr-radio-group[name="shipment-type"]',
      )?.value as | 'x' | 'y',
      timePeriod: this.renderRoot.querySelector<AlwatrFieldSet>(
          'alwatr-radio-group[name="car-type"]',
      )?.value as '1-2w' | '2-3w' | '3-4w',
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
        name="recipient-name"
        type="string"
        outlined
        active-outline
        stated
        placeholder=${message('order_form_recipient_name')}
      ></alwatr-text-field>
      <alwatr-text-field
        name="recipient-national-code"
        type="number"
        outlined
        active-outline
        stated
        placeholder=${message('order_form_recipient_national_code')}
      ></alwatr-text-field>
      <alwatr-text-field
        name="address"
        type="text"
        outlined
        active-outline
        stated
        placeholder=${message('order_form_address')}
      ></alwatr-text-field>
      <alwatr-radio-group name="car-type" .options=${this._carTypeRadioGroupOptions}></alwatr-radio-group>
      <alwatr-radio-group name="shipment-type" .options=${this._shipmentTypeRadioGroupOptions}></alwatr-radio-group>
      <alwatr-radio-group name="time-period" .options=${this._timePeriodRadioGroupOptions}></alwatr-radio-group>

      <div class="button-container">
        <alwatr-button outlined @click=${this.submit}>${message('order_form_submit_form')}</alwatr-button>
        <alwatr-button @click=${this.cancel}>${message('cancel')}</alwatr-button>
      </div>
      </alwatr-surface>
    `;
  }
}
