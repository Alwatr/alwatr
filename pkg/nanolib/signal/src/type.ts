import type {DebouncerConfig} from '@alwatr/debounce';
import type {LocalStorageProviderConfig} from '@alwatr/local-storage';
import type {SessionStorageProviderConfig} from '@alwatr/session-storage';

/**
 * @package @alwatr/signal
 *
 * The callback function signature for a signal listener. It's a function that receives a value of type `T`
 * and returns `void` or `Promise<void>`.
 *
 * @template T The type of the value that the signal holds or dispatches.
 */
export type ListenerCallback<T> = (value: T) => void;

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
  /**
   * The listener's callback function.
   */
  callback: ListenerCallback<T>;

  /**
   * Subscription options for the observer.
   */
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
  name: string;

  /**
   * An optional callback function that will be executed when the signal's `destroy` method is called.
   * This is useful for cleaning up additional resources used by the signal,
   * such as subscriptions or timers created in operators.
   */
  onDestroy?: () => void;
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
 * Represents a signal that can be subscribed to for changes, but does not allow direct modification of its value.
 * This is the base interface for both `StateSignal` and `ComputedSignal`, allowing them to be used as dependencies
 *
 * @template T The type of the signal's value.
 */
export interface IBaseSignal<T> {
  /**
   * The unique identifier for this signal instance. Useful for debugging.
   */
  readonly name: string;

  /**
   * Indicates whether the signal has been destroyed.
   * A destroyed signal cannot be used and will throw an error if interacted with.
   * @returns `true` if the signal is destroyed, `false` otherwise.
   */
  readonly isDestroyed: boolean;

  /**
   * Subscribes a listener to this signal.
   *
   * @param callback The function to be called when the signal's value changes.
   * @param options Optional settings for the subscription.
   * @returns An object with an `unsubscribe` method for cleanup.
   */
  subscribe(callback: ListenerCallback<T>, options?: SubscribeOptions): SubscribeResult;

  /**
   * Returns a Promise that resolves with the next value dispatched by the signal.
   * This provides an elegant way to wait for a single, future event using `async/await`.
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
  untilNext(): Promise<T>;

  /**
   * Destroys the signal, clearing all its listeners and making it inactive.
   *
   * After destruction, any interaction with the signal (like `subscribe` or `untilNext`)
   * will throw an error. This is crucial for preventing memory leaks by allowing
   * garbage collection of the signal and its observers.
   */
  destroy(): void;
}

/**
 * Represents a signal that can be read from but not written to.
 * Both `StateSignal` and `ComputedSignal` implement this interface, allowing them to be used
 * as dependencies in other signals without exposing their `set` or `dispatch` methods.
 *
 * @template T The type of the signal's value.
 */
export interface IReadonlySignal<T> extends IBaseSignal<T> {
  /**
   * The current value of the signal.
   */
  get: () => T;
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
   *   get: () => counter.get() % 2 === 0,
   * });
   */
  get: () => T;
}

/**
 * Configuration for creating a `DerivedSignal`.
 * @template S The type of the source signal state.
 * @template T The type of the projected derived state.
 */
export interface DerivedSignalConfig<S, T> extends SignalConfig {
  /**
   * The single upstream readonly source signal.
   */
  readonly source: IReadonlySignal<S>;

  /**
   * Projection mapping function transforming source S to derived T.
   */
  readonly projector: (value: S) => T;
}

/**
 * Configuration for creating an `EffectSignal`.
 */
export interface EffectSignalConfig {
  /**
   * A unique identifier for the signal. This is crucial for debugging, logging, and differentiating signals,
   * especially in large applications.
   * @default auto-generated based on dependencies
   *
   * @example
   * 'user-profile-signal'
   * 'app-theme-signal'
   */
  name?: string;

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
   *   run: () => console.log(`The counter is now: ${counter.get()}`),
   * });
   */
  run: () => void;

  /**
   * If `true`, the effect's `run` function will be executed once immediately upon initialization.
   * @default false
   */
  runImmediately?: boolean;

  /**
   * An optional callback function that will be executed when the signal's `destroy` method is called.
   * This is useful for cleaning up additional resources used by the signal,
   * such as subscriptions or timers created in operators.
   */
  onDestroy?: () => void;
}

/**
 * The public interface for an `EffectSignal`, which provides a `destroy` method for cleanup.
 */
export interface IEffectSignal {
  /**
   * The unique identifier for this signal instance.
   */
  name: string;

  /**
   * Permanently disposes of the effect, unsubscribing from all dependencies
   * and stopping any future executions. This is crucial for preventing memory leaks
   * and unwanted side effects from running.
   */
  destroy: () => void;

  /**
   * Indicates whether the signal has been destroyed.
   * A destroyed signal cannot be used and will throw an error if interacted with.
   * @returns `true` if the signal is destroyed, `false` otherwise.
   */
  readonly isDestroyed: boolean;
}

/**
 * Configuration for creating a debounced signal using `createDebouncedSignal`.
 *
 * @see {@link createDebouncedSignal}
 * @see {@link DebouncerConfig}
 */
export interface DebounceSignalConfig extends Omit<DebouncerConfig<never>, 'func' | 'thisContext'> {
  /**
   * A unique identifier for the signal. This is crucial for debugging and differentiating signals.
   * @default `${sourceSignal.name}-debounced`
   */
  name?: string;

  /**
   * An optional callback executed when the signal's `destroy` method is called.
   * Useful for cleaning up resources tied to the debounced signal.
   */
  onDestroy?: () => void;
}

/**
 * Configuration for a persistent state signal.
 * It combines the core signal configuration with the necessary options for local storage persistence.
 *
 * This configuration extends both `StateSignalConfig` and `LocalStorageProviderConfig`,
 * inheriting all storage-related options including `parse` and `stringify` for custom serialization.
 *
 * @template T The type of the state it holds. If custom `parse` and `stringify` functions are
 * provided, T can be any type (e.g., Date, Map, Set). Otherwise, T must be JSON-serializable.
 *
 * @example
 * ```typescript
 * // Basic configuration with JSON-serializable state
 * const config = {
 *   name: 'user-prefs',
 *   initialValue: { theme: 'dark', lang: 'en' },
 * };
 *
 * // Configuration with custom serialization for Date type
 * const dateConfig = {
 *   name: 'last-modified',
 *   initialValue: new Date(),
 *   parse: (str: string) => new Date(str),
 *   stringify: (date: Date) => date.toISOString(),
 * };
 * ```
 */
export interface PersistentStateSignalConfig<T> extends StateSignalConfig<T>, LocalStorageProviderConfig<T> {
  /**
   * The key under which to store the signal's state in localStorage.
   * @default `signal-name`
   */
  storageKey?: string;

  /**
   * The debounce delay (in milliseconds) for saving changes to localStorage.
   * This helps to reduce the frequency of write operations, which can be costly in terms of performance.
   * @default 1000
   */
  saveDebounceDelay?: number;
}

/**
 * Configuration for a session state signal.
 * The state is persisted in `sessionStorage` and cleared when the tab closes.
 *
 * This configuration extends both `StateSignalConfig` and `SessionStorageProviderConfig`,
 * inheriting all storage-related options including `parse` and `stringify` for custom serialization.
 *
 * @template T The type of the state it holds. If custom `parse` and `stringify` functions are
 * provided, T can be any type (e.g., Date, Map, Set). Otherwise, T must be JSON-serializable.
 *
 * @example
 * ```typescript
 * // Basic configuration with JSON-serializable state
 * const config = {
 *   name: 'my-signal',
 *   initialValue: { count: 0 },
 * };
 *
 * // Configuration with custom serialization for Date type
 * const dateConfig = {
 *   name: 'timestamp-signal',
 *   initialValue: new Date(),
 *   parse: (str: string) => new Date(str),
 *   stringify: (date: Date) => date.toISOString(),
 * };
 * ```
 */
export interface SessionStateSignalConfig<T> extends StateSignalConfig<T>, SessionStorageProviderConfig<T> {
  /**
   * The key used to store data in `sessionStorage`.
   * Defaults to the signal's `name` if not provided.
   *
   * @default `name`
   *
   * @example
   * 'checkout-wizard-state'
   */
  storageKey?: string;

  /**
   * The debounce delay in milliseconds for writing changes to `sessionStorage`.
   *
   * @default 1000
   */
  saveDebounceDelay?: number;
}

/**
 * Determines whether the payload argument for a given channel message is
 * required or optional, based solely on the declared type in `TMap`.
 *
 * - `void | undefined` → payload is optional (second arg may be omitted).
 * - anything else      → payload is **required** (omitting it is a compile error).
 *
 * This is used to build the rest-parameter tuple for `dispatch()` so that
 * TypeScript enforces the correct call signature at every dispatch site.
 *
 * @template TMap A record mapping message names to their payload types.
 * @template K    The specific message name key.
 *
 * @example
 * ```ts
 * // ActionRecord: { 'logout': void; 'add-to-cart': {productId: number} }
 * type A = DispatchArgs<ActionRecord, 'logout'>;       // [name: 'logout', payload?: void]
 * type B = DispatchArgs<ActionRecord, 'add-to-cart'>;  // [name: 'add-to-cart', payload: {productId: number}]
 * ```
 */
export type DispatchArgs<TMap extends object, K extends keyof TMap> =
  TMap[K] extends void | undefined ? [name: K, payload?: TMap[K]] : [name: K, payload: TMap[K]];

/**
 * A single message dispatched through a `ChannelSignal`.
 *
 * `name` identifies the message type (e.g. `'open-drawer'`, `'add-to-cart'`).
 * `payload` carries the associated data, whose type is determined by the generic `TMap` based on the `name`.
 *
 * @template TMap A record mapping message names to their payload types.
 * @template K    The specific message name key (inferred, not set manually).
 */
export type ChannelMessage<TMap extends object, K extends keyof TMap = keyof TMap> = {name: K; payload: TMap[K]};

/**
 * A typed handler for a specific named message on a `ChannelSignal`.
 * Receives only the `payload` — the name is already known at subscription time.
 *
 * The payload type mirrors `DispatchArgs`: it is `TMap[K] | undefined` only
 * when the declared type is `void | undefined`; otherwise it is exactly `TMap[K]`
 * (non-optional) so handlers do not need unnecessary null-guards.
 *
 * @template TMap A record mapping message names to their payload types.
 * @template K    The specific message name key.
 */
export type ChannelHandler<TMap extends object, K extends keyof TMap = keyof TMap> = (payload: TMap[K]) => void;

/**
 * Configuration for creating a `ChannelSignal`.
 */
export interface ChannelSignalConfig extends SignalConfig {}
