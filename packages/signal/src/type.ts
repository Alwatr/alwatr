/**
 * @package @alwatr/signal
 *
 * The callback function signature for a signal listener.
 * @template T The type of the value that the signal holds or dispatches.
 * @template C The type of the `this` context within the callback.
 */
export type ListenerCallback<T> = (value: T) => Awaitable<void>;

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
   * @default true
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
export interface Observer_<T> {
  callback: ListenerCallback<T>;
  options?: SubscribeOptions;
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

/**
 * A read-only signal interface.
 *
 * Both StateSignal and ComputedSignal implement this.
 *
 * @template T The type of the signal's value.
 */
export interface ReadonlySignal<T> {
  /**
   * The current value of the signal.
   */
  readonly value: T;

  /**
   * Subscribes a listener to this signal.
   * @param callback The function to be called when the signal's value changes.
   * @param options Optional settings for the subscription.
   * @returns An object with an `unsubscribe` method.
   */
  subscribe(callback: ListenerCallback<T>, options?: SubscribeOptions): SubscribeResult;
}

/**
 * A list of signals that a computed or effect depends on.
 */
export type DependencyList = readonly ReadonlySignal<unknown>[];

/**
 * Options for creating a computed signal with explicit dependencies.
 * @template T - The type of the value computed by the signal.
 */
export interface ComputedOptions<T> {
  /**
   * Unique identifier for the signal.
   */
  signalId: string;

  /**
   * List of signals that the computed signal depends on.
   * Changes to these dependencies will trigger recalculation.
   */
  deps: DependencyList;

  /**
   * Function that computes the value of the signal.
   * This function is called whenever the dependencies change.
   */
  get: () => T;
}
