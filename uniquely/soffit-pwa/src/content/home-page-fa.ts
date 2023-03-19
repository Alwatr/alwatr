/* eslint-disable max-len */
import {replaceNumber} from '@alwatr/i18n';

import type {PageHomeContent} from '../type.js';

export const homePageContent: PageHomeContent = {
  topAppBar: {
    type: 'center',
    headline: 'مجموعه سافیت',
    startIcon: {icon: 'menu-outline', flipRtl: true},
    endIconList: [{icon: 'globe-outline', clickSignalId: 'language-button-click-event'}],
  },

  about: {
    wide: true,
    elevated: 1,
    stated: true,
    // icon: 'logo-microsoft',
    headline: 'درباره سافیت',
    slot: `
      مجموعه تولیدی بازرگانی سافیت<br/>
      تولید کننده عمده محصولات DRY WALL، سازه ۶۰ کلیک، تایل کچی 60*60 و روکش P.V.C<br/>
      برند درجه یک صادراتی با فعالیت های بین المللی و ویژگی های ممتاز<br/>
      این مجموعه با هدف بهینه سازی در ساخت وساز و همچنین کاهش هزینه ها تامین و نگه داری ساختمان در بلند مدت اقدام به تولید محصولات گچی نمود.<br/>
      همچنین با توجه به گسترش بازار و نیاز مشتریان تنوع طرح و جنس محصولات خود را افزایش داده است.<br/>
      از مزیت‌های سقف‌های سافیت می‌توان به سرعت بالا در اجرا، عایق صوت، رطوبت، حرارت و راحتی در دسترسی به تاسیسات اشاره کرد.
    `,
  },

  catalogue: {
    elevated: 1,
    highlight: true,
    stated: true,
    icon: 'cloud-download-outline',
    flipRtl: true,
    headline: 'دانلود کاتالوگ',
    description: 'دانلود کاتالوگ معرفی محصولات سافیت',
    href: 'https://www.dropbox.com/s/dl/6ywy23qql7iq31p/soffit-product-catalogue.pdf',
    target: 'download',
  },

  productList: [
    {
      icon: 'logo-microsoft',
      // icon: 'grid-outline',
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'سقف کاذب',
      description: 'انواع تایل برای زیباتر شدن سقف‌های شما.',
      wide: true,
    },
    {
      icon: 'bulb-outline',
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'روشنایی',
    },
    {
      icon: 'git-commit-outline',
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'سازه و اتصالات',
    },
  ],

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
        <div dir="ltr">${replaceNumber('0915 559 9674')}</div>
      `,
      href: 'tel:+989155599674',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      icon: 'send-outline',
      headline: 'تلگرام',
      description: 'کانال تلگرام سافیت',
      href: 'https://t.me/soffitcompany',
      target: '_blank',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      icon: 'logo-instagram',
      headline: 'اینستاگرام',
      description: 'صفحه‌ی اینستاگرام سافیت',
      href: 'https://instagram.com/soffit.co',
      target: '_blank',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      icon: 'videocam-outline',
      flipRtl: true,
      headline: 'آپارات',
      description: 'کانال آپارات سافیت',
      href: 'https://www.aparat.com/soffit',
      target: '_blank',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      icon: 'logo-linkedin',
      headline: 'لینکدین',
      description: 'صفحه‌ی لینکدین سافیت',
      href: 'https://www.linkedin.com/company/soffit-co',
      target: '_blank',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      icon: 'logo-youtube',
      headline: 'یوتیوب',
      description: 'کانال یوتیوب سافیت',
      href: 'https://youtube.com/@SOFFITCO',
      target: '_blank',
    },
  ],
  agency: {
    elevated: 1,
    stated: true,
    icon: 'ribbon-outline',
    headline: 'نمایندگی‌ها',
    description: 'لیست نمایندگی‌ها سافیت در سراسر کشور',
    href: '/agency',
    wide: true,
  },
};
