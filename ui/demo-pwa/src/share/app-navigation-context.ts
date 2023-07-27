import {AlwatrContextSignal} from '@alwatr/signal2';
import {AlwatrNavigationRailContent} from '@alwatr/ui-kit2/navigation-rail/navigation-rail.js';

import {icons} from '../icons.js';

import type {AlwatrNavigationBarContent} from '@alwatr/ui-kit2/navigation-bar/navigation-bar.js';
import type {AlwatrNavigationDrawerContent} from '@alwatr/ui-kit2/navigation-drawer/navigation-drawer.js';

export interface AppNavigationContext {
  navigationBar: AlwatrNavigationBarContent;
  navigationRail: AlwatrNavigationRailContent;
  navigationDrawer: AlwatrNavigationDrawerContent;
}

export const appNavigationContext = new AlwatrContextSignal<AppNavigationContext>({name: 'app-navigation-context'});

appNavigationContext.setValue({
  navigationRail: {
    selected: 'given',
    itemList: {
      given: {label: 'دریافتی', icon: {svg: icons.menu}},
      contact: {label: 'مخاطبین', icon: {svg: icons.person}},
      send: {label: 'ارسال', icon: {svg: icons.send}},
      archive: {label: 'آرشیو', icon: {svg: icons.archive}},
      trash: {label: 'زباله', icon: {svg: icons.trash}},
    },
  },
  navigationBar: {
    selected: 'send',
    itemList: {
      given: {label: 'دریافتی', icon: {svg: icons.menu}},
      contact: {label: 'مخاطبین', icon: {svg: icons.person}},
      send: {label: 'ارسال', icon: {svg: icons.send}},
      archive: {label: 'آرشیو', icon: {svg: icons.archive}},
      trash: {label: 'زباله', icon: {svg: icons.trash}},
    },
  },
  navigationDrawer: {
    title: '',
    selected: 'contact',
    itemList: {
      given: {label: 'دریافتی', icon: {svg: icons.menu}},
      contact: {label: 'مخاطبین', icon: {svg: icons.person}},
      send: {label: 'ارسال', icon: {svg: icons.send}},
      archive: {label: 'آرشیو', icon: {svg: icons.archive}},
      trash: {label: 'زباله', icon: {svg: icons.trash}},
    },
  },
});
