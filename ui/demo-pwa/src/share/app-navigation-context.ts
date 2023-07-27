import {AlwatrContextSignal} from '@alwatr/signal2';

import {icons} from '../icons.js';

import type {AlwatrIconOptions} from '@alwatr/ui-kit2/icon/icon.js';
import type {NavigationDrawerContent} from '@alwatr/ui-kit2/navigation-drawer/navigation-drawer.js';

export interface AppNavigationContext {
  navigationBar: {
    selected: string;
    itemList: Record<
      string,
      {
        label: string;
        icon: AlwatrIconOptions;
        badge?: string;
      }
    >;
  };
  navigationRail: {
    selected: string;
    itemList: Record<
      string,
      {
        label: string;
        icon: AlwatrIconOptions;
        badge?: string;
      }
    >;
  };
  navigationDrawer: NavigationDrawerContent;
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
    selected: 'given',
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
