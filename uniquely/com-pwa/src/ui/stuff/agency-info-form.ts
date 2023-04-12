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
import '@alwatr/ui-kit/button/button.js';
import {AlwatrSurface} from '@alwatr/ui-kit/card/surface.js';
import '@alwatr/ui-kit/text-field/text-field.js';

import type {AgencyInfo} from '@alwatr/type/customer-order-management.js';
import type {TextFieldSignalDetail, TextFiledContent} from '@alwatr/ui-kit/text-field/text-field.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-agency-info-form': AlwatrAgencyInfoForm;
  }
}

/**
 * Alwatr Agency Info Form.
 */
@customElement('alwatr-agency-info-form')
export class AlwatrAgencyInfoForm extends LocalizeMixin(SignalMixin(UnresolvedMixin(AlwatrSurface))) {
  static override styles = css`
    :host {
      display: block;
    }

    alwatr-text-field {
      display: block;
      margin-bottom: var(--sys-spacing-track);
    }
  `;

  @property()
    formData: Partial<AgencyInfo> = {};

  override connectedCallback(): void {
    super.connectedCallback();
    this._addSignalListeners(
        eventListener.subscribe('agency_info_form_input_change', this.updateData.bind(this)),
    );
  }

  override render(): unknown {
    this._logger.logMethod?.('render');

    const textFieldContentRecord: Record<string, TextFiledContent> = {
      name: {
        type: 'text',
        name: 'name',
        placeholder: message('agency_info_name_title'),
        value: this.formData.name,
        inputChangeSignalName: 'agency_info_form_input_change',
      },
      shopName: {
        type: 'text',
        name: 'shopName',
        placeholder: message('agency_info_shop_name_title'),
        value: this.formData.shopName,
        inputChangeSignalName: 'agency_info_form_input_change',
      },
      phoneNumber: {
        type: 'number',
        name: 'phoneNumber',
        placeholder: message('agency_info_phone_number_title'),
        value: this.formData.phoneNumber,
        inputChangeSignalName: 'agency_info_form_input_change',
      },
      tel: {
        type: 'number',
        name: 'tel',
        placeholder: message('agency_info_tel_title'),
        value: this.formData.tel,
        inputChangeSignalName: 'agency_info_form_input_change',
      },
      province: {
        type: 'text',
        name: 'province',
        placeholder: message('agency_info_province_title'),
        value: this.formData.province,
        inputChangeSignalName: 'agency_info_form_input_change',
      },
      city: {
        type: 'text',
        name: 'city',
        placeholder: message('agency_info_city_title'),
        value: this.formData.city,
        inputChangeSignalName: 'agency_info_form_input_change',
      },
      address: {
        type: 'textarea',
        name: 'address',
        placeholder: message('agency_info_address_title'),
        value: this.formData.address,
        inputChangeSignalName: 'agency_info_form_input_change',
      },
      postalCode: {
        type: 'number',
        name: 'postalCode',
        placeholder: message('agency_info_postal_code_title'),
        value: this.formData.postalCode,
        inputChangeSignalName: 'agency_info_form_input_change',
      },
      description: {
        type: 'textarea',
        name: 'description',
        placeholder: message('agency_info_description_title'),
        value: this.formData.description,
        inputChangeSignalName: 'agency_info_form_input_change',
      },
    };

    return [
      mapObject(this, textFieldContentRecord, (textFieldContent) => {
        return html`
          <alwatr-text-field .content=${textFieldContent} outlined active-outline stated></alwatr-text-field>
        `;
      }),
    ];
  }

  protected updateData(detail: TextFieldSignalDetail): void {
    this.formData[detail.name] = detail.value;
  }
}
