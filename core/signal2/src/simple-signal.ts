import {AlwatrBaseSignal} from './base.js';

import type {ListenerCallback, SubscribeOptions, SubscribeResult} from './type.js';

/**
 * Alwatr event signal without any detail.
 */
export class AlwatrSimpleSignal extends AlwatrBaseSignal<undefined> {
  constructor(config: {name: string, loggerPrefix?: string}) {
    config.loggerPrefix ??= 'signal';
    super(config);
  }

  /**
   * Dispatch an event to all listeners.
   */
  dispatch(): void {
    this._dispatch(undefined);
  }

  /**
   * Subscribe to context changes.
   */
  subscribe(listenerCallback: ListenerCallback<this, never>, options?: SubscribeOptions): SubscribeResult {
    return super._subscribe(listenerCallback as ListenerCallback<this, undefined>, options);
  }

  /**
   * Unsubscribe from context.
   */
  unsubscribe(listenerCallback: ListenerCallback<this, never>): void {
    return super._unsubscribe(listenerCallback as ListenerCallback<this, undefined>);
  }

  /**
   * Wait until next event.
   */
  untilNext(): Promise<void> {
    return super._untilChange();
  }
}
