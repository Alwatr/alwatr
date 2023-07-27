import {AlwatrContextSignal} from '@alwatr/signal2';

import type {AlwatrIconOptions} from '@alwatr/ui-kit2/icon/icon.js';

export interface AppNavigation {
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

class AppNavigationContext extends AlwatrContextSignal<AppNavigation> {}

export const appNavigationContext = new AppNavigationContext({name: 'app-navigation-context'});
