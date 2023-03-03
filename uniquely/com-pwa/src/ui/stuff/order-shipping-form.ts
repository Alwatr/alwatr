import {customElement, css, html, LocalizeMixin, SignalMixin, UnresolvedMixin} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/button.js';
import {AlwatrSurface} from '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import {pageNewOrderStateMachine} from '../../manager/controller/new-order.js';

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
    :host {
      display: block;
    }

    alwatr-text-field {
      margin-bottom: var(--sys-spacing-track);
    }

    .btn-container {
      display: flex;
      flex-direction: row-reverse;
      gap: var(--sys-spacing-track);
      margin-top: var(--sys-spacing-track);
    }
  `;

  getShippingInfo(): Partial<OrderShippingInfo> {
    const data: Partial<OrderShippingInfo> = {};
    for (const inputElement of this.renderRoot.querySelectorAll<AlwatrTextField | AlwatrFieldSet>(
        'alwatr-text-field,alwatr-radio-group',
    )) {
      data[inputElement.name] = inputElement.value;
    }

    return data;
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    pageNewOrderStateMachine.context.order.shippingInfo = this.getShippingInfo();
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      <alwatr-text-field
        name="recipientName"
        .type="text"
        .placeholder=${message('order_shipping_recipient_name')}
        outlined
        active-outline
        stated
      ></alwatr-text-field>
      <alwatr-text-field
        name="recipientNationalCode"
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

      <alwatr-radio-group name="carType" .options=${this._carTypeRadioGroupOptions}></alwatr-radio-group>
      <alwatr-radio-group name="shipmentType" .options=${this._shipmentTypeRadioGroupOptions}></alwatr-radio-group>
      <alwatr-radio-group name="timePeriod" .options=${this._timePeriodRadioGroupOptions}></alwatr-radio-group>
    `;
  }
}
