import {customElement, css, html, LocalizeMixin, SignalMixin, UnresolvedMixin, property} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {
  shipmentTypeCS,
  carTypeCS,
  timePeriodCS,
  type OrderShippingInfo,
} from '@alwatr/type/customer-order-management.js';
import '@alwatr/ui-kit/button/button.js';
import {AlwatrSurface} from '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import {pageNewOrderStateMachine} from '../../manager/controller/new-order.js';

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
  static override styles = css`
    :host {
      display: block;
    }

    alwatr-text-field {
      display: block;
      margin-bottom: var(--sys-spacing-track);
    }

    .btn-container {
      display: flex;
      flex-direction: row-reverse;
      gap: var(--sys-spacing-track);
      margin-top: var(--sys-spacing-track);
    }
  `;

  @property()
    shippingInfo?: OrderShippingInfo;

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

    const radioGroupOptions = {
      carType: <RadioGroupOptions>{
        title: message('order_shipping_car_type_title'),
        radioGroup: carTypeCS.map((value) => {
          return {
            value,
            label: message('order_shipping_car_type_' + value),
          };
        }),
      },
      shipmentType: <RadioGroupOptions>{
        title: message('order_shipping_shipment_type_title'),
        radioGroup: shipmentTypeCS.map((value) => {
          return {
            value,
            label: message('order_shipping_shipment_type_' + value),
          };
        }),
      },
      timePeriod: <RadioGroupOptions>{
        title: message('order_shipping_time_period_title'),
        radioGroup: timePeriodCS.map((value) => {
          return {
            value,
            label: message('order_shipping_time_period_' + value),
          };
        }),
      },
    };

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
        style="width: 100%;"
      ></alwatr-text-field>

      <alwatr-radio-group name="carType" .options=${radioGroupOptions.carType}></alwatr-radio-group>
      <alwatr-radio-group name="shipmentType" .options=${radioGroupOptions.shipmentType}></alwatr-radio-group>
      <alwatr-radio-group name="timePeriod" .options=${radioGroupOptions.timePeriod}></alwatr-radio-group>
    `;
  }
}
