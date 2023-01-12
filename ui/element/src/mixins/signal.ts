import type {Constructor} from '@alwatr/type';
import type {LitElement} from 'lit';

export declare class SignalMixinInterface extends LitElement {
  protected _signalListenerList: Array<unknown>;
}

export function SignalMixin<T extends Constructor<LitElement>>(superClass: T): Constructor<SignalMixinInterface> & T {
  class SignalMixinClass extends superClass {
    protected _signalListenerList: Array<Record<string, unknown>> = [];

    override disconnectedCallback(): void {
      super.disconnectedCallback();

      for (const listener of this._signalListenerList) {
        if (typeof listener.remove === 'function') {
          listener.remove();
        }
      }
    }
  }

  return SignalMixinClass as unknown as Constructor<SignalMixinInterface> & T;
}
