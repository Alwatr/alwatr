import type {NavigationDrawer} from './signals/navigation-drawer.js';

declare global {
  interface AlwatrSignals {
    readonly 'navigation-drawer': NavigationDrawer;
  }

  // interface AlwatrRequestSignals {
  //   readonly 'content-change': number;
  // }
}
