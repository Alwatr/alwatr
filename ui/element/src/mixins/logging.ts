import {type AlwatrLogger, createLogger} from '@alwatr/logger';

import type {Constructor} from '@alwatr/type';
import type {LitElement, PropertyValues} from 'lit';

export declare class LoggerMixinInterface extends LitElement {
  protected _logger: AlwatrLogger;
}

export function LoggerMixin<T extends Constructor<LitElement>>(superClass: T): Constructor<LoggerMixinInterface> & T {
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

  return LoggerMixinClass as unknown as Constructor<LoggerMixinInterface> & T;
}
