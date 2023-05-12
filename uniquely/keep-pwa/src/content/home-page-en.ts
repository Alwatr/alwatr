/* eslint-disable max-len */

import type {PageHomeContent} from '../type.js';

export const homePageContent: PageHomeContent = {
  topAppBar: {
    type: 'center',
    headline: 'Keep Collection',
    startIcon: {icon: 'menu-outline', flipRtl: true},
    endIconList: [{icon: 'globe-outline', clickSignalId: 'language-button-click-event'}],
  },
  about: {
    elevated: 1,
    stated: true,
    wide: true,
    headline: 'About Us',
    description:
      'Keep is an Iranian holding company in the field of building materials and stone veneer manufacturing. It is engaged in the production and distribution of construction services. The factory operates with the aim of distributing construction products in Iranian and international markets. The products produced by this collection are of high quality and are accompanied by experienced staff committed to customer satisfaction.',
  },
  product: {
    elevated: 1,
    highlight: true,
    stated: true,
    wide: true,
    icon: 'cart-outline',
    headline: 'View Products',
  },
  catalogue: {
    elevated: 1,
    highlight: true,
    stated: true,
    icon: 'cloud-download-outline',
    flipRtl: true,
    headline: 'Download Catalogue',
    description: 'Download the catalogue introducing Keep products',
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
      headline: 'Contact Us',
      slot: '<div>Direct Contact Number</div><div dir="ltr">0915 101 1507</div>',
      href: 'tel:+989151011507',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      icon: 'send-outline',
      headline: 'Telegram',
      description: 'Keep Telegram Channel',
      href: 'https://t.me/keeperco',
      target: '_blank',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      icon: 'logo-instagram',
      headline: 'Instagram',
      description: 'Keep Instagram Page',
      href: 'https://instagram.com/keeperco',
      target: '_blank',
    },
    {
      elevated: 1,
      highlight: true,
      stated: true,
      icon: 'videocam-outline',
      flipRtl: true,
      headline: 'Aparat',
      description: 'Keep Aparat Channel',
      href: 'https://www.aparat.com/keeperco',
      target: '_blank',
    },
  ],
};
