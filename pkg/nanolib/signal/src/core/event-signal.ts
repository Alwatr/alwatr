import {queueMicrotask} from '@alwatr/delay';
import {createLogger, type AlwatrLogger} from '@alwatr/logger';
import {SignalBase} from './signal-base.js';
import type {IBaseSignal, SignalConfig} from '../type.js';

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
export class EventSignal<T = void> extends SignalBase<T> implements IBaseSignal<T> {
  /**
   * The logger instance for this signal.
   *
   * @protected
   */
  protected logger_: AlwatrLogger;

  /**
   * Creates a new EventSignal instance.
   *
   * @param config Configuration options including the unique event name and custom cleanup hooks.
   */
  constructor(config: SignalConfig) {
    super(config);
    this.logger_ = createLogger(`event_signal:${this.name}`);
    DEV_MODE && this.logger_.logMethod?.('constructor');
  }

  /**
   * Dispatches an event with the specified payload to all active listeners.
   *
   * To prevent blocking of the main thread and ensure consistent execution order,
   * the notification execution is scheduled as a microtask using `queueMicrotask`.
   *
   * @param payload The data payload to send with the event.
   */
  public dispatch(payload: T): void {
    DEV_MODE && this.logger_.logMethodArgs?.('dispatch', {payload});
    this.checkDestroyed_();
    // Dispatch as a microtask to ensure consistent, non-blocking behavior.
    queueMicrotask(() => this.notify_(payload));
  }
}
