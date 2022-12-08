import {alwatrRegisteredList, createLogger} from '@alwatr/logger';
import {LitElement} from 'lit';

import type {Constructor} from './type.js';
import type {AlwatrLogger} from '@alwatr/logger/type.js';
import type {ListenerInterface} from '@alwatr/signal';
import type {PropertyValues} from 'lit';

alwatrRegisteredList.push({
  name: '@alwatr/element',
  version: '{{ALWATR_VERSION}}',
});

declare class LoggerMixinInterface extends LitElement {
  protected _logger: AlwatrLogger;
}
declare class SignalMixinInterface extends LitElement {
  protected _signalListenerList: Array<unknown>;
}

export function LoggerMixin<ClassType extends Constructor<LitElement>>(
    superClass: ClassType,
): Constructor<LoggerMixinInterface> & ClassType {
  class LoggerMixinClass extends superClass {
    protected _logger = createLogger(`<${this.tagName.toLowerCase()}>`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);
      this._logger.logMethod('constructor');
    }

    override connectedCallback(): void {
      this._logger.logMethod('connectedCallback');
      super.connectedCallback();
    }

    override disconnectedCallback(): void {
      this._logger.logMethod('disconnectedCallback');
      super.disconnectedCallback();
    }

    protected override update(_changedProperties: PropertyValues): void {
      this._logger.logMethod('update');
      super.update(_changedProperties);
    }

    protected override firstUpdated(_changedProperties: PropertyValues): void {
      this._logger.logMethod('firstUpdated');
      super.firstUpdated(_changedProperties);
    }

    override dispatchEvent(event: Event): boolean {
      this._logger.logMethodArgs('dispatchEvent', {
        type: event.type,
        detail: (event as Event & {detail?: unknown}).detail,
      });
      return super.dispatchEvent(event);
    }
  }

  return LoggerMixinClass as unknown as Constructor<LoggerMixinInterface> & ClassType;
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

export const AlwatrElement = SignalMixin(LoggerMixin(LitElement));
