import {l18eContextConsumer} from '@alwatr/i18n';

import type {SignalMixinInterface} from './signal.js';
import type {Constructor, L18eContext} from '@alwatr/type';

export declare class LocalizeMixinInterface extends SignalMixinInterface {
  protected _l18eContextUpdated(_l18eContext: L18eContext): void;
}

export function LocalizeMixin<T extends Constructor<SignalMixinInterface>>(
    superClass: T,
): Constructor<LocalizeMixinInterface> & T {
  class LocalizeMixinClass extends superClass {
    override connectedCallback(): void {
      super.connectedCallback();
      this._signalListenerList.push(
          l18eContextConsumer.subscribe(this._l18eContextUpdated.bind(this)),
      );
    }

    /**
     * On localization resource context updated.
     */
    protected _l18eContextUpdated(l18eContext: L18eContext): void {
      this._logger.logMethodArgs('_l18eContextUpdated', l18eContext.meta);
      this.requestUpdate();
    }
  }

  return LocalizeMixinClass as unknown as Constructor<LocalizeMixinInterface> & T;
}
