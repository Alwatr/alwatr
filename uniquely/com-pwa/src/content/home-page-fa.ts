/* eslint-disable max-len */
import {replaceNumber} from '@alwatr/i18n';

import type {PageHomeContent} from '../type.js';

export const homePageContent: PageHomeContent = {
  topAppBar: {
    type: 'center',
    headline: 'مدیریت سفارشات سافیت',
    startIcon: {icon: 'menu-outline', clickSignalId: 'app-menu-click-event'},
    endIconList: [{icon: 'person-circle-outline', clickSignalId: 'user-avatar-click-event'}],
    tinted: 1,
  },

  boxList: [
    {
      wide: true,
      elevated: 1,
      stated: true,
      icon: 'logo-microsoft',
      headline: 'مجموعه سافیت',
      href: 'https://beta.soffit.co',
      target: '_blank',
      slot: `
        سافیت با هدف بهینه سازی در ساخت وساز و همچنین کاهش هزینه ها تامین و نگه داری ساختمان در بلند مدت اقدام به تولید محصولات گچی نمود.<br/>
        همچنین با توجه به گسترش بازار و نیاز مشتریان تنوع طرح و جنس محصولات خود را افزایش داده است.
        از مزایا سقف ها سافیت می‌توان به سرعت بالا در اجرا، عایق صوت، رطوبت و حرارت نام برد. همچنین می‌توان به راحتی در دسترسی به تاسیسات نیز اشاره کرد.
      `,
    },

    {
      elevated: 1,
      stated: true,
      icon: 'cart-outline',
      flipRtl: true,
      headline: 'سفارش جدید',
      href: '/products/tile',
      description: 'فرآیند ثبت سفارش جدید.',
    },
    {
      elevated: 1,
      stated: true,
      icon: 'list-outline',
      flipRtl: true,
      headline: 'سفارشات جاری',
      href: '/orders',
      description: 'مشاهده وضعیت و پیگیری سفارشات جاری.',
    },

    {
      elevated: 1,
      stated: true,
      icon: 'cloud-download-outline',
      flipRtl: true,
      headline: 'دانلود کاتالوگ',
      description: 'دانلود کاتالوگ معرفی محصولات بازرگانی سافیت',
      href: 'https://www.dropbox.com/s/dl/6ywy23qql7iq31p/soffit-product-catalogue.pdf',
      target: 'download',
    },
    {
      elevated: 1,
      stated: true,
      icon: 'call-outline',
      flipRtl: true,
      headline: 'تماس با ما',
      slot: `
        <div>تلفن ارتباط مستقیم</div>
        <div dir="ltr">${replaceNumber('0915 559 9674')}</div>
      `,
      href: 'tel:+989155599674',
    },
  ],
};
