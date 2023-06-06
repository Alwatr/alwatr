import {AlwatrBaseSignal} from './base.js';

import type {ListenerCallback, SubscribeOptions, SubscribeResult} from './type.js';

/**
 * Alwatr context signal.
 */
export class AlwatrContextSignal<TValue> extends AlwatrBaseSignal<TValue> {
  constructor(config: {name: string, loggerPrefix?: string}) {
    config.loggerPrefix ??= 'context-signal';
    super(config);
  }

  /**
   * Get context value.
   *
   * Return undefined if context not set before or expired.
   */
  getValue(): TValue | undefined {
    return super._getDetail();
  }

  /**
   * Set context value and notify all subscribers.
   */
  setValue(value: TValue): void {
    this._logger.logMethodArgs?.('setValue', {value});
    super._dispatch(value);
  }

  /**
   * Clear current context value without notify subscribers.
   *
   * `receivePrevious` in new subscribers not work until new context changes.
   */
  expire(): void {
    super._expire();
  }

  /**
   * Get the value of the next context changes.
   */
  untilChange(): Promise<TValue> {
    return super._untilChange();
  }

  /**
   * Subscribe to context changes.
   */
  subscribe(listenerCallback: ListenerCallback<this, TValue>, options?: SubscribeOptions): SubscribeResult {
    return super._subscribe(listenerCallback, options);
  }

  /**
   * Unsubscribe from context.
   */
  unsubscribe(listenerCallback: ListenerCallback<this, TValue>): void {
    return super._unsubscribe(listenerCallback);
  }
}
