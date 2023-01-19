import {customElement, AlwatrSmartElement, css, html, map} from '@alwatr/element';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

import '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-home': AlwatrPageHome;
  }
}

const menuList: Array<IconBoxContent & {wide?: boolean}> = [
  {
    wide: true,
    icon: 'logo-microsoft',
    headline: 'بازرگانی سافیت',
    description: `مجموعه تولیدی بازرگانی سافیت
      تولید کننده عمده محصولات DRY WALL ، سازه ۶۰ کلیک، تایل کچی 60*60 و روکش P.V.C
      برند درجه یک صادراتی با فعالیت های بین المللی و ویژگی های ممتاز`,
  },
  {
    wide: true,
    icon: 'gift-outline',
    headline: 'قرعه‌کشی میدکس',
    description: 'فرم شرکت در قرعه‌کشی میدکس',
    href: 'https://formafzar.com/form/fd8lo',
    target: 'blank',
  },
  {
    icon: 'cloud-download-outline',
    headline: 'دانلود کاتالوگ',
    description: 'دانلود کاتالوگ معرفی محصولات بازرگانی سافیت',
    href: '',
    target: 'download',
  },
  {
    icon: 'logo-instagram',
    headline: 'اینستاگرام',
    description: 'کانال اینستاگرام بازرگانی سافیت',
    href: 'https://instagram.com/soffit.co',
    target: 'blank',
  },
  {
    icon: 'send-outline',
    headline: 'کانال تلگرام',
    description: 'کانال تلگرام بازرگانی سافیت',
    href: 'https://t.me/soffitcompany',
    target: 'blank',
  },
  {
    icon: 'call-outline',
    headline: 'تماس باما',
    description: 'ارتباط مستقیم با دفتر مرکزی بازرگانی سافیت',
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

    :host::-webkit-scrollbar {
      width: var(--sys-scrollbar-size);
      height: var(--sys-scrollbar-size);
    }

    :host::-webkit-scrollbar-corner,
    :host::-webkit-scrollbar-track {
      background-color: var(--sys-scrollbar-background);
    }

    :host::-webkit-scrollbar-track {
      margin: var(--sys-spacing-track);
    }

    :host::-webkit-scrollbar-thumb {
      background-color: var(--sys-scrollbar-color);
      border-radius: var(--sys-scrollbar-radius);
    }

    :host(:hover)::-webkit-scrollbar-thumb {
      background-color: var(--sys-scrollbar-color-hover);
    }

    main {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      gap: calc(2 * var(--sys-spacing-track));
    }

    main alwatr-icon-box {
      width: 40%;
      flex-grow: 1;
    }

    main alwatr-icon-box[wide] {
      width: 100%;
    }

    header {
      padding: calc(2 * var(--sys-spacing-track));
    }

    header img {
      display: block;
      width: 100%;
    }

    footer {
      direction: ltr;
      text-align: center;
      color: var(--sys-color-on-secondary-container);
      padding: calc(2 * var(--sys-spacing-track));
      background-color: var(--sys-color-secondary-container);
    }
  `;

  override render(): unknown {
    super.render();
    return html`
      <header><img src="image/soffit.png" alt="SOFFIT Logo" /></header>
      <main>${this._menuTemplate()}</main>
      <footer><span>A good ceiling is vital.<br/>a SOFFIT ceiling can be an inspiration.</span></footer>
    `;
  }

  protected _menuTemplate():unknown {
    return map(menuList, (menuItem) => html`
      <alwatr-icon-box .content=${menuItem} ?wide=${menuItem.wide}></alwatr-icon-box>
    `);
  }
}
