import {contextProvider} from '@alwatr/context';
import {StringifyableRecord} from '@alwatr/type';

import {icons} from '../icons.js';

export const navigationContextSignalName = 'navigation-context';
contextProvider.setValue(navigationContextSignalName, {
  currentActive: 'home',
  navigationBar: [
    {
      id: 'home',
      icon: icons.homeOutline,
      selectedIcon: icons.home,
      label: 'خانه',
    },
    {
      id: 'call',
      icon: icons.callOutline,
      selectedIcon: icons.call,
      label: 'تماس',
    },
    {
      id: 'favorite',
      icon: icons.starOutline,
      selectedIcon: icons.star,
      label: 'علاقه‌مندی‌ها',
    },
    {
      id: 'triangle',
      icon: icons.triangleOutline,
      selectedIcon: icons.triangle,
      label: 'منو',
    },
    {
      id: 'other',
      icon: icons.triangleOutline,
      selectedIcon: icons.triangle,
      label: 'بقیه‌ش',
    },
  ] as unknown as StringifyableRecord,
  navigationDrawer: {
    headline: 'عناوین مهم',
    mainItems: [
      {
        id: 'home',
        icon: icons.homeOutline,
        selectedIcon: icons.home,
        label: 'خانه',
      },
      {
        id: 'call',
        icon: icons.callOutline,
        selectedIcon: icons.call,
        label: 'تماس',
        badge: '+۹۹',
      },
      {
        id: 'favorite',
        icon: icons.starOutline,
        selectedIcon: icons.star,
        label: 'علاقه‌مندی‌ها',
      },
      {
        id: 'triangle',
        icon: icons.triangleOutline,
        selectedIcon: icons.triangle,
        label: 'منو',
      },
      {
        id: 'other',
        icon: icons.triangleOutline,
        selectedIcon: icons.triangle,
        label: 'بقیه‌ش',
      },
    ],
  } as unknown as StringifyableRecord,
});
