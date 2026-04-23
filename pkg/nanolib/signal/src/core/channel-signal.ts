import {delay} from '@alwatr/delay';
import {createLogger, type AlwatrLogger} from '@alwatr/logger';

import {SignalBase} from './signal-base.js';

import type {SignalConfig, SubscribeOptions, SubscribeResult, ListenerCallback} from '../type.js';

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * A single message dispatched through a `ChannelSignal`.
 *
 * `name` identifies the message type (e.g. `'open-drawer'`, `'add-to-cart'`).
 * `payload` is the optional value attached to the message — its type is narrowed
 * by the generic map `TMap` at the class level.
 *
 * @template TMap A record mapping message names to their payload types.
 * @template K    The specific message name key (inferred, not set manually).
 */
export type ChannelMessage<TMap extends Record<string, unknown>, K extends keyof TMap = keyof TMap> =
  K extends keyof TMap ? {name: K; payload?: TMap[K]} : never;

/**
 * A typed handler for a specific named message on a `ChannelSignal`.
 * Receives only the `payload` — the name is already known at subscription time.
 *
 * @template TMap A record mapping message names to their payload types.
 * @template K    The specific message name key.
 */
export type ChannelHandler<TMap extends Record<string, unknown>, K extends keyof TMap> = (
  payload: TMap[K] | undefined,
) => void | Promise<void>;

/**
 * Configuration for creating a `ChannelSignal`.
 */
export interface ChannelSignalConfig extends SignalConfig {}

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
export class ChannelSignal<TMap extends Record<string, unknown>> extends SignalBase<ChannelMessage<TMap>> {
  /**
   * The logger instance for this signal.
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
   * @private
   */
  private readonly namedHandlers__: Map<keyof TMap, Set<{handler: ChannelHandler<TMap, keyof TMap>; once: boolean}>> =
    new Map();

  constructor(config: ChannelSignalConfig) {
    super(config);
    this.logger_ = createLogger(`channel-signal:${this.name}`);
    this.logger_.logMethod?.('constructor');
  }

  /**
   * Dispatches a named message to:
   * 1. All handlers registered via `on(name, …)` for this specific name — O(1).
   * 2. All raw-stream subscribers registered via `subscribe()` — O(N subscribers).
   *
   * The notification is scheduled as a microtask to ensure non-blocking,
   * consistent delivery — matching the behavior of `EventSignal`.
   *
   * TypeScript enforces that `payload` matches the type declared for `name`
   * in `TMap`. If the payload type is `void` or `undefined`, the argument can
   * be omitted entirely.
   *
   * @param name    The message name (must be a key of `TMap`).
   * @param payload The optional payload for the message.
   *
   * @example
   * ```ts
   * channel.dispatch('open-drawer', {panel: 'settings'});
   * channel.dispatch('close-drawer'); // no payload needed
   * ```
   */
  public dispatch<K extends keyof TMap>(name: K, payload?: TMap[K]): void {
    this.logger_.logMethodArgs?.('dispatch', {name, payload});
    this.checkDestroyed_();
    delay.nextMicrotask().then(() => this.route__(name, payload));
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
    this.logger_.logMethodArgs?.('on', {name});
    this.checkDestroyed_();

    // Retrieve or create the handler set for this message name.
    let handlerSet = this.namedHandlers__.get(name);
    if (!handlerSet) {
      handlerSet = new Set();
      this.namedHandlers__.set(name, handlerSet);
    }

    // Cast is safe: K extends keyof TMap, so ChannelHandler<TMap, K> is
    // assignable to ChannelHandler<TMap, keyof TMap> at runtime.
    const entry = {handler: handler as ChannelHandler<TMap, keyof TMap>, once: options?.once ?? false};
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
    this.logger_.logMethodArgs?.('subscribe', options);
    return super.subscribe(callback, options);
  }

  /**
   * Core routing method — called inside the microtask scheduled by `dispatch`.
   *
   * 1. Looks up the per-name handler set in O(1).
   * 2. Invokes each handler, removing `once` entries after their first call.
   * 3. Notifies raw-stream subscribers via `SignalBase.notify_()`.
   *
   * @private
   */
  private route__<K extends keyof TMap>(name: K, payload: TMap[K] | undefined): void {
    if (this.isDestroyed) return;
    // ── Named handlers (O(1) lookup) ──────────────────────────────────────────
    const handlerSet = this.namedHandlers__.get(name);
    if (handlerSet?.size) {
      // Snapshot the set before iteration to safely handle `once` removals.
      for (const entry of handlerSet) {
        if (entry.once) {
          handlerSet.delete(entry);
          if (handlerSet.size === 0) this.namedHandlers__.delete(name);
        }
        try {
          const result = entry.handler(payload);
          if (result instanceof Promise) {
            result.catch((err) => this.logger_.error('route__', 'async_named_handler_failed', err));
          }
        } catch (err) {
          this.logger_.error('route__', 'sync_named_handler_failed', err);
        }
      }
    }

    // ── Raw-stream subscribers (SignalBase observers) ─────────────────────────
    this.notify_({name, payload} as unknown as ChannelMessage<TMap>);
  }

  /**
   * Destroys the signal, clearing all named handlers and raw-stream subscribers.
   */
  public override destroy(): void {
    this.namedHandlers__.clear();
    super.destroy();
  }
}
