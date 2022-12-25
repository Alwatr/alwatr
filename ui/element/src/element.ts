import {alwatrRegisteredList, createLogger} from '@alwatr/logger';
import {LitElement} from 'lit';

import type {Constructor} from './type.js';
import type {AlwatrLogger} from '@alwatr/logger/type.js';
import type {ListenerInterface} from '@alwatr/signal';
import type {PropertyValues} from 'lit';

export * from 'lit';
export * from 'lit/decorators.js';
export {map} from 'lit/directives/map.js';
export {when} from 'lit/directives/when.js';
export {repeat} from 'lit/directives/repeat.js';
export {ifDefined} from 'lit/directives/if-defined.js';
export {unsafeSVG} from 'lit/directives/unsafe-svg.js';

alwatrRegisteredList.push({
  name: '@alwatr/element',
  version: '{{ALWATR_VERSION}}',
});

export declare class LoggerMixinInterface extends LitElement {
  protected _logger: AlwatrLogger;
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

    protected override update(changedProperties: PropertyValues): void {
      this._logger.logMethodArgs('update', {changedProperties});
      super.update(changedProperties);
    }

    protected override firstUpdated(changedProperties: PropertyValues): void {
      this._logger.logMethodArgs('firstUpdated', {changedProperties});
      super.firstUpdated(changedProperties);
    }

    protected override render(): unknown {
      this._logger.logMethod('render');
      return;
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

export const AlwatrElement = SignalMixin(LoggerMixin(LitElement));
