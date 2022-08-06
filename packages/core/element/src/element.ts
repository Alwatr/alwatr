import {alwatrRegisteredList, createLogger} from '@alwatr/logger';
import {LitElement} from 'lit';

import type {Constructor} from './type';
import type {AlwatrLogger} from '@alwatr/logger/type';
import type {PropertyValues} from 'lit';

alwatrRegisteredList.push({
  name: '@alwatr/element',
  version: '{{ALWATR_VERSION}}',
});

declare class LoggerMixinInterface extends LitElement {
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

export const AlwatrElement = LoggerMixin(LitElement);
