import {LitElement} from 'lit';

import type {Constructor} from '../type.js';
import type {ListenerInterface} from '@alwatr/signal';

export declare class SignalMixinInterface extends LitElement {
  protected _signalListenerList: Array<ListenerInterface<keyof AlwatrSignals>>;
}

export function SignalMixin<ClassType extends Constructor<LitElement>>(
    superClass: ClassType,
): Constructor<SignalMixinInterface> & ClassType {
  class SignalMixinClass extends superClass {
    protected _signalListenerList: Array<ListenerInterface<keyof AlwatrSignals>> = [];

    override disconnectedCallback(): void {
      super.disconnectedCallback();

      this._signalListenerList.forEach((listener) => listener.remove());
    }
  }

  return SignalMixinClass as unknown as Constructor<SignalMixinInterface> & ClassType;
}
