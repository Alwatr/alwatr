/* eslint-disable max-len */
import type {PageHomeContent} from '../type.js';

export const homePageContent: PageHomeContent = {
  topAppBar: {
    type: 'center',
    headline: 'همایش‌ گامی‌ به‌ سوی‌ آرامش',
    startIcon: {icon: 'menu-outline', clickSignalId: 'app-menu-click-event'},
    endIconList: [],
    tinted: 1,
  },

  boxList: [
    {
      wide: true,
      elevated: 1,
      stated: true,
      icon: 'heart-outline',
      headline: 'درباره همایش‌ گامی‌به‌سوی‌آرامش',
      slot: `
      سری همایش‌های گامی به سوی آرامش در زندگی همسران از نگاه دین. با سخنرانی آقای دکتر مومنی
      `,
    },
    {
      wide: true,
      elevated: 1,
      stated: true,
      icon: 'person-add-outline',
      headline: 'ثبت‌نام در همایش',
      href: '/register',
    },
  ],
};
