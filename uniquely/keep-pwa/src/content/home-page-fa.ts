/* eslint-disable max-len */

import {replaceNumber} from '@alwatr/i18n';

import {languageButtonClickEventListener} from '../manager/context.js';

import type {PageHomeContent} from '../type.js';

export const homePageContent: PageHomeContent = {
  topAppBar: {
    type: 'center',
    headline: 'مجموعه کیپ',
    startIcon: {icon: 'menu-outline', flipRtl: true},
    endIconList: [{icon: 'globe-outline', clickSignalId: languageButtonClickEventListener.id}],
  },
  about: {
    elevated: 1,
    stated: true,
    wide: true,
    headline: 'درباره ما',
    slot: `
      شرکت تولیدی کیپ مصالح ساختمانی و اسکوپ  سنگ‌نما هلدینگی ایرانی است که در زمینه تولید و توزیع خدمات ساختمانی فعالیت دارد.<br />
      این کارخانه با هدف توزیع محصولات ساختمانی در بازارهای ایرانی و خارجی مشغول به فعالیت می‌باشد.<br />
      محصولات تولیدی این مجموعه با کیفیت بالا و کادری مجرب و تعهد به اصول جلب رضایت مشتری می‌باشد.
    `,
  },
  product: {
    elevated: 1,
    highlight: true,
    stated: true,
    wide: true,
    icon: 'cart-outline',
    headline: 'مشاهده محصولات',
  },
  catalogue: {
    elevated: 1,
    highlight: true,
    stated: true,
    icon: 'cloud-download-outline',
    flipRtl: true,
    headline: 'دانلود کاتالوگ',
    description: 'دانلود کاتالوگ معرفی محصولات کیپ',
    href: 'https://www.dropbox.com/s/dl/k1jct7jc7netmsq/keep-product-brochure.pdf',
    target: 'download',
  },
  socialList: [
    {
      elevated: 1,
      highlight: true,
      stated: true,
      icon: 'call-outline',
      flipRtl: true,
      headline: 'تماس با ما',
      slot: `
        <div>تلفن ارتباط مستقیم</div>
        <div dir="ltr">${replaceNumber('0915 101 1507')}</div>
      `,
      href: 'tel:+989151011507',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      icon: 'send-outline',
      headline: 'تلگرام',
      description: 'کانال تلگرام کیپ',
      href: 'https://t.me/keeperco',
      target: '_blank',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      icon: 'logo-instagram',
      headline: 'اینستاگرام',
      description: 'صفحه‌ی اینستاگرام کیپ',
      href: 'https://instagram.com/keep_scope/',
      target: '_blank',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      icon: 'logo-youtube',
      headline: 'یوتیوب',
      description: 'کانال یوتیوب کیپ',
      href: 'https://www.youtube.com/keeperco',
      target: '_blank',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      icon: 'videocam-outline',
      headline: 'آپارات',
      description: 'کانال آپارات کیپ',
      href: 'https://www.aparat.com/keeperco',
      target: '_blank',
    },
  ],
};
