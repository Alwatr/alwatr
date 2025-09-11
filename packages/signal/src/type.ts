import type {} from '@alwatr/type-helper';

/**
 * @package @alwatr/signal
 *
 * The callback function signature for a signal listener. It's a function that receives a value of type `T`
 * and returns `void` or `Promise<void>`.
 *
 * @template T The type of the value that the signal holds or dispatches.
 */
export type ListenerCallback<T> = (value: T) => Awaitable<void>;

/**
 * Options for fine-tuning the behavior of a subscription to a signal.
 */
export interface SubscribeOptions {
  /**
   * If `true`, the listener will be called only once and then automatically unsubscribed.
   * This is useful for scenarios where you only need to react to the next change.
   *
   * @default false
   *
   * @example
   * // The listener will be removed after the first click.
   * onUserClick.subscribe(() => console.log('User clicked!'), { once: true });
   */
  once?: boolean;

  /**
   * If `true`, the listener will be placed at the beginning of the notification queue and will be called before
   * other, non-priority listeners.
   *
   * @default false
   *
   * @example
   * // This listener will run before the others.
   * mySignal.subscribe(() => console.log('High-priority action'), { priority: true });
   */
  priority?: boolean;

  /**
   * If `true`, the listener will be temporarily disabled and will not be called during notifications.
   * This can be useful for temporarily pausing a subscription without completely unsubscribing.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * **For `StateSignal` only.** If `true` (the default), the listener will be called immediately with the
   * signal's current value upon subscription. Set to `false` if you only want to be notified of *future* changes.
   *
   * @default true
   *
   * @example
   * const counter = new StateSignal({initialValue: 10});
   *
   * // This will log "Current value: 10" immediately.
   * counter.subscribe(value => console.log(`Current value: ${value}`));
   *
   * // This will *not* log immediately, only when the counter is next updated.
   * counter.subscribe(value => console.log(`New value: ${value}`), { receivePrevious: false });
   */
  receivePrevious?: boolean;
}

/**
 * The object returned from a `subscribe` call, which contains the `unsubscribe` method.
 * This allows for easy removal of the subscription when it's no longer needed.
 */
export interface SubscribeResult {
  /**
   * A function that, when called, removes the listener from the signal, preventing future notifications.
   * It's crucial to call this to avoid memory leaks when a component or listener is destroyed.
   *
   * @example
   * const subscription = mySignal.subscribe(value => console.log(value));
   * // ... later ...
   * subscription.unsubscribe(); // The listener is now removed.
   */
  unsubscribe: () => void;
}

/**
 * Internal representation of an observer, containing the listener's callback and its subscription options.
 * @internal
 */
export interface Observer_<T> {
  callback: ListenerCallback<T>;
  options?: SubscribeOptions;
}

/**
 * Basic configuration for creating any signal.
 */
export interface SignalConfig {
  /**
   * A unique identifier for the signal. This is crucial for debugging, logging, and differentiating signals,
   * especially in large applications.
   *
   * @example
   * 'user-profile-signal'
   * 'app-theme-signal'
   */
  readonly signalId: string;
}

/**
 * Configuration specifically for creating a `StateSignal`.
 * @template T The type of the state held by the signal.
 */
export interface StateSignalConfig<T> extends SignalConfig {
  /**
   * The initial value of the `StateSignal`. A `StateSignal` must always have a value.
   */
  readonly initialValue: T;
}

/**
 * Represents a signal that can be read from but not written to.
 * Both `StateSignal` and `ComputedSignal` implement this interface, allowing them to be used
 * as dependencies in other signals without exposing their `set` or `dispatch` methods.
 *
 * @template T The type of the signal's value.
 */
export interface IReadonlySignal<T> {
  /**
   * The current value of the signal.
   */
  readonly value: T;

  /**
   * Subscribes a listener to this signal.
   *
   * @param callback The function to be called when the signal's value changes.
   * @param options Optional settings for the subscription.
   * @returns An object with an `unsubscribe` method for cleanup.
   */
  subscribe(callback: ListenerCallback<T>, options?: SubscribeOptions): SubscribeResult;
}

/**
 * A list of `IReadonlySignal` instances that a computed or effect signal depends on.
 * This ensures that dependencies can be read from but not modified by the dependent signal.
 */
export type DependencyList = readonly IReadonlySignal<unknown>[];

/**
 * Configuration for creating a `ComputedSignal`.
 * @template T The type of the value computed by the signal.
 */
export interface ComputedSignalConfig<T> extends SignalConfig {
  /**
   * An array of dependency signals (`StateSignal` or other `ComputedSignal` instances).
   * The `ComputedSignal` will automatically re-evaluate its value whenever any of these dependencies change.
   */
  deps: DependencyList;

  /**
   * The function that computes the signal's value.
   * It is executed once initially and then again whenever a dependency changes.
   * This function should be pure and not have side effects.
   *
   * @example
   * // A computed signal that derives a boolean from a number.
   * const counter = new StateSignal({initialValue: 0});
   * const isEven = new ComputedSignal({
   *   deps: [counter],
   *   get: () => counter.value % 2 === 0,
   * });
   */
  get: () => T;
}

/**
 * The public interface for a `ComputedSignal`. It is a read-only signal
 * that also includes a `destroy` method for essential lifecycle management.
 *
 * @template T The type of the computed value.
 */
export interface IComputedSignal<T> extends IReadonlySignal<T> {
  /**
   * Disconnects the `ComputedSignal` from its dependencies.
   * This must be called to prevent memory leaks when the signal is no longer needed,
   * as it stops the automatic re-evaluation.
   */
  destroy: () => void;
}

/**
 * Configuration for creating an `EffectSignal`.
 */
export interface EffectSignalConfig {
  /**
   * An array of dependency signals (`StateSignal` or `ComputedSignal` instances).
   * The effect's `run` function will be executed whenever any of these signals change.
   */
  readonly deps: DependencyList;

  /**
   * The function to execute as the side-effect (e.g., logging, DOM updates, network requests).
   * It can be synchronous or asynchronous.
   *
   * @example
   * // An effect that logs the counter's value to the console.
   * const counter = new StateSignal({initialValue: 0});
   * new EffectSignal({
   *   deps: [counter],
   *   run: () => console.log(`The counter is now: ${counter.value}`),
   * });
   */
  run: () => Awaitable<void>;

  /**
   * If `true`, the effect's `run` function will be executed once immediately upon initialization.
   *
   * @default false
   */
  runImmediately?: boolean;
}

/**
 * The public interface for an `EffectSignal`, which provides a `destroy` method for cleanup.
 */
export interface IEffectSignal {
  /**
   * Permanently disposes of the effect, unsubscribing from all dependencies
   * and stopping any future executions. This is crucial for preventing memory leaks
   * and unwanted side effects from running.
   */
  destroy: () => void;
}
