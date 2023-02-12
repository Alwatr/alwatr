import {customElement, AlwatrSmartElement, css, html, LocalizeMixin} from '@alwatr/element';
import {message} from '@alwatr/i18n';

import {submitOrderCommandTrigger} from './context.js';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';
import type {TopAppBarContent} from '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';
import './app-footer';

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
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .logo {
      display: block;
      width: 100%;
    }

    main {
      display: block;
      padding: calc(2 * var(--sys-spacing-track));
      flex-grow: 1;
      overflow-y: auto;
    }
  `;

  protected content = {
    topAppBar: <TopAppBarContent>{
      type: 'small',
      headline: 'not_found',
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
    },
    box: <IconBoxContent>{
      stated: true,
      elevated: 1,
      icon: 'construct-outline',
      flipRtl: true,
      headline: 'under_develope',
      description: 'under_develope_description',
    },
  } as const;

  override render(): unknown {
    this._logger.logMethod('render');

    const topAppBar: TopAppBarContent = {
      ...this.content.topAppBar,
      headline: message(this.content.topAppBar.headline),
    };

    const box: IconBoxContent = {
      ...this.content.box,
      headline: message(this.content.box.headline),
      description: message(this.content.box.description),
    };

    return html`
      <alwatr-top-app-bar .content=${topAppBar}></alwatr-top-app-bar>
      <main><alwatr-icon-box .content=${box} @click=${this._click}></alwatr-icon-box></main>
      <alwatr-app-footer></alwatr-app-footer>
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
