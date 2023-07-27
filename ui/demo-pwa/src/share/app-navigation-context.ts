import {AlwatrContextSignal} from '@alwatr/signal2';

export interface AppNavigation {
  navigationBar: {
    selected: string;
    itemList: Record<
      string,
      {
        label: string;
        icon: string;
        iconFlipRtl?: boolean;
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
        icon: string;
        iconFlipRtl?: boolean;
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
        icon: string;
        iconFlipRtl?: boolean;
        badge?: string;
      }
    >;
  };
}

class AppNavigationContext extends AlwatrContextSignal<AppNavigation> {}

export const appNavigationContext = new AppNavigationContext({name: 'app-navigation-context'});
