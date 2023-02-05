/* eslint-disable max-len */
import {html} from '@alwatr/element';

import type {PageHomeContent} from '../type';

export const homePageContent: PageHomeContent = {
  about: {
    wide: true,
    elevated: 1,
    stated: true,
    // icon: 'logo-microsoft',
    headline: 'بازرگانی سافیت',
    content: html`
      سافیت با هدف بهینه سازی در ساخت وساز و همچنین کاهش هزینه ها تامین و نگه داری ساختمان در بلند مدت اقدام به تولید محصولات گچی نمود.<br/>
      همچنین با توجه به گسترش بازار و نیاز مشتریان تنوع طرح و جنس محصولات خود را افزایش داده است.
      از مزایا سقف ها سافیت می‌توان به سرعت بالا در اجرا، عایق صوت، رطوبت و حرارت نام برد. همچنین می‌توان به راحتی در دسترسی به تاسیسات نیز اشاره کرد.<br/>
      سافیت در نظر دارد سهم خود را در استفاده از،مواد اولیه  تجدید پذیر در تولید جهت حفظ و نگهداری محیط زیست برای آیندگان افزایش دهد.
    `,
  },

  catalogue: {
    elevated: 2,
    highlight: true,
    stated: true,
    icon: 'cloud-download-outline',
    headline: 'دانلود کاتالوگ',
    description: 'دانلود کاتالوگ معرفی محصولات بازرگانی سافیت',
    href: 'https://www.dropbox.com/s/6ywy23qql7iq31p/soffit-product-catalogue.pdf?dl=1',
    target: 'download',
  },

  // contact: {
  //   elevated: 2,
  //   highlight: true,
  //   stated: true,
  //   icon: 'call-outline',
  //   flipRtl: true,
  //   headline: 'تماس با ما',
  //   description: 'دفتر مرکزی: ۰۹۱۵۵۵۹۹۶۷۴',
  //   href: 'tel:+989155599674',
  // },

  productList: [
    {
      icon: 'logo-microsoft',
      // icon: 'grid-outline',
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'سقف کاذب',
      description: 'متن توضیحات...',
      wide: true,
    },
    {
      icon: 'bulb-outline',
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'روشنایی',
      description: 'متن توضیحات...',
    },
    {
      icon: 'git-commit-outline',
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'سازه‌ و‌ اتصالات',
      description: 'متن توضیحات...',
    },
  ],

  socialList: [
    {
      elevated: 2,
      highlight: true,
      stated: true,
      icon: 'logo-instagram',
      headline: 'اینستاگرام',
      description: 'صفحه‌ی اینستاگرام بازرگانی سافیت',
      href: 'https://instagram.com/soffit.co',
      target: '_blank',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      icon: 'send-outline',
      headline: 'تلگرام',
      description: 'کانال تلگرام بازرگانی سافیت',
      href: 'https://t.me/soffitcompany',
      target: '_blank',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      icon: 'logo-linkedin',
      headline: 'لینکدین',
      description: 'صفحه‌ی لینکدین بازرگانی سافیت',
      href: 'https://www.linkedin.com/company/soffit-co',
      target: '_blank',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      icon: 'videocam-outline',
      headline: 'آپارات',
      description: 'کانال آپارات بازرگانی سافیت',
      href: 'https://www.aparat.com/soffit',
      target: '_blank',
    },
  ],

  agencyList: [
    {
      elevated: 1,
      stated: true,
      icon: 'ribbon-outline',
      headline: 'نمایندگی‌ها',
      description: 'لیست نمایندگی‌ها سافیت در سراسر کشور',
      wide: true,
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'شعبه‌مرکزی',
      content: html`
        <div>دفتر مرکزی</div>
        <div dir="ltr">0915 301 4404</div>
      `,
      href: 'tel:+989153014404',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'کردستان',
      content: html`
        <div>آقای صفایی</div>
        <div dir="ltr">0914 381 3925</div>
      `,
      href: 'tel:+989143813925',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'گلستان',
      content: html`
        <div>آقای اقلچی</div>
        <div dir="ltr">0911 750 5027</div>
      `,
      href: 'tel:+989117505027',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'ایلام',
      content: html`
        <div>آقای صیدی</div>
        <div dir="ltr">0918 342 8903</div>
      `,
      href: 'tel:+989183428903',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'آذربایجان‌غربی',
      content: html`
        <div>آقای صفایی</div>
        <div dir="ltr">0914 381 3925</div>
      `,
      href: 'tel:+989143813925',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'خراسان‌جنوبی',
      content: html`
        <div>آقای محبی</div>
        <div dir="ltr">0915 506 9208</div>
      `,
      href: 'tel:+989155069208',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'زاهدان',
      content: html`
        <div>آقای قاسمی</div>
        <div dir="ltr">0915 540 9620</div>
      `,
      href: 'tel:+989155409620',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'کرمانشاه',
      content: html`
        <div>آقای حاجتی</div>
        <div dir="ltr">0918 559 0431</div>
      `,
      href: 'tel:+989185590431',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'کرمان',
      content: html`
        <div>آقای رضایی</div>
        <div dir="ltr">0913 563 1711</div>
      `,
      href: 'tel:+989135631711',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'همدان',
      content: html`
        <div>آقای طهماسبی</div>
        <div dir="ltr">0918 554 0527</div>
      `,
      href: 'tel:+989185540527',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'خراسان‌رضوی',
      content: html`
        <div>آقای محبی</div>
        <div dir="ltr">0915 506 9208</div>
      `,
      href: 'tel:+989155069208',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'خراسان‌شمالی',
      content: html`
        <div>آقای محبی</div>
        <div dir="ltr">0915 506 9208</div>
      `,
      href: 'tel:+989155069208',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'اصفهان',
      content: html`
        <div>آقای بهنام‌پور</div>
        <div dir="ltr">0913 339 1828</div>
      `,
      href: 'tel:+989133391828',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'سمنان',
      content: html`
        <div>آقای حافظی</div>
        <div dir="ltr">0919 276 0806</div>
      `,
      href: 'tel:+989192760806',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'کیش',
      content: html`
        <div>آقای سالاری</div>
        <div dir="ltr">0990 349 8425</div>
      `,
      href: 'tel:+989903498425',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'زنجان',
      content: html`
        <div>آقای نقی‌لو</div>
        <div dir="ltr">0912 067 6503</div>
      `,
      href: 'tel:+989120676503',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'اردبیل',
      content: html`
        <div>آقای پاسبانی</div>
        <div dir="ltr">0914 150 4203</div>
      `,
      href: 'tel:+989141504203',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'بندرعباس',
      content: html`
        <div>آقای کمالی‌پور</div>
        <div dir="ltr">0930 380 0134</div>
      `,
      href: 'tel:+989303800134',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'چهارمحال‌ و‌ بختیاری',
      content: html`
        <div>آقای فروزنده</div>
        <div dir="ltr">0913 283 9193</div>
      `,
      href: 'tel:+989132839193',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'کهگیلویه‌ و‌ بویراحمد',
      content: html`
        <div>آقای عظیمی‌فر</div>
        <div dir="ltr">0917 432 6132</div>
      `,
      href: 'tel:+989174326132',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'آذربایجان‌شرقی',
      content: html`
        <div>آقای سلیمانی</div>
        <div dir="ltr">0935 707 1904</div>
      `,
      href: 'tel:+989357071904',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'شیراز',
      content: html`
        <div>آقای خدامی</div>
        <div dir="ltr">0917 113 2262</div>
      `,
      href: 'tel:+989171132262',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'خوزستان',
      content: html`
        <div>آقای شمس</div>
        <div dir="ltr">0916 603 3612</div>
      `,
      href: 'tel:+989166033612',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'ورامین',
      content: html`
        <div>آقای بیدگلی</div>
        <div dir="ltr">0990 373 0377</div>
      `,
      href: 'tel:+989903730377',
    },
  ],
};
