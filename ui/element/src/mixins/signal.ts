import {unsubscribe} from '@alwatr/signal/core.js';

import type {LoggerMixinInterface} from './logging.js';
import type {ListenerSpec} from '@alwatr/signal/type.js';
import type {Constructor, SingleOrArray} from '@alwatr/type';

export declare class SignalMixinInterface extends LoggerMixinInterface {
  private _signalListenerList: Array<ListenerSpec>;
  protected _addSignalListeners(listeners: SingleOrArray<ListenerSpec>): void;
}

export function SignalMixin<T extends Constructor<LoggerMixinInterface>>(
    superClass: T,
): Constructor<SignalMixinInterface> & T {
  class SignalMixinClass extends superClass {
    private _signalListenerList: Array<ListenerSpec> = [];

    protected _addSignalListeners(listeners: SingleOrArray<ListenerSpec>): void {
      if (Array.isArray(listeners)) {
        this._signalListenerList = this._signalListenerList.concat(listeners);
      }
      else {
        this._signalListenerList.push(listeners);
      }
    }

    override disconnectedCallback(): void {
      for (const listener of this._signalListenerList) {
        unsubscribe(listener);
      }
      this._signalListenerList.length = 0;
      super.disconnectedCallback();
    }
  }

  return SignalMixinClass as unknown as Constructor<SignalMixinInterface> & T;
}
