/**
 * @package @alwatr/signal
 *
 * The callback function signature for a signal listener.
 * @template T The type of the value that the signal holds or dispatches.
 * @template C The type of the `this` context within the callback.
 */
export type ListenerCallback<T, C> = (this: C, value: T) => void | Promise<void>;

/**
 * Options for subscribing to a signal.
 */
export interface SubscribeOptions {
  /**
   * If true, the listener will be called only once and then automatically unsubscribed.
   * @default false
   */
  once?: boolean;

  /**
   * If true, the listener will be placed at the beginning of the queue and called first.
   * @default false
   */
  priority?: boolean;

  /**
   * If true, the listener will not be called. Can be used to temporarily disable a listener.
   * @default false
   */
  disabled?: boolean;

  /**
   * (For StateSignal only) If true, the listener will be called immediately with the signal's current value upon subscription.
   * @default false // Note: For StateSignal, the effective default is often `true`.
   */
  receivePrevious?: boolean;
}

/**
 * The object returned from a `subscribe` call, containing the `unsubscribe` method.
 */
export interface SubscribeResult {
  /**
   * A function that, when called, removes the listener from the signal.
   */
  unsubscribe: () => void;
}

/**
 * Internal representation of an observer, containing the callback and its options.
 * @internal
 */
export interface Observer<T, C> {
  callback: ListenerCallback<T, C>;
  options: SubscribeOptions;
}

/**
 * Configuration for creating a signal.
 */
export interface SignalConfig {
  /**
   * A unique identifier for the signal, primarily used for logging and debugging.
   */
  readonly signalId: string;
}

/**
 * Configuration specifically for creating a StateSignal.
 */
export interface StateSignalConfig<T> extends SignalConfig {
  /**
   * The initial value of the StateSignal.
   */
  readonly initialValue: T;
}
