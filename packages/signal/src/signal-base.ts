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
  protected readonly observers_: Observer_<T>[] = [];

  constructor(signalId: string) {
    this.signalId = signalId;
  }

  /**
   * Removes a specific observer from the observers list.
   * @param observer The observer instance to remove.
   * @protected
   */
  protected removeObserver_(observer: Observer_<T>): void {
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
}
