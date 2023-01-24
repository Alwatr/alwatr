import type {NavigationDrawer} from './signals/navigation-drawer.js';
import type {SalavatCount} from './signals/salavat-count.js';
import type {SalavatSubmitButton} from './signals/salavat-submit-button.js';
import type {SnackBar} from './signals/snack-bar.js';

declare global {
  interface AlwatrSignals {
    readonly 'navigation-drawer': NavigationDrawer;
    readonly 'snack-bar': Partial<SnackBar>;
    readonly 'salavat-count': SalavatCount;
    readonly 'salavat-submit-button': SalavatSubmitButton;
    readonly 'salavat-increase': number;
  }

  interface AlwatrRequestSignals {
    readonly 'salavat-count': number;
  }
}
