import {l10n} from '@alwatr/i18n';
import {LitElement} from 'lit';

import type {Constructor} from '../type.js';

export declare class DirectionMixinInterface extends LitElement {
  protected _signalListenerList: Array<unknown>;
  protected _dirParent: HTMLElement | null;
  protected _updateDir: () => void;
  protected _localeChange: () => void;
}

export function DirectionMixin<T extends Constructor<LitElement>>(
    superClass: T,
): Constructor<DirectionMixinInterface> & T {
  class DirectionMixinClass extends superClass {
    protected _signalListenerList: Array<unknown> = [];
    protected _dirParent: HTMLElement | null = null;

    override connectedCallback(): void {
      super.connectedCallback();
      this._signalListenerList.push(
          l10n.localeChangeSignal.addListener(() => {
            this._localeChange();
          }),
      );
    }

    /**
     * Update direction from this._dirParent or l10n.locale
     */
    protected _updateDir(): void {
      const dir = this._dirParent?.dir || l10n.locale?.direction || document.documentElement.dir;
      this.setAttribute('dir', dir === 'rtl' ? dir : 'ltr');
    }

    protected _localeChange(): void {
      if (this._dirParent !== null) {
        return this._updateDir();
      }
      // else
      let dirParent = (this.assignedSlot || this.parentNode) as (HTMLElement | null);
      while (dirParent != null && dirParent !== document.documentElement && !dirParent.dir) {
        // prettier-ignore
        dirParent = (
            dirParent.assignedSlot ||
            dirParent.parentNode ||
            (dirParent as unknown as ShadowRoot).host
          ) as HTMLElement;
      }

      this._dirParent = dirParent?.dir ? dirParent : null;
      return this._updateDir();
    }
  }

  return DirectionMixinClass as unknown as Constructor<DirectionMixinInterface> & T;
}
