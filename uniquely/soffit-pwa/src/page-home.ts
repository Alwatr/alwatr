import {customElement, AlwatrSmartElement, css, html, map} from '@alwatr/element';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/snackbar/snackbar.js';

import './lottery-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-home': AlwatrPageHome;
  }
}

const _aboutContent = {
  wide: true,
  icon: 'logo-microsoft',
  headline: 'بازرگانی سافیت',
  description: `مجموعه تولیدی بازرگانی سافیت
    تولید کننده عمده محصولات DRY WALL، سازه ۶۰ کلیک، تایل کچی 60*60 و روکش P.V.C
    برند درجه یک صادراتی با فعالیت های بین المللی و ویژگی های ممتاز`,
};

const _menuList: Array<IconBoxContent & {wide?: boolean}> = [
  {
    icon: 'cloud-download-outline',
    headline: 'دانلود کاتالوگ',
    description: 'دانلود کاتالوگ معرفی محصولات بازرگانی سافیت',
    href: 'https://www.dropbox.com/s/6ywy23qql7iq31p/soffit-product-catalogue.pdf?dl=1',
    target: 'download',
  },
  {
    icon: 'logo-instagram',
    headline: 'اینستاگرام',
    description: 'کانال اینستاگرام بازرگانی سافیت',
    href: 'https://instagram.com/soffit.co',
    target: '_blank',
  },
  {
    icon: 'send-outline',
    headline: 'کانال تلگرام',
    description: 'کانال تلگرام بازرگانی سافیت',
    href: 'https://t.me/soffitcompany',
    target: '_blank',
  },
  {
    icon: 'call-outline',
    flipRtl: true,
    headline: 'تماس باما',
    description: 'دفتر مرکزی: ۹۶۷۴ ۵۵۹ ۰۹۱۵',
    href: 'tel:+989155599674',
  },
];

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-home')
export class AlwatrPageHome extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: block;
      height: 100%;
      overflow-y: auto;
    }

    header {
      padding: calc(2 * var(--sys-spacing-track));
    }

    header img {
      display: block;
      width: 100%;
    }

    main {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      gap: calc(2 * var(--sys-spacing-track));
    }

    alwatr-icon-box {
      width: 40%;
      flex-grow: 1;
    }

    alwatr-icon-box[wide],
    alwatr-lottery-box {
      width: 100%;
    }

    alwatr-lottery-form {
      padding: 0 var(--sys-spacing-track);
    }

    footer {
      direction: ltr;
      text-align: center;
      color: var(--sys-color-on-secondary-container);
      padding: calc(2 * var(--sys-spacing-track));
      background-color: var(--sys-color-secondary-container);
      position: relative;
    }

    .version {
      position: absolute;
      right: var(--sys-spacing-track);
      bottom: 0;
      font-size: var(--sys-typescale-label-small-font-size);
      line-height: var(--sys-typescale-label-small-line-height);
      letter-spacing: var(--sys-typescale-label-small-letter-spacing);
      opacity: var(--sys-surface-disabled-opacity);
      user-select: none;
      -webkit-user-select: none;
    }
  `;

  override render(): unknown {
    super.render();
    return html`
      <header><img src="image/soffit.png" alt="SOFFIT Logo" /></header>
      <main>
        <alwatr-icon-box .content=${_aboutContent} stated elevated pre-line wide></alwatr-icon-box>
        <alwatr-lottery-box></alwatr-lottery-box>
        ${this._menuTemplate()}
      </main>
      <footer>
        <span>A good ceiling is vital.<br />a SOFFIT ceiling can be an inspiration.</span>
        <span class="version">v${_ALWATR_VERSION_}</span>
      </footer>

      <alwatr-snackbar></alwatr-snackbar>
    `;
  }

  protected _menuTemplate(): unknown {
    return map(
        _menuList,
        (item) => html`
          <alwatr-icon-box
            .content=${item}
            highlight stated elevated="2"
            pre-line
            ?wide=${item.wide}
          ></alwatr-icon-box>`,
    );
  }
}
