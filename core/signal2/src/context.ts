import {AlwatrBaseSignal} from './base.js';

/**
 * Alwatr context signal.
 */
export class AlwatrContextSignal<TValue> extends AlwatrBaseSignal<TValue> {
  constructor(public override name: string) {
    super(name, 'context-signal');
  }

  /**
   * Get context value.
   *
   * Return undefined if context not set before or expired.
   */
  getValue(): TValue | undefined {
    return this._getDetail();
  }

  /**
   * Set context value and notify all subscribers.
   */
  setValue(value: TValue): void {
    this._logger.logMethodArgs?.('setValue', {value});
    this._dispatch(value);
  }

  /**
   * Clear current context value without notify subscribers.
   *
   * `receivePrevious` in new subscribers not work until new context changes.
   */
  expire(): void {
    this._expire();
  }

  /**
   * Get the value of the next context changes.
   */
  untilChange(): Promise<TValue> {
    return this._untilChange();
  }
}
