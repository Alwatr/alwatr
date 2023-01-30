import {localeConsumer} from '@alwatr/i18n';

import type {LoggerMixinInterface} from './logging.js';
import type {Constructor} from '@alwatr/type';

export declare class DirectionMixinInterface extends LoggerMixinInterface {
  protected _signalListenerList: Array<unknown>;
  protected _dirParent: HTMLElement | null;
  protected _updateDir: () => void;
  protected _localeChange: () => void;
}

export function DirectionMixin<T extends Constructor<LoggerMixinInterface>>(
    superClass: T,
): Constructor<DirectionMixinInterface> & T {
  class DirectionMixinClass extends superClass {
    protected _signalListenerList: Array<unknown> = [];
    protected _dirParent: HTMLElement | null = null;

    override connectedCallback(): void {
      super.connectedCallback();
      this._signalListenerList.push(localeConsumer.subscribe(this._localeChanged.bind(this)));
    }

    /**
     * Update direction from this._dirParent or l10n.locale
     */
    protected _updateDir(): void {
      this._logger.logMethod('_updateDir');
      const dir = this._dirParent?.dir || localeConsumer.getValue()?.direction || document.documentElement.dir;
      this.setAttribute('dir', dir === 'rtl' ? dir : 'ltr');
    }

    protected _localeChanged(): void {
      this._logger.logMethod('_localeChanged');
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
      return this._updateDir();
    }
  }

  return DirectionMixinClass as unknown as Constructor<DirectionMixinInterface> & T;
}
