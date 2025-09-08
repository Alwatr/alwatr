import type {Observer, SubscribeOptions, SubscribeResult, ListenerCallback} from './type.js';

/**
 * An abstract base class for signal implementations.
 * Its sole responsibility is to manage a list of observers (listeners).
 * It provides the core `subscribe` method, leaving dispatch logic to subclasses.
 * @template T The type of data the signal will handle.
 */
export abstract class SignalBase<T> {
  protected readonly observers: Observer<T, this>[] = [];
  public readonly signalId: string;

  constructor(signalId: string) {
    this.signalId = signalId;
  }

  /**
   * Subscribes a listener to this signal.
   *
   * @param callback The function to be called when the signal is dispatched.
   * @param options Subscription options to customize the behavior.
   * @returns An object with an `unsubscribe` method to remove the listener.
   */
  subscribe(callback: ListenerCallback<T, this>, options: SubscribeOptions = {}): SubscribeResult {
    const observer: Observer<T, this> = {callback, options};

    if (options.priority) {
      this.observers.unshift(observer);
    }
    else {
      this.observers.push(observer);
    }

    const unsubscribe = (): void => {
      const index = this.observers.indexOf(observer);
      if (index !== -1) {
        this.observers.splice(index, 1);
      }
    };

    return {unsubscribe};
  }
}
