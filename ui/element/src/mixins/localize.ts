import {l10n} from '@alwatr/i18n';

import type {LoggerMixinInterface} from './logging.js';
import type {Constructor} from '@alwatr/type';

export declare class LocalizeMixinInterface extends LoggerMixinInterface {
  protected _signalListenerList: Array<unknown>;
  protected l10n: {
    localize: typeof l10n.localize;
    formatNumber: typeof l10n.formatNumber;
  };
}

export function LocalizeMixin<T extends Constructor<LoggerMixinInterface>>(
    superClass: T,
): Constructor<LocalizeMixinInterface> & T {
  class LocalizeMixinClass extends superClass {
    protected _signalListenerList: Array<unknown> = [];

    protected l10n = {
      localize: l10n.localize,
      formatNumber: l10n.formatNumber,
    };

    override connectedCallback(): void {
      super.connectedCallback();
      this._signalListenerList.push(
          l10n.resourceChangeSignal.addListener(() => {
            this._l10nResourceChanged();
          }),
      );
    }

    protected _l10nResourceChanged(): void {
      this._logger.logMethod('_l10nResourceChange');
      this.requestUpdate();
    }
  }

  return LocalizeMixinClass as unknown as Constructor<LocalizeMixinInterface> & T;
}
