import {delay} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';

import {SignalBase} from './signal-base.js';

import type {SignalConfig} from './type.js';

/**
 * A stateless signal implementation for dispatching transient events.
 * It does not hold any value. Listeners are only notified of new events as they are dispatched.
 *
 * @template T The type of the payload for the events. Defaults to `void` for events without a payload.
 *
 * @example
 * const onUserClick = new EventSignal<{ x: number, y: number }>({ signalId: 'onUserClick' });
 *
 * onUserClick.subscribe(payload => {
 * console.log(`User clicked at: ${payload.x}, ${payload.y}`);
 * });
 *
 * onUserClick.dispatch({ x: 10, y: 20 });
 */
export class EventSignal<T = void> extends SignalBase<T> {
  protected logger_ = createLogger(`event-signal: ${this.signalId}`);

  public constructor(config: SignalConfig) {
    super(config);
    this.logger_.logMethod?.('constructor');
  }

  /**
   * Dispatches an event with a payload to all active listeners.
   * The dispatch is asynchronous, using a microtask.
   *
   * @param payload The data to send with the event.
   */
  public dispatch(payload: T): void {
    this.logger_.logMethodArgs?.('dispatch', payload);
    this.checkDestroyed_();
    // Dispatch as a microtask to ensure consistent, non-blocking behavior.
    delay
      .nextMicrotask()
      .then(() => {
        this.notify_(payload);
      })
      .catch((err) => {
        this.logger_.error('dispatch', 'dispatch_failed', err);
      });
  }
}
