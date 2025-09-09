import {type AlwatrLogger} from '@alwatr/nanolib';

import type {Observer_, SubscribeOptions, SubscribeResult, ListenerCallback} from './type.js';

/**
 * An abstract base class for signal implementations.
 * Its sole responsibility is to manage a list of observers (listeners).
 * It provides the core `subscribe` method, leaving dispatch logic to subclasses.
 * @template T The type of data the signal will handle.
 */
export abstract class SignalBase<T> {
  readonly signalId: string;
  protected abstract logger_: AlwatrLogger;

  /**
   * An array of observers that are notified when the signal changes.
   * This is a protected property to allow subclasses to manage observers internally.
   * @protected
   */
  protected readonly observers_: Observer_<T>[] = [];

  protected isDestroyed_ = false;
  /**
   * Indicates whether the signal has been destroyed.
   */
  get isDestroyed(): boolean {
    return this.isDestroyed_;
  }

  constructor(signalId: string) {
    this.signalId = signalId;
  }

  /**
   * Removes a specific observer from the observers list.
   * @param observer The observer instance to remove.
   * @protected
   */
  protected removeObserver_(observer: Observer_<T>): void {
    if (this.isDestroyed_) {
      this.logger_.incident?.('removeObserver_', 'attempt_to_dispatch_on_destroyed_signal');
      return;
    }
    this.logger_.logMethod?.('removeObserver_');
    const index = this.observers_.indexOf(observer);
    if (index !== -1) {
      this.observers_.splice(index, 1);
    }
  }

  /**
   * Subscribes a listener to this signal.
   *
   * @param callback The function to be called when the signal is dispatched.
   * @param options Subscription options to customize the behavior.
   * @returns An object with an `unsubscribe` method to remove the listener.
   */
  subscribe(callback: ListenerCallback<T>, options?: SubscribeOptions): SubscribeResult {
    this.logger_.logMethodArgs?.('subscribe', {options});
    this.checkDestroyed_();

    const observer: Observer_<T> = {callback, options};

    if (options?.priority) {
      this.observers_.unshift(observer);
    }
    else {
      this.observers_.push(observer);
    }

    // The returned unsubscribe function now calls the centralized removal method.
    const unsubscribe = (): void => this.removeObserver_(observer);

    return {unsubscribe};
  }

  /**
   * Notifies all registered observers about a value change.
   *
   * This method iterates through a snapshot of the current observers to avoid issues with concurrent modifications.
   * It skips disabled observers, removes observers marked as 'once' after notification, and handles both synchronous
   * and asynchronous callback errors by logging them.
   *
   * @param value - The new value to notify observers about.
   * @private
   */
  protected notify_(value: T): void {
    if (this.isDestroyed_) {
      this.logger_.incident?.('notify_', 'attempt_to_dispatch_on_destroyed_signal');
      return;
    }

    this.logger_.logMethodArgs?.('notify_', value);

    const currentObservers = [...this.observers_];

    for (const observer of currentObservers) {
      if (observer.options?.disabled) continue;

      if (observer.options?.once) {
        this.removeObserver_(observer);
      }

      try {
        const ret = observer.callback(value);
        if (ret instanceof Promise) {
          ret.catch((err) => this.logger_.error('notify_', 'async_listener_failed', err));
        }
      }
      catch (err) {
        this.logger_.error('notify_', 'sync_listener_failed', err);
      }
    }
  }

  /**
   * Returns a Promise that resolves with the next value dispatched by the signal.
   * This provides an elegant way to wait for a single, future event using async/await.
   *
   * @returns A Promise that resolves with the next dispatched value.
   *
   * @example
   * async function onButtonClick() {
   *   console.log('Waiting for the next signal...');
   *   const nextValue = await mySignal.untilNext();
   *   console.log('Signal received:', nextValue);
   * }
   */
  untilNext(): Promise<T> {
    this.logger_.logMethod?.('untilNext');
    this.checkDestroyed_();
    return new Promise((resolve) => {
      this.subscribe(resolve, {
        once: true,
        priority: true, // Resolve the promise before other listeners are called.
        receivePrevious: false, // We only want the *next* value.
      });
    });
  }

  /**
   * Clears all listeners from this signal and makes it inactive.
   * This is useful for lifecycle management and preventing memory leaks.
   */
  destroy(): void {
    this.logger_.logMethod?.('destroy');
    this.observers_.length = 0; // Clear all observers.
    this.isDestroyed_ = true;
  }

  protected checkDestroyed_ = (): void => {
    if (this.isDestroyed_) {
      this.logger_.accident('checkDestroyed_', 'attempt_to_use_destroyed_signal');
      throw new Error(`Cannot interact with a destroyed signal (id: ${this.signalId})`);
    }
  };
}
