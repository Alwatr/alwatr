import {EventSignal} from '../core/event-signal.js';

import type {SignalConfig} from '../type.js';

/**
 * Creates a stateless signal for dispatching transient events.
 *
 * `EventSignal` is ideal for broadcasting events that do not have a persistent state.
 * Unlike `StateSignal`, it does not hold a value. Listeners are only notified of new
 * events as they are dispatched. This makes it suitable for modeling user interactions,
 * system notifications, or any one-off message.
 *
 * @template T The type of the payload for the events.
 *
 * @param config The configuration for the event signal.
 * @returns A new instance of EventSignal.
 *
 * @example
 * const onUserClick = createEventSignal<{ x: number, y: number }>({
 *   signalId: 'on-user-click'
 * });
 *
 * onUserClick.subscribe(pos => {
 *   console.log(`User clicked at: ${pos.x}, ${pos.y}`);
 * });
 *
 * onUserClick.dispatch({ x: 100, y: 250 });
 */
export function createEventSignal<T = void>(config: SignalConfig): EventSignal<T> {
  return new EventSignal<T>(config);
}
