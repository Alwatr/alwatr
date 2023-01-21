import {html} from '@alwatr/element';

import './pages/page-home.js';
import './pages/page-about.js';
import './pages/page-campaign.js';

import type {Routes} from './types/route.js';

const routes: Routes = {
  home: {
    title: 'صفحه اصلی',
    icon: {
      name: 'salavat',
      urlPrefix: '/images/icons/',
    },
    render: () => html`<alwatr-page-home></alwatr-page-home>`,
  },
  campaign: {
    title: 'کمپین',
    twoToneIcon: true,
    icon: {
      name: 'megaphone',
    },
    render: () => html`<alwatr-page-campaign></alwatr-page-campaign>`,
  },
  about: {
    title: 'داستان ما',
    twoToneIcon: true,
    icon: {
      name: 'people',
    },
    render: () => html`<alwatr-page-about></alwatr-page-about>`,
  },
};
export default routes;
