import {customElement, css, html, LocalizeMixin, AlwatrBaseElement, SignalMixin, property} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import {submitOrderShippingCommandTrigger, topAppBarContextProvider} from '../context.js';

import type {OrderDelivery, OrderDraft} from '@alwatr/type/customer-order-management.js';
import type {AlwatrFieldSet, RadioGroupOptions} from '@alwatr/ui-kit/radio-group/radio-group.js';
import type {AlwatrTextField} from '@alwatr/ui-kit/text-field/text-field.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-order-shipping': AlwatrPageOrderShopping;
  }
}

/**
 * Alwatr Customer Order Management Order Form Page
 */
@customElement('alwatr-page-order-shipping')
export class AlwatrPageOrderShopping extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static formId = 'order';

  get _carTypeRadioGroupOptions(): RadioGroupOptions {
    return {
      title: message('order_shipping_car_type_title'),
      radioGroup: [
        {label: message('order_shipping_trolley'), value: 'y'},
        {label: message('order_shipping_trolley'), value: 'x'},
      ],
    };
  }

  get _shipmentTypeRadioGroupOptions(): RadioGroupOptions {
    return {
      title: message('order_shipping_shipment_type_title'),
      radioGroup: [
        {label: message('order_shipping_trolley'), value: 'y'},
        {label: message('order_shipping_trolley'), value: 'x'},
      ],
    };
  }

  get _timePeriodRadioGroupOptions(): RadioGroupOptions {
    return {
      title: message('order_shipping_time_period_title'),
      radioGroup: [
        {label: message('time_period_1_2w'), value: '1-2w'},
        {label: message('time_period_2_3w'), value: '2-3w'},
        {label: message('time_period_3_4w'), value: '3-4w'},
      ],
    };
  }

  static override styles = css`
    :host {
      display: block;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }

    .form {
      padding: calc(2 * var(--sys-spacing-track));
    }

    :host([disabled]) .form {
      pointer-events: none;
      opacity: var(--sys-surface-disabled-opacity);
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

  @property({attribute: false})
    order?: OrderDraft | null;

  override connectedCallback(): void {
    super.connectedCallback();

    topAppBarContextProvider.setValue({
      type: 'medium',
      headline: message('page_order_shipping_headline'),
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
      tinted: 2,
    });
  }

  getFormData(): Partial<OrderDelivery> {
    this._logger.logMethod('getFormData');
    const data: Partial<OrderDelivery> = {};
    for (const inputElement of this.renderRoot.querySelectorAll<AlwatrTextField | AlwatrFieldSet>(
        'alwatr-text-field,alwatr-radio-group',
    )) {
      data[inputElement.name] = inputElement.value;
    }
    return {
      recipientName: data['recipient-name'],
      recipientNationalCode: data['recipient-national-code'],
      address: data['address'],
      carType: data['car-type'],
      shipmentType: data['shipment-type'],
      timePeriod: data['shipment-type'],
    } as Partial<OrderDelivery>;
  }

  reset(): void {
    // TODO: reset radio group
    this._logger.logMethod('clearForm');
    for (const inputElement of this.renderRoot.querySelectorAll<AlwatrTextField>('alwatr-text-field')) {
      inputElement.value = '';
    }
  }

  async cancel(): Promise<void> {
    this.dispatchEvent(new CustomEvent('form-canceled'));
    this.reset();
  }

  async submit(): Promise<void> {
    const formData = this.getFormData() as OrderDelivery;
    this._logger.logMethodArgs('submit', formData);
    submitOrderShippingCommandTrigger.request(formData);
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      <alwatr-surface class="form" elevated>
        <alwatr-text-field
          name="recipient-name"
          type="string"
          outlined
          active-outline
          stated
          placeholder=${message('order_shipping_recipient_name')}
        ></alwatr-text-field>
        <alwatr-text-field
          name="recipient-national-code"
          type="number"
          outlined
          active-outline
          stated
          placeholder=${message('order_shipping_recipient_national_code')}
        ></alwatr-text-field>
        <alwatr-text-field
          name="address"
          type="text"
          outlined
          active-outline
          stated
          placeholder=${message('order_shipping_address')}
        ></alwatr-text-field>
        <alwatr-radio-group name="car-type" .options=${this._carTypeRadioGroupOptions}></alwatr-radio-group>
        <alwatr-radio-group name="shipment-type" .options=${this._shipmentTypeRadioGroupOptions}></alwatr-radio-group>
        <alwatr-radio-group name="time-period" .options=${this._timePeriodRadioGroupOptions}></alwatr-radio-group>

        <div class="button-container">
          <alwatr-button outlined @click=${this.submit}>${message('order_shipping_submit_form')}</alwatr-button>
          <alwatr-button @click=${this.cancel}>${message('cancel')}</alwatr-button>
        </div>
      </alwatr-surface>
    `;
  }
}
