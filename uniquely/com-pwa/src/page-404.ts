import {customElement, AlwatrSmartElement, css, html, LocalizeMixin} from '@alwatr/element';
import {message} from '@alwatr/i18n';

import {submitOrderCommandTrigger} from './context.js';

import type {BoxType} from './type.js';
import type {TopAppBarContent} from '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';


declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-404': AlwatrPage404;
  }
}

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-404')
export class AlwatrPage404 extends LocalizeMixin(AlwatrSmartElement) {
  static override styles = css`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
    }

    .logo {
      display: block;
      width: 100%;
    }

    main {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      gap: var(--sys-spacing-track);
    }

    alwatr-icon-box {
      width: 40%;
      flex-grow: 1;
    }

    alwatr-icon-box[wide],
    alwatr-lottery-box,
    alwatr-supply-chain-box {
      width: 100%;
    }

    footer {
      direction: ltr;
      text-align: center;
      color: var(--sys-color-on-secondary-container);
      padding: calc(2 * var(--sys-spacing-track)) var(--sys-spacing-track) var(--sys-spacing-track);
      background-color: var(--sys-color-secondary-container);
    }
  `;

  override render(): unknown {
    this._logger.logMethod('render');

    const topAppBar: TopAppBarContent = {
      type: 'small',
      headline: message('not_found'),
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
    };

    const box: BoxType = {
      stated: true,
      elevated: 1,
      icon: 'construct-outline',
      flipRtl: true,
      headline: message('under_develope'),
      description: message('under_develope_description'),
    };

    return html`
      <alwatr-top-app-bar .content=${topAppBar}></alwatr-top-app-bar>
      <main><alwatr-icon-box .content=${box} @click=${this._click}></alwatr-icon-box></main>
      <footer>
        <div>A good ceiling is vital.<br />a SOFFIT ceiling can be an inspiration.</div>
      </footer>
    `;
  }

  protected _click(): void {
    submitOrderCommandTrigger.request({
      itemList: [
        {
          productId: '3232233323',
          price: {
            price: 1000000,
            finalPrice: 950000,
          },
          qty: 20,
        },
      ],

      delivery: {
        recipientName: 'ali',
        recipientNationalCode: '0934614566',
        address: 'Mashhad, 29 dey, koche 29',
        shipmentType: 'x',
        carType: 'y',
        timePeriod: '1-2w',
      },

      discountType: 'number',
      totalPrice: 1000000,
      shippingPrice: 1100000,
      finalPrice: 900000,
      discount: 0,
    });
  }
}
