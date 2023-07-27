import {AlwatrContextSignal} from '@alwatr/signal2';

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
