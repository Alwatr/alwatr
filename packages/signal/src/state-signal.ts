import {delay} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';

import {SignalBase} from './signal-base.js';

import type {StateSignalConfig, ListenerCallback, SubscribeOptions, SubscribeResult, IReadonlySignal} from './type.js';

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
export class StateSignal<T> extends SignalBase<T> implements IReadonlySignal<T> {
  private value__: T;
  protected logger_ = createLogger(`state-signal: ${this.signalId}`);

  public constructor(config: StateSignalConfig<T>) {
    super(config);
    this.value__ = config.initialValue;
    this.logger_.logMethodArgs?.('constructor', {initialValue: this.value__});
  }

  /**
   * Gets the current value of the signal.
   */
  public get value(): T {
    this.checkDestroyed_();
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
  public set(newValue: T): void {
    this.logger_.logMethodArgs?.('set', {newValue});
    this.checkDestroyed_();
    this.value__ = newValue;

    // Dispatch as a microtask to ensure consistent, non-blocking behavior.
    delay
      .nextMicrotask()
      .then(() => {
        this.notify_(newValue);
      })
      .catch((err) => {
        this.logger_.error('set', 'dispatch_failed', err);
      });
  }

  /**
   * Subscribes a listener to this signal.
   *
   * @param callback The function to be called when the signal's value changes.
   * @param options Subscription options, including `receivePrevious`.
   * @returns An object with an `unsubscribe` method.
   */
  public override subscribe(callback: ListenerCallback<T>, options: SubscribeOptions = {}): SubscribeResult {
    this.logger_.logMethodArgs?.('subscribe', {options});
    this.checkDestroyed_();

    // For StateSignal, `receivePrevious` is the default, most common behavior.
    const receivePrevious = options.receivePrevious !== false;

    if (receivePrevious && !options.disabled) {
      // Immediately (but asynchronously) call the listener with the current value.
      delay
        .nextMicrotask()
        .then(() => {
          try {
            const ret = callback(this.value__);
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
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return {unsubscribe: () => {}};
      }
    }

    return super.subscribe(callback, options);
  }

  public override destroy(): void {
    super.destroy();
    this.value__ = null as T; // Clear the value.
  }
}
