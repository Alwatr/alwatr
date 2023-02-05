import {unsubscribe} from '@alwatr/signal/core.js';

import type {LoggerMixinInterface} from './logging.js';
import type {ListenerSpec} from '@alwatr/signal/type.js';
import type {Constructor} from '@alwatr/type';

export declare class SignalMixinInterface extends LoggerMixinInterface {
  protected _signalListenerList: Array<ListenerSpec>;
}

export function SignalMixin<T extends Constructor<LoggerMixinInterface>>(
    superClass: T,
): Constructor<SignalMixinInterface> & T {
  class SignalMixinClass extends superClass {
    protected _signalListenerList: Array<ListenerSpec> = [];

    override disconnectedCallback(): void {
      for (const listener of this._signalListenerList) {
        unsubscribe(listener);
      }
      this._signalListenerList.length = 0;
      this._signalListenerList = [];
      super.disconnectedCallback();
    }
  }

  return SignalMixinClass as unknown as Constructor<SignalMixinInterface> & T;
}
