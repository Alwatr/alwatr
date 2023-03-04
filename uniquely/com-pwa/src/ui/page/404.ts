import {
  customElement,
  css,
  html,
  LocalizeMixin,
  SignalMixin,
  AlwatrBaseElement,
  UnresolvedMixin,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/card/icon-box.js';

import {submitOrderCommandTrigger, topAppBarContextProvider} from '../../manager/context.js';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-404': AlwatrPage404;
  }
}

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-404')
export class AlwatrPage404 extends UnresolvedMixin(LocalizeMixin(SignalMixin(AlwatrBaseElement))) {
  static override styles = css`
    :host {
      display: block;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();
    topAppBarContextProvider.setValue({
      type: 'small',
      headline: message('page_404_not_found'),
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back_to_home_click_event'},
      tinted: 2,
    });
  }

  override render(): unknown {
    this._logger.logMethod('render');

    const box: IconBoxContent = {
      stated: true,
      elevated: 1,
      icon: 'construct-outline',
      flipRtl: true,
      headline: message('page_404_under_develope'),
      description: message('page_404_under_develope_description'),
      preLine: true,
    };

    return html`<alwatr-icon-box .content=${box} @click=${this._click}></alwatr-icon-box>`;
  }

  protected _click(): void {
    submitOrderCommandTrigger.request({
      itemList: [
        {
          productId: '2',
          price: 1000000,
          finalPrice: 950000,
          qty: 20,
        },
        {
          productId: '4',
          price: 1000000,
          finalPrice: 950000,
          qty: 20,
        },
      ],

      shippingInfo: {
        recipientName: 'ali',
        recipientNationalCode: '0934614566',
        address: 'Mashhad, 29 dey, koche 29',
        ladingType: 'pallet',
        carType: 'ten_wheel',
        timePeriod: '1_2w',
      },

      discountType: 'number',
      totalPrice: 1000000,
      ladingPrice: 1100000,
      finalTotalPrice: 900000,
      discount: 0,
    });
  }
}
