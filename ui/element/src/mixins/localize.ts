import {l18eContextConsumer} from '@alwatr/i18n';

import type {LoggerMixinInterface} from './logging.js';
import type {ListenerSpec} from '@alwatr/signal';
import type {Constructor} from '@alwatr/type';

export declare class LocalizeMixinInterface extends LoggerMixinInterface {
  private __l10nResourceListener: ListenerSpec;
}

export function LocalizeMixin<T extends Constructor<LoggerMixinInterface>>(
    superClass: T,
): Constructor<LocalizeMixinInterface> & T {
  class LocalizeMixinClass extends superClass {
    private __l10nResourceListener?: ListenerSpec;

    override connectedCallback(): void {
      super.connectedCallback();
      this.__l10nResourceListener = l18eContextConsumer.subscribe(() => {
        this._l10nResourceChanged();
      });
    }

    override disconnectedCallback(): void {
      if (this.__l10nResourceListener != null) {
        l18eContextConsumer.unsubscribe(this.__l10nResourceListener);
      }
      super.disconnectedCallback();
    }

    protected _l10nResourceChanged(): void {
      this._logger.logMethod('_l10nResourceChange');
      this.requestUpdate();
    }
  }

  return LocalizeMixinClass as unknown as Constructor<LocalizeMixinInterface> & T;
}
