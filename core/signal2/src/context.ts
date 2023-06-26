import {AlwatrObservable} from './observable.js';

/**
 * Alwatr context signal.
 */
export class AlwatrContextSignal<T> extends AlwatrObservable<T> {
  constructor(config: {name: string, loggerPrefix?: string}) {
    config.loggerPrefix ??= 'context-signal';
    super(config);
  }

  /**
   * Get context value.
   *
   * Return undefined if context not set before or expired.
   */
  getValue(): T | undefined {
    return super._getData();
  }

  /**
   * Set context value and notify all subscribers.
   */
  setValue(value: T): void {
    this._logger.logMethodArgs?.('setValue', {value});
    super._notify(value);
  }

  /**
   * Clear current context value without notify subscribers.
   *
   * `receivePrevious` in new subscribers not work until new context changes.
   */
  expire(): void {
    super._clear();
  }

  /**
   * Get the value of the next context changes.
   */
  untilChange(): Promise<T> {
    return super._untilNewNotify();
  }
}
