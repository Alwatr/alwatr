import {unsubscribe} from '@alwatr/signal/core2.js';

import type {ListenerSpec} from '@alwatr/signal/type.js';
import type {Constructor} from '@alwatr/type';
import type {LitElement} from 'lit';

export declare class SignalMixinInterface extends LitElement {
  protected _signalListenerList: Array<ListenerSpec>;
}

export function SignalMixin<T extends Constructor<LitElement>>(superClass: T): Constructor<SignalMixinInterface> & T {
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
