import {
  customElement,
  css,
  html,
  LocalizeMixin,
  SignalMixin,
  UnresolvedMixin,
  property,
  mapObject,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import {eventListener} from '@alwatr/signal';
import {Stringifyable} from '@alwatr/type';
import {ladingTypeCS, carTypeCS, timePeriodCS, type OrderShippingInfo} from '@alwatr/type/customer-order-management.js';
import '@alwatr/ui-kit/button/button.js';
import {AlwatrSurface} from '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/radio-group/radio-group.js';
import '@alwatr/ui-kit/text-field/text-field.js';
import {getLocalStorageItem} from '@alwatr/util';

import type {RadioGroupContent} from '@alwatr/ui-kit/radio-group/radio-group.js';
import type {TextFiledContent} from '@alwatr/ui-kit/text-field/text-field.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-order-shipping-form': AlwatrOrderShoppingForm;
  }
}

const localStorageId = 'shipping_form_data_x2';

/**
 * Alwatr Order Shipping Form.
 */
@customElement('alwatr-order-shipping-form')
export class AlwatrOrderShoppingForm extends LocalizeMixin(SignalMixin(UnresolvedMixin(AlwatrSurface))) {
  static override styles = css`
    :host {
      display: block;
    }

    alwatr-text-field,
    alwatr-radio-group {
      display: block;
      margin-bottom: var(--sys-spacing-track);
    }
  `;

  @property()
    formData: Partial<OrderShippingInfo> = {};

  override connectedCallback(): void {
    super.connectedCallback();
    this._loadFormData();
    this._addSignalListeners(
        eventListener.subscribe('order_shipping_input_change', this.updateData.bind(this)),
    );
  }

  private _saveFormData(): void {
    this._logger.logMethod?.('_saveFormData');
    localStorage.setItem(localStorageId, JSON.stringify(this.formData));
  }

  private _loadFormData(): void {
    if (Object.values(this.formData).length !== 0) return;
    this._logger.logMethod?.('_loadFormData');
    const formData = getLocalStorageItem(localStorageId, this.formData);
    for (const prop in formData) {
      if (!Object.prototype.hasOwnProperty.call(formData, prop)) continue;
      this.formData[prop] = formData[prop];
    }
  }

  override render(): unknown {
    this._logger.logMethod?.('render');

    const textFieldContentRecord: Record<string, TextFiledContent> = {
      recipientName: {
        type: 'text',
        name: 'recipientName',
        placeholder: message('order_shipping_recipient_name_title'),
        value: this.formData.recipientName,
        inputChangeSignalName: 'order_shipping_input_change',
      },
      recipientNationalCode: {
        type: 'number',
        name: 'recipientNationalCode',
        placeholder: message('order_shipping_recipient_national_code_title'),
        value: this.formData.recipientNationalCode,
        inputChangeSignalName: 'order_shipping_input_change',
      },
      address: {
        type: 'textarea',
        name: 'address',
        placeholder: message('order_shipping_address_title'),
        value: this.formData.address,
        inputChangeSignalName: 'order_shipping_input_change',
      },
    };
    const radioGroupContentRecord: Record<string, RadioGroupContent> = {
      carType: {
        name: 'carType',
        title: message('order_shipping_car_type_title'),
        radioGroup: carTypeCS.map((value) => {
          return {
            value,
            label: message('order_shipping_car_type_key_' + value),
          };
        }),
        value: this.formData.carType,
        inputChangeSignalName: 'order_shipping_input_change',
      },
      ladingType: {
        name: 'ladingType',
        title: message('order_shipping_lading_type_title'),
        radioGroup: ladingTypeCS.map((value) => {
          return {
            value,
            label: message('order_shipping_lading_type_key_' + value),
          };
        }),
        value: this.formData.ladingType,
        inputChangeSignalName: 'order_shipping_input_change',
      },
      timePeriod: {
        name: 'timePeriod',
        title: message('order_shipping_time_period_title'),
        radioGroup: timePeriodCS.map((value) => {
          return {
            value,
            label: message('order_shipping_time_period_key_' + value),
          };
        }),
        value: this.formData.timePeriod,
        inputChangeSignalName: 'order_shipping_input_change',
      },
    };
    const descriptionTextFieldContent = {
      type: 'textarea',
      name: 'description',
      placeholder: message('order_shipping_description_title'),
      value: this.formData.description,
      inputChangeSignalName: 'order_shipping_input_change',
    };

    return [
      mapObject(this, textFieldContentRecord, (textFieldContent) => {
        return html`
          <alwatr-text-field .content=${textFieldContent} outlined active-outline stated></alwatr-text-field>
        `;
      }),
      mapObject(this, radioGroupContentRecord, (radioGroupContent) => {
        return html`<alwatr-radio-group .content=${radioGroupContent}></alwatr-radio-group>`;
      }),
      html`<alwatr-text-field
        .content=${descriptionTextFieldContent}
        outlined
        active-outline
        stated
      ></alwatr-text-field>`,
    ];
  }

  protected updateData(detail: {name: string; value: string; detail: Stringifyable}): void {
    this.formData[detail.name] = detail.value;
    this._saveFormData();
  }
}
