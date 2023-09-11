import {AlwatrContextSignal} from '@alwatr/signal2';

import {icons} from '../icons.js';

import type {NavigationBarContent} from '@alwatr/ui-kit2/navigation-bar/navigation-bar.js';
import type {NavigationDrawerContent} from '@alwatr/ui-kit2/navigation-drawer/navigation-drawer.js';
import type {NavigationRailContent} from '@alwatr/ui-kit2/navigation-rail/navigation-rail.js';
import type {CenterTopAppBarContent} from '@alwatr/ui-kit2/top-app-bar/center-top-app-bar.js';

export interface AppNavigationContext {
  navigationBar: NavigationBarContent;
  navigationRail: NavigationRailContent;
  navigationDrawer: NavigationDrawerContent;
}

export const appNavigationContext = new AlwatrContextSignal<AppNavigationContext>({name: 'app-navigation-context'});
export const topAppBarContext = new AlwatrContextSignal<CenterTopAppBarContent>({name: 'top-app-bar-context'});

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

topAppBarContext.setValue({
  title: 'الوتر دمو',
  startIcon: {svg: icons.person, onClick: () => {console.log('`startIcon` clicked');}},
  endIconList: [{svg: icons.refresh, onClick: () => {console.log('`refreshIcon` clicked');}}, {svg: icons.home, onClick: () => {console.log('`homeIcon` clicked');}}],
});
