import {customElement, AlwatrSmartElement, css, html, map} from '@alwatr/element';

import '@alwatr/ui-kit/card/icon-box.js';
import './lottery-box.js';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-home': AlwatrPageHome;
  }
}

const _aboutContent = {
  wide: true,
  icon: 'logo-microsoft',
  headline: 'بازرگانی سافیت',
  description: `سافیت با هدف بهینه سازی در ساخت وساز و همچنین کاهش هزینه ها تامین و نگه داری ساختمان در بلند مدت اقدام به تولید محصولات گچی نمود.
همچنین با توجه به گسترش بازار و نیاز مشتریان تنوع طرح و جنس محصولات خود را افزایش داده است.
از مزایا سقف ها سافیت می‌توان به سرعت بالا در اجرا، عایق صوت، رطوبت و حرارت نام برد. همچنین می‌توان به راحتی در دسترسی به تاسیسات نیز اشاره کرد.
سافیت در نظر دارد سهم خود را در استفاده از،مواد اولیه  تجدید پذیر در تولید جهت حفظ و نگهداری محیط زیست برای آیندگان افزایش دهد.`,
};

const _menuList: Array<IconBoxContent & {wide?: boolean}> = [
  {
    icon: 'grid-outline',
    headline: 'سقف کاذب',
    wide: true,
  },
  {
    icon: 'git-commit-outline',
    headline: 'سازه‌ و‌ اتصالات',
  },
  {
    icon: 'bulb-outline',
    headline: 'روشنایی',
  },
  {
    icon: 'cloud-download-outline',
    headline: 'دانلود کاتالوگ',
    description: 'دانلود کاتالوگ معرفی محصولات بازرگانی سافیت',
    href: 'https://www.dropbox.com/s/6ywy23qql7iq31p/soffit-product-catalogue.pdf?dl=1',
    target: 'download',
  },
  {
    icon: 'call-outline',
    flipRtl: true,
    headline: 'تماس با ما',
    description: 'دفتر مرکزی: ۰۹۱۵۵۵۹۹۶۷۴',
    href: 'tel:+989155599674',
  },
  {
    icon: 'logo-linkedin',
    headline: 'لینکدین',
    description: 'صفحه‌ی لینکدین بازرگانی سافیت',
    href: 'https://www.linkedin.com/company/soffit-co',
    target: '_blank',
  },
  {
    icon: 'logo-instagram',
    headline: 'اینستاگرام',
    description: 'صفحه‌ی اینستاگرام بازرگانی سافیت',
    href: 'https://instagram.com/soffit.co',
    target: '_blank',
  },
  {
    icon: 'send-outline',
    headline: 'تلگرام',
    description: 'کانال تلگرام بازرگانی سافیت',
    href: 'https://t.me/soffitcompany',
    target: '_blank',
  },
  {
    icon: 'videocam-outline',
    headline: 'آپارات',
    description: 'کانال آپارات بازرگانی سافیت',
    href: 'https://www.aparat.com/soffit',
    target: '_blank',
  },
  {
    icon: 'ribbon-outline',
    headline: 'نمایندگی ۱',
    description: 'توضیحات نمایندگی شماره یک',
  },
  {
    icon: 'ribbon-outline',
    headline: 'نمایندگی ۲',
    description: 'توضیحات نمایندگی شماره دو',
  },
  {
    icon: 'ribbon-outline',
    headline: 'نمایندگی ۳',
    description: 'توضیحات نمایندگی شماره سه',
  },
  {
    icon: 'ribbon-outline',
    headline: 'نمایندگی ۴',
    description: 'توضیحات نمایندگی شماره چهار',
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
