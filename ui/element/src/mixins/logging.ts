import {createLogger, type AlwatrLogger} from '@alwatr/logger';

import type {LitElement, PropertyValues} from '../lit.js';
import type {Constructor} from '@alwatr/type';

let _lastAli = 0;

export declare class LoggerMixinInterface extends LitElement {
  /**
   * Alwatr logger index!
   *
   * Element index for logger ;)
   */
  ali: number;

  protected _logger: AlwatrLogger;
}

export function LoggerMixin<T extends Constructor<LitElement>>(superClass: T): Constructor<LoggerMixinInterface> & T {
  class LoggerMixinClass extends superClass {
    ali: number = ++_lastAli;
    protected _logger = createLogger(`<${this.tagName.toLowerCase()}-${this.ali}>`);

    private _$firstUpdated?: true;

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
      this._logger.time?.(this._$firstUpdated ? 'update-time' : 'first-update-time');
      super.update(changedProperties);
    }

    protected override firstUpdated(changedProperties: PropertyValues): void {
      this._logger.logMethodArgs('firstUpdated', {changedProperties});
      this._logger.timeEnd?.('first-update-time');
      super.firstUpdated(changedProperties);
    }

    protected override updated(changedProperties: PropertyValues): void {
      // this._logger.logMethodArgs('updated', {changedProperties});
      if (this._logger.debug) {
        if (this._$firstUpdated) {
          this._logger.timeEnd?.('update-time');
        }
        else {
          this._$firstUpdated = true;
        }
      }

      super.updated(changedProperties);
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

    override remove(): void {
      this._logger.logMethod('remove');
      super.remove();
    }
  }

  return LoggerMixinClass as unknown as Constructor<LoggerMixinInterface> & T;
}
