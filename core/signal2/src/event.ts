import {AlwatrBaseSignal} from './base.js';

import type {ListenerCallback, SubscribeOptions, SubscribeResult} from './type.js';

/**
 * Alwatr event signal.
 */
export class AlwatrEventSignal<TDetail> extends AlwatrBaseSignal<TDetail> {
  constructor(config: {name: string, loggerPrefix?: string}) {
    config.loggerPrefix ??= 'event-signal';
    super(config);
  }

  /**
   * Dispatch an event to all listeners.
   */
  dispatch(detail: TDetail): void {
    this._dispatch(detail);
  }

  /**
   * Subscribe to context changes.
   */
  subscribe(listenerCallback: ListenerCallback<this, TDetail>, options?: SubscribeOptions): SubscribeResult {
    return super._subscribe(listenerCallback, options);
  }

  /**
   * Unsubscribe from context.
   */
  unsubscribe(listenerCallback: ListenerCallback<this, TDetail>): void {
    return super._unsubscribe(listenerCallback);
  }

  /**
   * Wait until next event.
   */
  untilNext(): Promise<TDetail> {
    return super._untilChange();
  }
}
