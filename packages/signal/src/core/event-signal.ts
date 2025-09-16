import {delay} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';

import {SignalBase} from './signal-base.js';

import type {SignalConfig} from '../type.js';

/**
 * A stateless signal for dispatching transient events.
 *
 * `EventSignal` is ideal for broadcasting events that do not have a persistent state.
 * Unlike `StateSignal`, it does not hold a value. Listeners are only notified of new
 * events as they are dispatched. This makes it suitable for modeling user interactions,
 * system notifications, or any one-off message.
 *
 * @template T The type of the payload for the events. Defaults to `void` for events without a payload.
 *
 * @example
 * // Create a signal for user click events.
 * const onUserClick = new EventSignal<{ x: number, y: number }>({ name: 'on-user-click' });
 *
 * // Subscribe to the event.
 * onUserClick.subscribe(clickPosition => {
 *   console.log(`User clicked at: ${clickPosition.x}, ${clickPosition.y}`);
 * });
 *
 * // Dispatch an event.
 * onUserClick.dispatch({ x: 100, y: 250 }); // Notifies the listener.
 *
 * // --- Example with no payload ---
 * const onAppReady = new EventSignal({ name: 'on-app-ready' });
 * onAppReady.subscribe(() => console.log('Application is ready!'));
 * onAppReady.dispatch(); // Notifies the listener.
 */
export class EventSignal<T = void> extends SignalBase<T> {
  /**
   * The logger instance for this signal.
   * @protected
   */
  protected logger_ = createLogger(`event-signal: ${this.name}`);

  public constructor(config: SignalConfig) {
    super(config);
    this.logger_.logMethod?.('constructor');
  }

  /**
   * Dispatches an event with an optional payload to all active listeners.
   * The notification is scheduled as a microtask to prevent blocking and ensure
   * a consistent, non-blocking flow.
   *
   * @param payload The data to send with the event.
   */
  public dispatch(payload: T): void {
    this.logger_.logMethodArgs?.('dispatch', {payload});
    this.checkDestroyed_();
    // Dispatch as a microtask to ensure consistent, non-blocking behavior.
    delay.nextMicrotask().then(() => this.notify_(payload));
  }
}
