import {contextProvider} from '@alwatr/context';

import {icons} from '../icons.js';

import type {NavigationContext} from '@alwatr/ui-kit2/navigation-bar/navigation-bar.js';


// import type {NavigationContext} from '@alwatr/ui-kit2/navigation-bar/navigation-bar.js';

export const navigationContextSignalName = 'navigation-context';
contextProvider.setValue<NavigationContext>(navigationContextSignalName, {
  currentActive: 'home',
  navigationBar: {
    home: {
      icon: icons.home,
      label: 'Home',
    },
    call: {
      icon: icons.call,
      label: 'Call',
    },
    favorite: {
      icon: icons.star,
      label: 'Favorite',
    },
    triangle: {
      icon: icons.triangle,
      label: 'Menu',
    },
    triangl: {
      icon: icons.triangle,
      label: 'Other',
    },
  },
});
