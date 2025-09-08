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
  constructor(config: SignalConfig) {
    super(config.signalId);
  }

  /**
   * Dispatches an event with a payload to all active listeners.
   * The dispatch is asynchronous, using a microtask.
   *
   * @param payload The data to send with the event.
   */
  dispatch(payload: T): void {
    // Dispatch as a microtask to ensure consistent, non-blocking behavior.
    Promise.resolve()
      .then(() => {
        this._notify(payload);
      })
      .catch((err) => {
        console.error(`{signal: ${this.signalId}} dispatch failed`, err);
      });
  }

  private _notify(payload: T): void {
    const observersToRemove: Observer<T, this>[] = [];
    // Iterate over a copy of the array to prevent issues with modification during iteration.
    const currentObservers = [...this.observers];

    for (const observer of currentObservers) {
      if (observer.options.disabled) continue;
      if (observer.options.once) {
        observersToRemove.push(observer);
      }

      try {
        const ret = observer.callback.call(this, payload);
        if (ret instanceof Promise) {
          ret.catch((err) => console.error(`{signal: ${this.signalId}} async listener failed`, err));
        }
      }
      catch (err) {
        console.error(`{signal: ${this.signalId}} sync listener failed`, err);
      }
    }

    // Unsubscribe 'once' listeners after the loop.
    if (observersToRemove.length > 0) {
      for (const observer of observersToRemove) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) this.observers.splice(index, 1);
      }
    }
  }
}
