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
    selected: 'home',
    itemList: {
      favorites: {label: 'علاقه مندی ها', icon: {svg: icons.star}},
      home: {label: 'خانه', icon: {svg: icons.home}},
      tours: {label: 'تورها', icon: {svg: icons.triangle}},
      call: {label: 'تماس با ما', icon: {svg: icons.call}},
    },
  },
  navigationBar: {
    selected: 'home',
    itemList: {
      menu: {label: 'منو', icon: {svg: icons.menu}},
      favorites: {label: 'علاقه مندی ها', icon: {svg: icons.star}},
      home: {label: 'خانه', icon: {svg: icons.home}},
      tours: {label: 'تورها', icon: {svg: icons.triangle}},
      call: {label: 'تماس با ما', icon: {svg: icons.call}},
    },
  },
  navigationDrawer: {
    title: '',
    selected: 'home',
    itemList: {
      favorites: {label: 'علاقه مندی ها', icon: {svg: icons.star}},
      home: {label: 'خانه', icon: {svg: icons.home}},
      tours: {label: 'تورها', icon: {svg: icons.triangle}},
      call: {label: 'تماس با ما', icon: {svg: icons.call}},
    },
  },
});

topAppBarContext.setValue({
  title: 'الوتر دمو',
  startIcon: {svg: icons.home, onClick: () => {console.log('`startIcon` clicked');}},
  endIconList: [{svg: icons.refresh, onClick: () => {console.log('`refreshIcon` clicked');}}, {svg: icons.home, onClick: () => {console.log('`homeIcon` clicked');}}],
});
