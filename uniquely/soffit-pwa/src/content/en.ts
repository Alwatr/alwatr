/* eslint-disable max-len */
import {html} from '@alwatr/element';

import type {PageHomeContent} from '../type';

export const homePageContent: PageHomeContent = {
  about: {
    wide: true,
    elevated: 1,
    stated: true,
    // icon: 'logo-microsoft',
    headline: 'Soffit Trading',
    slot: html`
      Soffit started producing plaster products with the aim of optimizing the construction and also reducing the cost of supply and maintenance of the building in the long term.<br/>
      Also, according to the expansion of the market and the needs of customers, it has increased the variety of designs and materials of its products.
      Among the advantages of Soffit roofs, we can mention high speed of implementation, insulation of sound, humidity and heat. It can also be mentioned the ease of access to the facilities.<br/>
      Soffit intends to increase its share in the use of renewable raw materials in production to preserve the environment for future generations.
    `,
  },

  catalogue: {
    elevated: 2,
    highlight: true,
    stated: true,
    icon: 'cloud-download-outline',
    headline: 'Download Catalogue',
    description: 'Download the introduction catalog of Soffit commercial products',
    href: 'https://www.dropbox.com/s/6ywy23qql7iq31p/soffit-product-catalogue.pdf?dl=1',
    target: 'download',
  },

  productList: [
    {
      icon: 'logo-microsoft',
      // icon: 'grid-outline',
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'Ceiling Tile',
      description: 'All kinds of tiles to make your roofs more beautiful.',
      wide: true,
    },
    {
      icon: 'bulb-outline',
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'Lighting',
    },
    {
      icon: 'git-commit-outline',
      elevated: 2,
      highlight: true,
      stated: true,
      headline: 'Structure & connections',
    },
  ],

  socialList: [
    {
      elevated: 2,
      highlight: true,
      stated: true,
      icon: 'call-outline',
      flipRtl: true,
      headline: 'Contact Us',
      slot: html`
        <div>Main branch</div>
        <div dir="ltr">+98 915 559 9674</div>
      `,
      href: 'tel:+989155599674',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      icon: 'logo-instagram',
      headline: 'Instagram',
      description: 'Instagram page of Soffit Trading.',
      href: 'https://instagram.com/soffit.co',
      target: '_blank',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      icon: 'send-outline',
      headline: 'Telegram',
      description: 'Telegram Channel of Soffit Trading.',
      href: 'https://t.me/soffitcompany',
      target: '_blank',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      icon: 'logo-linkedin',
      headline: 'Linkedin',
      description: 'Linkedin page of Soffit Trading',
      href: 'https://www.linkedin.com/company/soffit-co',
      target: '_blank',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      icon: 'logo-youtube',
      headline: 'Youtube',
      description: 'Youtube channel of Soffit Trading',
      href: 'https://youtube.com/@SOFFITCO',
      target: '_blank',
    },
    {
      elevated: 2,
      highlight: true,
      stated: true,
      icon: 'videocam-outline',
      headline: 'Aparat',
      description: 'Aparat channel of Soffit Trading',
      href: 'https://www.aparat.com/soffit',
      target: '_blank',
    },
  ],

  agencyList: [],
};
