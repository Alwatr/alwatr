import {queueMicrotask} from '@alwatr/delay';
import {createLogger, type AlwatrLogger} from '@alwatr/logger';
import {SignalBase} from './signal-base.js';
import type {
  SubscribeOptions,
  SubscribeResult,
  ListenerCallback,
  ChannelHandler,
  ChannelMessage,
  ChannelSignalConfig,
  DispatchArgs,
} from '../type.js';

/**
 * Internal handler type used inside `namedHandlers__`.
 *
 * At the storage boundary we erase the conditional payload type to `unknown`
 * so TypeScript does not need to evaluate the conditional against every
 * possible `K`. Type safety is already enforced at the public `on()` and
 * `dispatch()` call sites — the internal executor only needs to call the
 * function with the value it received.
 *
 * @internal
 */
type InternalHandler = (payload: unknown) => void;

// ─── Class ────────────────────────────────────────────────────────────────────

/**
 * A stateless multi-channel signal that acts as a typed O(1) message bus.
 *
 * `ChannelSignal` is ideal when you need a single signal to carry multiple
 * distinct message types — each identified by a `name` — rather than creating
 * a separate `EventSignal` for every event.
 *
 * ### Routing architecture
 *
 * Internally, `on()` subscriptions are stored in a per-name `Map` of handler
 * sets. When a message is dispatched, only the handlers registered for that
 * specific name are invoked — O(1) lookup regardless of how many distinct
 * names are subscribed. The inherited `SignalBase` observer list is used
 * exclusively by `subscribe()`, which receives the raw message stream for
 * logging or middleware purposes.
 *
 * ### Type safety
 *
 * The generic parameter `TMap` is a record that maps every valid message name
 * to its payload type. TypeScript enforces the correct payload type at both
 * `dispatch` and `on` call sites.
 *
 * @template TMap A record mapping message names to their payload types.
 *
 * @example
 * ```ts
 * interface AppMessages {
 *   'open-drawer': {panel: string};
 *   'close-drawer': void;
 *   'show-toast': {message: string; type: 'info' | 'error'};
 * }
 *
 * const appChannel = new ChannelSignal<AppMessages>({name: 'app-channel'});
 *
 * // Subscribe to a specific message — handler receives payload directly
 * appChannel.on('open-drawer', (payload) => {
 *   openDrawer(payload!.panel);
 * });
 *
 * // Dispatch a typed message
 * appChannel.dispatch('open-drawer', {panel: 'settings'});
 * appChannel.dispatch('close-drawer'); // no payload needed
 * ```
 */
export class ChannelSignal<TMap extends object> extends SignalBase<ChannelMessage<TMap>> {
  /**
   * The logger instance for this signal.
   *
   * @protected
   */
  protected logger_: AlwatrLogger;

  /**
   * Per-name handler registry for O(1) routing.
   *
   * Each key is a message name; the value is a Set of `{handler, once}` entries
   * registered via `on()`. Kept separate from `SignalBase`'s observer list so
   * that `subscribe()` (raw stream) and `on()` (named routing) never interfere.
   *
   * Stored as `InternalHandler` (erased to `unknown` payload) to avoid
   * unevaluable conditional types at the storage boundary. Type safety is
   * enforced at the public `on()` and `dispatch()` call sites.
   *
   * @private
   */
  private readonly namedHandlers__ = new Map<keyof TMap, Set<{handler: InternalHandler; once: boolean}>>();

  /**
   * Creates a new ChannelSignal instance.
   *
   * @param config Configuration options including the unique channel name and cleanup hook.
   */
  constructor(config: ChannelSignalConfig) {
    super(config);
    this.logger_ = createLogger(`channel_signal:${this.name}`);
    DEV_MODE && this.logger_.logMethod?.('constructor');
  }

  /**
   * Dispatches a named message to:
   * 1. All handlers registered via `on(name, …)` for this specific name — O(1).
   * 2. All raw-stream subscribers registered via `subscribe()` — O(N subscribers).
   *
   * The notification is scheduled as a microtask to ensure non-blocking,
   * consistent delivery — matching the behavior of `EventSignal`.
   *
   * ### Payload enforcement
   *
   * The payload argument is **required** unless the declared type in `TMap` is
   * `void` or `undefined`. Omitting a required payload — or passing `undefined`
   * for a non-optional type — is a **compile error**. This prevents accidental
   * `undefined` from propagating into handlers that expect a real value.
   *
   * ```ts
   * // TMap: { 'add-to-cart': {productId: number}; 'logout': void }
   * channel.dispatch('add-to-cart', {productId: 42}); // ✅ required payload
   * channel.dispatch('add-to-cart');                  // ❌ compile error
   * channel.dispatch('logout');                       // ✅ void — no payload
   * channel.dispatch('logout', undefined);            // ✅ also fine
   * ```
   *
   * @template K The specific message name key.
   * @param args Tuple of `[name, payload]` — payload optionality is enforced
   *             by `DispatchArgs<TMap, K>` based on the declared type.
   */
  public dispatch<K extends keyof TMap>(...args: DispatchArgs<TMap, K>): void {
    const [name, payload] = args;
    DEV_MODE && this.logger_.logMethodArgs?.('dispatch', {name, payload});
    this.checkDestroyed_();
    queueMicrotask(() => this.route__(name, payload));
  }

  /**
   * Subscribes to a specific named message on this channel.
   *
   * Uses an internal per-name handler map for O(1) routing — dispatching a
   * message with name `'A'` will never invoke handlers registered for `'B'`.
   *
   * The handler receives the `payload` directly (not the full `{name, payload}`
   * envelope) — since the name is already known at subscription time, passing
   * it again would be redundant.
   *
   * @template K    The specific message name key.
   * @param name    The message name to listen for.
   * @param handler Callback invoked with the payload each time the named message
   *                is dispatched.
   * @param options Standard subscribe options. Only `once` is supported here;
   *                `priority` applies to `subscribe()` (raw stream) only.
   * @returns A `SubscribeResult` with an `unsubscribe()` method for cleanup.
   *
   * @example
   * ```ts
   * const sub = channel.on('open-drawer', (payload) => {
   *   openDrawer(payload!.panel);
   * });
   *
   * // Stop listening when the component is destroyed
   * sub.unsubscribe();
   * ```
   */
  public on<K extends keyof TMap>(
    name: K,
    handler: ChannelHandler<TMap, K>,
    options?: Pick<SubscribeOptions, 'once'>,
  ): SubscribeResult {
    DEV_MODE && this.logger_.logMethodArgs?.('on', {name});
    this.checkDestroyed_();

    // Retrieve or create the handler set for this message name.
    let handlerSet = this.namedHandlers__.get(name);
    if (!handlerSet) {
      handlerSet = new Set();
      this.namedHandlers__.set(name, handlerSet);
    }

    const entry = {handler: handler as InternalHandler, once: options?.once ?? false};
    handlerSet.add(entry);

    return {
      unsubscribe: (): void => {
        handlerSet!.delete(entry);
        // Clean up the empty set to avoid memory leaks on long-lived channels.
        if (handlerSet!.size === 0) {
          this.namedHandlers__.delete(name);
        }
      },
    };
  }

  /**
   * Subscribes to **all** messages dispatched on this channel, regardless of name.
   *
   * Use this when you need to observe the raw message stream — for example,
   * for logging, debugging, or middleware-style processing.
   *
   * Prefer `on(name, handler)` for normal use cases to keep subscriptions
   * focused and type-safe.
   *
   * @param callback The function called with every `ChannelMessage`.
   * @param options  Standard subscribe options.
   * @returns A `SubscribeResult` with an `unsubscribe()` method.
   *
   * @example
   * ```ts
   * // Log every message for debugging
   * channel.subscribe((msg) => console.log('[channel]', msg.name, msg.payload));
   * ```
   */
  public override subscribe(
    callback: ListenerCallback<ChannelMessage<TMap>>,
    options?: SubscribeOptions,
  ): SubscribeResult {
    DEV_MODE && this.logger_.logMethodArgs?.('subscribe', options);
    return super.subscribe(callback, options);
  }

  /**
   * Core routing method — called inside the microtask scheduled by `dispatch`.
   *
   * 1. Looks up the per-name handler set in O(1).
   * 2. Invokes each handler, removing `once` entries after their first call.
   * 3. Notifies raw-stream subscribers via `SignalBase.notify_()`.
   *
   * @template K The specific message name key.
   * @param name The message name to route.
   * @param payload The payload associated with the message name.
   * @private
   */
  private route__<K extends keyof TMap>(name: K, payload: TMap[K] | undefined): void {
    if (this.isDestroyed) return;
    // ── Named handlers (O(1) lookup) ──────────────────────────────────────────
    const handlerSet = this.namedHandlers__.get(name);
    if (handlerSet?.size) {
      for (const entry of handlerSet) {
        if (entry.once) {
          handlerSet.delete(entry);
          if (handlerSet.size === 0) this.namedHandlers__.delete(name);
        }
        try {
          entry.handler(payload);
        } catch (err) {
          this.logger_.error('route__', 'sync_named_handler_failed', err);
        }
      }
    }

    // ── Raw-stream subscribers (SignalBase observers) ─────────────────────────
    this.notify_({name, payload} as ChannelMessage<TMap>);
  }

  /**
   * Destroys the signal, clearing all named handlers and raw-stream subscribers.
   */
  public override destroy(): void {
    this.namedHandlers__.clear();
    super.destroy();
  }
}
