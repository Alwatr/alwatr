import {customElement, css, html, LocalizeMixin, SignalMixin, UnresolvedMixin} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import {AlwatrSurface} from '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import {buttons, pageNewOrderStateMachine} from '../../manager/controller/new-order.js';

import type {OrderShippingInfo} from '@alwatr/type/customer-order-management.js';
import type {AlwatrFieldSet, RadioGroupOptions} from '@alwatr/ui-kit/radio-group/radio-group.js';
import type {AlwatrTextField} from '@alwatr/ui-kit/text-field/text-field.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-order-shipping-form': AlwatrOrderShoppingForm;
  }
}

/**
 * Alwatr Order Shipping Form.
 */
@customElement('alwatr-order-shipping-form')
export class AlwatrOrderShoppingForm extends LocalizeMixin(SignalMixin(UnresolvedMixin(AlwatrSurface))) {
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
        {label: message('order_shipping_trolley'), value: 'x'}],
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
    alwatr-text-field {
      margin-top: var(--sys-spacing-track);
    }
    alwatr-text-field:first-of-type {
      margin-top: 0;
    }

    .btn-container {
      display: flex;
      flex-direction: row-reverse;
      gap: var(--sys-spacing-track);
      margin-top: var(--sys-spacing-track);
    }
  `;

  get getShippingInfo(): Partial<OrderShippingInfo> {
    const data: Partial<OrderShippingInfo> = {};
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
    } as Partial<OrderShippingInfo>;
  }

  async cancel(): Promise<void> {
    pageNewOrderStateMachine.transition('BACK');
  }

  // TODO: handle not valid shipping info
  submit(): void {
    this._logger.logMethod('submit');

    pageNewOrderStateMachine.context.order.shippingInfo = this.getShippingInfo as OrderShippingInfo;
    pageNewOrderStateMachine.transition('SUBMIT');
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      <alwatr-text-field
        name="recipient-name"
        .type="text"
        .placeholder=${message('order_shipping_recipient_name')}
        outlined
        active-outline
        stated
      ></alwatr-text-field>
      <alwatr-text-field
        name="recipient-national-code"
        .type="number"
        .placeholder=${message('order_shipping_recipient_national_code')}
        outlined
        active-outline
        stated
      ></alwatr-text-field>
      <alwatr-text-field
        name="address"
        .type="text"
        .placeholder=${message('order_shipping_address')}
        outlined
        active-outline
        stated
      ></alwatr-text-field>
      <alwatr-radio-group name="car-type" .options=${this._carTypeRadioGroupOptions}></alwatr-radio-group>
      <alwatr-radio-group name="shipment-type" .options=${this._shipmentTypeRadioGroupOptions}></alwatr-radio-group>
      <alwatr-radio-group name="time-period" .options=${this._timePeriodRadioGroupOptions}></alwatr-radio-group>

      <div class="btn-container">
        <alwatr-button .icon=${buttons.cancel.icon} outlined>${message('cancel')}</alwatr-button>
        <alwatr-button
          click-signal-id=${buttons.submitShippingForm.clickSignalId}
          .icon=${buttons.submitShippingForm.icon}
          elevated
          >${message('order_shipping_submit_form')}</alwatr-button
        >
      </div>
    `;
  }
}
