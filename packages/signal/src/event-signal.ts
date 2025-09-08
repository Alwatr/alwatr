import {createLogger, delay} from '@alwatr/nanolib';

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

  constructor(config: SignalConfig) {
    super(config.signalId);
    this.logger_.logMethod?.('new');
  }

  /**
   * Dispatches an event with a payload to all active listeners.
   * The dispatch is asynchronous, using a microtask.
   *
   * @param payload The data to send with the event.
   */
  dispatch(payload: T): void {
    this.logger_.logMethodArgs?.('dispatch', payload);
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

  private notify_(payload: T): void {
    this.logger_.logMethodArgs?.('dispatch', payload);
    // Iterate over a copy of the array to prevent issues with modification during iteration.
    const currentObservers = [...this.observers_];

    for (const observer of currentObservers) {
      if (observer.options?.disabled) continue;

      if (observer.options?.once) {
        this.removeObserver_(observer);
      }

      try {
        const ret = observer.callback(payload);
        if (ret instanceof Promise) {
          ret.catch((err) => this.logger_.error('notify_', 'async_listener_failed', err));
        }
      }
      catch (err) {
        this.logger_.error('notify_', 'sync_listener_failed', err);
      }
    }
  }
}
