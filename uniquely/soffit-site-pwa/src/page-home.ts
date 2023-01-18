import {customElement, AlwatrSmartElement, css, html, map} from '@alwatr/element';

import '@alwatr/ui-kit/card/icon-box.js';
import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-home': AlwatrPageHome;
  }
}

const menuList: Array<IconBoxContent> = [
  {
    icon: 'logo-microsoft',
    headline: 'بازرگانی سافیت',
    description: `مجموعه تولیدی بازرگانی سافیت
      تولید کننده عمده محصولات DRY WALL ، سازه ۶۰ کلیک، تایل کچی 60*60 و روکش P.V.C
      برند درجه یک صادراتی با فعالیت های بین المللی و ویژگی های ممتاز`,
  },
  {
    icon: 'gift-outline',
    headline: 'قرعه کشی',
    description: 'فرم شرکت در قرعه کشی میدکس',
  },
  {
    icon: 'download-outline',
    headline: 'کاتالوگ',
    description: 'دانلود کاتالوگ معرفی محصولات بازرگانی سافیت',
  },
  {
    icon: 'call-outline',
    headline: 'ارتباط با ما',
    description: 'ارتباط مستقیم با دفتر مرکزی بازرگانی سافیت',
  },
  {
    icon: 'logo-instagram',
    headline: 'اینستاگرام',
    description: 'کانال اینستاگرام بازرگانی سافیت',
  },
  {
    icon: 'send-outline',
    headline: 'تلگرام',
    description: 'کانال تلگرام بازرگانی سافیت',
  },
];

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-home')
export class AlwatrPageHome extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
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

    section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      box-sizing: border-box;
      padding: calc(2 * var(--sys-spacing-track));
      gap: calc(2 * var(--sys-spacing-track));
    }

    header {
      display: flex;
      align-items: center;
      padding: calc(2 * var(--sys-spacing-track));
    }

    header img {
      width: 100%;
    }

    footer {
      width: 100%;
      display: flex;
      direction: ltr;
      text-align: center;
      box-sizing: border-box;
      color: var(--sys-color-on-primary-container);
      padding: calc(2 * var(--sys-spacing-track));
      background-color: var(--sys-color-primary-container);
      box-shadow: var(--sys-surface-elevation-4);
    }
  `;

  override render(): unknown {
    super.render();
    return html`
      <header>
        <img src="image/soffit.png" alt="SOFFIT Logo" />
      </header>
      <section>${this._menuTemplate()}</section>
      <footer>
        <span>A good ceiling is vital. But a SOFFIT ceiling can be an inspiration.</span>
      </footer>
    `;
  }

  protected _menuTemplate():unknown {
    return map(menuList, (menuItem) => html`<alwatr-icon-box .content=${menuItem}></alwatr-icon-box>`);
  }
}
