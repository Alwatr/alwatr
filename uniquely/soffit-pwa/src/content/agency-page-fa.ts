/* eslint-disable max-len */
import {replaceNumber} from '@alwatr/i18n';

import type {PageAgencyContent} from '../type.js';

export const agencyPageContent: PageAgencyContent = {
  topAppBar: {
    type: 'center',
    headline: 'لیست نمایندگی‌های سافیت',
    startIcon: {icon: 'menu-outline', flipRtl: true},
  },

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
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'شعبه مرکزی',
      slot: `
        <div>دفتر مرکزی</div>
        <div dir="ltr">${replaceNumber('0915 301 4404')}</div>
      `,
      href: 'tel:+989153014404',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'کردستان',
      slot: `
        <div>آقای صفایی</div>
        <div dir="ltr">${replaceNumber('0914 381 3925')}</div>
      `,
      href: 'tel:+989143813925',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'گلستان',
      slot: `
        <div>آقای اقلچی</div>
        <div dir="ltr">${replaceNumber('0911 750 5027')}</div>
      `,
      href: 'tel:+989117505027',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'ایلام',
      slot: `
        <div>آقای صیدی</div>
        <div dir="ltr">${replaceNumber('0918 342 8903')}</div>
      `,
      href: 'tel:+989183428903',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'آذربایجان غربی',
      slot: `
        <div>آقای صفایی</div>
        <div dir="ltr">${replaceNumber('0914 381 3925')}</div>
      `,
      href: 'tel:+989143813925',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'خراسان جنوبی',
      slot: `
        <div>آقای محبی</div>
        <div dir="ltr">${replaceNumber('0915 506 9208')}</div>
      `,
      href: 'tel:+989155069208',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'سیستان بلوچستان',
      slot: `
        <div>آقای قاسمی</div>
        <div dir="ltr">${replaceNumber('0915 540 9620')}</div>
      `,
      href: 'tel:+989155409620',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'کرمانشاه',
      slot: `
        <div>آقای حاجتی</div>
        <div dir="ltr">${replaceNumber('0918 559 0431')}</div>
      `,
      href: 'tel:+989185590431',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'کرمان',
      slot: `
        <div>آقای رضایی</div>
        <div dir="ltr">${replaceNumber('0913 563 1711')}</div>
      `,
      href: 'tel:+989135631711',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'همدان',
      slot: `
        <div>آقای طهماسبی</div>
        <div dir="ltr">${replaceNumber('0918 554 0527')}</div>
      `,
      href: 'tel:+989185540527',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'خراسان رضوی',
      slot: `
        <div>آقای محبی</div>
        <div dir="ltr">${replaceNumber('0915 506 9208')}</div>
      `,
      href: 'tel:+989155069208',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'خراسان شمالی',
      slot: `
        <div>آقای محبی</div>
        <div dir="ltr">${replaceNumber('0915 506 9208')}</div>
      `,
      href: 'tel:+989155069208',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'اصفهان',
      slot: `
        <div>آقای بهنام‌پور</div>
        <div dir="ltr">${replaceNumber('0913 339 1828')}</div>
      `,
      href: 'tel:+989133391828',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'سمنان',
      slot: `
        <div>آقای حافظی</div>
        <div dir="ltr">${replaceNumber('0919 276 0806')}</div>
      `,
      href: 'tel:+989192760806',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'کیش',
      slot: `
        <div>آقای سالاری</div>
        <div dir="ltr">${replaceNumber('0990 349 8425')}</div>
      `,
      href: 'tel:+989903498425',
    },
    // {
    //   elevated: 1,
    //   highlight: true,
    //   stated: true,
    //   headline: 'زنجان',
    //   slot: `
    //     <div>آقای نقی‌لو</div>
    //     <div dir="ltr">${replaceNumber('0912 067 6503')}</div>
    //   `,
    //   href: 'tel:+989120676503',
    // },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'اردبیل',
      slot: `
        <div>آقای پاسبانی</div>
        <div dir="ltr">${replaceNumber('0914 150 4203')}</div>
      `,
      href: 'tel:+989141504203',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'چهارمحال و بختیاری',
      slot: `
        <div>آقای فروزنده</div>
        <div dir="ltr">${replaceNumber('0913 283 9193')}</div>
      `,
      href: 'tel:+989132839193',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'کهگیلویه و بویراحمد',
      slot: `
        <div>آقای عظیمی فر</div>
        <div dir="ltr">${replaceNumber('0917 432 6132')}</div>
      `,
      href: 'tel:+989174326132',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'آذربایجان شرقی',
      slot: `
        <div>آقای سلیمانی</div>
        <div dir="ltr">${replaceNumber('0935 707 1904')}</div>
      `,
      href: 'tel:+989357071904',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      headline: 'خوزستان',
      slot: `
        <div>آقای شمس</div>
        <div dir="ltr">${replaceNumber('0916 603 3612')}</div>
      `,
      href: 'tel:+989166033612',
    },
  ],
};
