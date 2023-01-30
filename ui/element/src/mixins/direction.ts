import {localeContextConsumer} from '@alwatr/i18n';

import {SignalMixinInterface} from './signal.js';

import type {Constructor, LocaleContext} from '@alwatr/type';

export declare class DirectionMixinInterface extends SignalMixinInterface {
  protected _dirParent: HTMLElement | null;
  protected _localeChange: (localeContext: LocaleContext) => void;
  protected _updateDir: () => void;
}

export function DirectionMixin<T extends Constructor<SignalMixinInterface>>(
    superClass: T,
): Constructor<DirectionMixinInterface> & T {
  class DirectionMixinClass extends superClass {
    protected _dirParent: HTMLElement | null = null;

    override connectedCallback(): void {
      super.connectedCallback();
      this._signalListenerList.push(localeContextConsumer.subscribe(this._localeChanged.bind(this)));
    }

    /**
     * Update direction from this._dirParent or l10n.locale
     */
    protected _updateDir(): void {
      this._logger.logMethod('_updateDir');
      const dir = this._dirParent?.dir || localeContextConsumer.getValue()?.direction || document.documentElement.dir;
      this.setAttribute('dir', dir === 'rtl' ? dir : 'ltr');
    }

    /**
     * On locale context updated.
     */
    protected _localeChanged(localeContext: LocaleContext): void {
      this._logger.logMethodArgs('_localeChanged', localeContext.code);
      console.time('_localeChanged');
      if (this._dirParent !== null) {
        return this._updateDir();
      }
      // else
      let dirParent = (this.assignedSlot || this.parentNode) as HTMLElement | null;
      while (dirParent != null && dirParent !== document.documentElement && !dirParent.dir) {
        // prettier-ignore
        dirParent = (
            dirParent.assignedSlot ||
            dirParent.parentNode ||
            (dirParent as unknown as ShadowRoot).host
          ) as HTMLElement;
      }

      this._dirParent = dirParent?.dir ? dirParent : null;
      console.timeEnd('_localeChanged');
      return this._updateDir();
    }
  }

  return DirectionMixinClass as unknown as Constructor<DirectionMixinInterface> & T;
}
