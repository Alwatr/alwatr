import {AlwatrContextSignal} from '@alwatr/signal2';

import type {AlwatrIconOptions} from '@alwatr/ui-kit2/icon/icon.js';
import type {NavigationBarContent} from '@alwatr/ui-kit2/navigation-drawer/navigation-drawer.js';

export interface AppNavigationContext {
  navigationBar: NavigationBarContent;
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
  navigationDrawer: {
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
}

export const appNavigationContext = new AlwatrContextSignal<AppNavigationContext>({name: 'app-navigation-context'});
