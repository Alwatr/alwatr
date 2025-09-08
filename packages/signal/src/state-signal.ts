import { createLogger, delay } from '@alwatr/nanolib';

import {SignalBase} from './signal-base.js';

import type {StateSignalConfig, ListenerCallback, SubscribeOptions, SubscribeResult} from './type.js';

/**
 * A stateful signal that holds a value and notifies listeners when the value changes.
 * It always has a value, and new subscribers immediately receive the current value.
 *
 * @template T The type of the state it holds.
 *
 * @example
 * const theme = new StateSignal<"light" | "dark">({
 * signalId: 'theme-signal',
 * initialValue: 'light'
 * });
 *
 * console.log(theme.value); // 'light'
 *
 * theme.subscribe(newTheme => {
 * document.body.className = newTheme;
 * });
 *
 * theme.set('dark'); // Notifies listener, document body class changes.
 */
export class StateSignal<T> extends SignalBase<T> {
  private value__: T;
  protected logger_ = createLogger(`state-signal: ${this.signalId}`);

  constructor(config: StateSignalConfig<T>) {
    super(config.signalId);
    this.value__ = config.initialValue;
    this.logger_.logMethodArgs?.('new', {initialValue: this.value__});
  }

  /**
   * Gets the current value of the signal.
   */
  get value(): T {
    return this.value__;
  }

  /**
   * Sets a new value for the signal.
   * @param newValue The new value to set.
   *
   * @example
   * // For primitives
   * mySignal.set(42);
   *
   * // For objects (best practice is immutability)
   * mySignal.set({ ...mySignal.value, prop: 'new' });
   */
  set(newValue: T): void {
    this.logger_.logMethodArgs?.('set', {newValue});
    this.value__ = newValue;
    this.dispatch__(this.value__);
  }

  /**
   * Private method to handle the asynchronous dispatching logic.
   * @param value The value to dispatch.
   */
  private async dispatch__(value: T): Promise<void> {
    try {
      await delay.nextMicrotask()
      this.notify_(value);
    }
    catch (err) {
      console.error(`{signal: ${this.signalId}} dispatch failed`, err);
    }
  }

  /**
   * Overrides the base subscribe method to handle the `receivePrevious` option.
   *
   * @param callback The function to be called when the signal's value changes.
   * @param options Subscription options, including `receivePrevious`.
   * @returns An object with an `unsubscribe` method.
   */
  override subscribe(callback: ListenerCallback<T, this>, options: SubscribeOptions = {}): SubscribeResult {
    // For StateSignal, `receivePrevious` is the default, most common behavior.
    const receivePrevious = options.receivePrevious !== false;

    if (receivePrevious && !options.disabled) {
      // Immediately (but asynchronously) call the listener with the current value.
      Promise.resolve()
        .then(() => {
          try {
            const ret = callback.call(this, this.value__);
            if (ret instanceof Promise) {
              ret.catch((err) => console.error(`{signal: ${this.signalId}} async listener failed on receivePrevious`, err));
            }
          }
          catch (err) {
            console.error(`{signal: ${this.signalId}} sync listener failed on receivePrevious`, err);
          }
        })
        .catch((err) => console.error(`{signal: ${this.signalId}} subscribe dispatch failed`, err));

      // If it's a 'once' subscription, it's now fulfilled, so we don't need to add it to the list.
      if (options.once) {
        return {unsubscribe: () => {}};
      }
    }

    return super.subscribe(callback, options);
  }

  // The _notify method can be shared or duplicated. For simplicity, we'll include it here.
  private notify_(value: T): void {
    const observersToRemove: Observer<T, this>[] = [];
    const currentObservers = [...this.observers_];

    for (const observer of currentObservers) {
      if (observer.options.disabled) continue;
      if (observer.options.once) {
        observersToRemove.push(observer);
      }

      try {
        const ret = observer.callback.call(this, value);
        if (ret instanceof Promise) {
          ret.catch((err) => console.error(`{signal: ${this.signalId}} async listener failed`, err));
        }
      }
      catch (err) {
        console.error(`{signal: ${this.signalId}} sync listener failed`, err);
      }
    }

    if (observersToRemove.length > 0) {
      for (const observer of observersToRemove) {
        this.removeObserver_(observer);
      }
    }
  }
}
