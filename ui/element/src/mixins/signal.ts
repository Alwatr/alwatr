import {LitElement} from 'lit';

import type {Constructor} from '../type.js';
import type {ListenerInterface} from '@alwatr/signal';

export declare class SignalMixinInterface extends LitElement {
  protected _signalListenerList: Array<unknown>;
}

export function SignalMixin<ClassType extends Constructor<LitElement>>(
    superClass: ClassType,
): Constructor<SignalMixinInterface> & ClassType {
  class SignalMixinClass extends superClass {
    protected _signalListenerList: Array<unknown> = [];

    override disconnectedCallback(): void {
      super.disconnectedCallback();

      this._signalListenerList.forEach((listener) => (listener as ListenerInterface<keyof AlwatrSignals>).remove());
    }
  }

  return SignalMixinClass as unknown as Constructor<SignalMixinInterface> & ClassType;
}
