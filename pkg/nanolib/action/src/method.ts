import type {Awaitable, SingleOrArray} from '@alwatr/type-helper';
import type {SubscribeResult} from '@alwatr/signal';

import {internalChannel_, logger_} from './lib_.js';
import {modifierRegistry, payloadRegistry} from './registry_.js';
import type {Action, ActionRecord, DispatchParam, ModifierHandler, PayloadResolver} from './type.js';

// ─── Core Action API ──────────────────────────────────────────────────────────

/**
 * Subscribes to a named action dispatched anywhere in the application.
 *
 * `type` must be a key of `ActionRecord`. The handler receives the full
 * `Action<K>` object — giving access to `payload`, `context`, and `meta`
 * in one place. No manual generic annotation is needed; the compiler infers
 * the correct `payload` type from `ActionRecord`:
 *
 * ```ts
 * // ActionRecord declares: 'ui_add_to_cart': {productId: number; qty: number}
 * onAction('ui_add_to_cart', (action) => {
 *   cartService.add(action.payload.productId, action.payload.qty); // fully typed
 *   console.log(action.context); // e.g. 'product-list' (from DOM) or undefined
 * });
 * ```
 *
 * Passing an action name not declared in `ActionRecord` is a **compile error**.
 * Register new actions by extending `ActionRecord` via declaration merging:
 *
 * ```ts
 * // src/action-record.ts
 * declare module '@alwatr/action' {
 *   interface ActionRecord {
 *     'ui_open_drawer': string;
 *   }
 * }
 * ```
 *
 * Internally delegates to `ChannelSignal.on()` for **O(1) routing** — dispatching
 * action `'A'` never invokes handlers registered for action `'B'`.
 *
 * @param type    - A key of `ActionRecord`.
 * @param handler - Callback invoked with the full `Action<K>` on each dispatch.
 * @returns A `SubscribeResult` with an `unsubscribe()` method for cleanup.
 *
 * @example
 * ```ts
 * import {onAction} from '@alwatr/action';
 *
 * const sub = onAction('ui_page_ready', (action) => {
 *   router.setPage(action.payload); // payload: string — inferred from ActionRecord
 * });
 *
 * sub.unsubscribe(); // stop listening when no longer needed
 * ```
 */
export function onAction<K extends keyof ActionRecord>(
  type: SingleOrArray<K>,
  handler: (action: Action<K>) => Awaitable<void>,
): SubscribeResult {
  logger_.logMethodArgs?.('onAction', {type});
  // The internal channel stores Action<any>; we cast to Action<K> here because
  // the channel key guarantees the type matches — only Action<K> objects are
  // ever dispatched under key K.
  if (Array.isArray(type)) {
    const results: SubscribeResult[] = [];
    for (const t of type) {
      results.push(internalChannel_.on(t, handler as (action: Action) => Awaitable<void>));
    }
    return {
      unsubscribe: () => {
        for (const s of results) {
          s.unsubscribe();
        }
      },
    };
  }
  return internalChannel_.on(type, handler as (action: Action) => Awaitable<void>);
}

/**
 * Dispatches an action to all `onAction` subscribers with a matching `type`.
 *
 * Accepts a full `Action<K>` object. The `payload` field is automatically
 * typed from `ActionRecord[K]` — passing the wrong shape is a **compile error**:
 *
 * ```ts
 * // ActionRecord declares: 'ui_add_to_cart': {productId: number; qty: number}
 * dispatchAction({type: 'ui_add_to_cart', payload: {productId: 42, qty: 1}}); // ✅
 * dispatchAction({type: 'ui_add_to_cart', payload: 'wrong'});                  // ❌ compile error
 * dispatchAction({type: 'unknown_action', payload: 'x'});                   // ❌ compile error
 * ```
 *
 * The `context` and `meta` fields are optional. When dispatching from code
 * (not from the DOM), omit `context` — it is only meaningful for DOM-originated
 * actions where an `[action-context]` ancestor exists.
 *
 * Use `dispatchAction` when triggering an action from code — e.g. after an
 * async operation, from a service layer, or in tests. For DOM-driven actions,
 * use the `on-<eventType>` HTML attribute with `setupActionDelegation`.
 *
 * @param action - A full `Action<K>` object with at minimum `type` and `payload`.
 *
 * @example — with payload (code-originated action — no 'ui_' prefix)
 * ```ts
 * import {dispatchAction} from '@alwatr/action';
 *
 * dispatchAction({type: 'navigate', payload: '/dashboard'});
 * dispatchAction({type: 'upload_complete', payload: fileId});
 * ```
 *
 * @example — void payload (payload field is optional and can be omitted entirely)
 * ```ts
 * dispatchAction({type: 'auth_expired'});
 * // or explicitly:
 * dispatchAction({type: 'auth_expired', payload: undefined});
 * ```
 *
 * @example — with context and meta
 * ```ts
 * dispatchAction({
 *   type: 'slider_change',
 *   payload: 75,
 *   context: 'volume_slider',
 *   meta: {traceId: 'abc-123'},
 * });
 * ```
 */
export function dispatchAction<K extends keyof ActionRecord>(action: DispatchParam<K>): void {
  logger_.logMethodArgs?.('dispatchAction', action);
  internalChannel_.dispatch(action.type, action as Action<K>);
}

// ─── Extension API ────────────────────────────────────────────────────────────

/**
 * Registers a custom modifier that can be used in `on-<eventType>` attribute syntax.
 *
 * A modifier is a comma-separated token placed after the `;` separator
 * (e.g. `on-click="action-id; mymod"`). Its handler runs before the payload is
 * resolved and the action is dispatched. Returning `false` cancels the dispatch.
 *
 * The handler also receives the **mutable** `action` object being built, so it
 * can attach data to `action.meta` before the action reaches subscribers.
 *
 * Built-in modifiers (`prevent`, `validate`, `once`) are always available.
 * This function lets you add domain-specific ones.
 *
 * Registering the same name twice logs an accident and overwrites the previous
 * handler — avoid duplicate registrations in production code.
 *
 * @param name    - The modifier token (lowercase, no special characters).
 * @param handler - A `ModifierHandler` receiving `(event, element, action)`.
 *
 * @example — a `confirm` modifier that shows a browser dialog
 * ```ts
 * import {registerModifier} from '@alwatr/action';
 *
 * registerModifier('confirm', () => window.confirm('Are you sure?'));
 * ```
 * ```html
 * <button on-click="ui_delete_item:42; confirm">Delete</button>
 * ```
 *
 * @example — a `trace` modifier that stamps a trace ID into meta
 * ```ts
 * registerModifier('trace', (_event, _element, action) => {
 *   action.meta ??= {};
 *   action.meta['traceId'] = crypto.randomUUID();
 *   return true;
 * });
 * ```
 */
export function registerModifier(name: string, handler: ModifierHandler): void {
  logger_.logMethodArgs?.('registerModifier', {name});
  if (modifierRegistry.has(name)) {
    logger_.accident('registerModifier', 'modifier_already_registered', {name});
  }
  modifierRegistry.set(name, handler);
}

/**
 * Registers a custom payload resolver that can be used in `on-<eventType>` attribute syntax.
 *
 * A payload resolver is a colon-prefixed token in the attribute value
 * (e.g. `on-click="action-id:$mytoken"`). Its function is called at dispatch time
 * with the DOM event and the element. The return value becomes the `payload`
 * field of the `Action` object passed to `onAction` subscribers.
 *
 * Built-in resolvers (`$value`, `$formdata`, `$checked`) are always available.
 * This function lets you add domain-specific ones.
 *
 * Registering the same name twice logs an accident and overwrites the previous
 * resolver — avoid duplicate registrations in production code.
 *
 * @param name     - The resolver token (should start with `$` by convention).
 * @param resolver - A `PayloadResolver` receiving `(event, element)`.
 *
 * @example — a `$data-id` resolver that reads a data attribute
 * ```ts
 * import {registerPayloadResolver} from '@alwatr/action';
 *
 * registerPayloadResolver('$data-id', (_event, element) => {
 *   return (element as HTMLElement).dataset.id ?? null;
 * });
 * ```
 * ```html
 * <button on-click="ui_select_item:$data-id" data-id="42">Select</button>
 * ```
 */
export function registerPayloadResolver(name: string, resolver: PayloadResolver): void {
  logger_.logMethodArgs?.('registerPayloadResolver', {name});
  if (payloadRegistry.has(name)) {
    logger_.accident('registerPayloadResolver', 'payload_resolver_already_registered', {name});
  }
  payloadRegistry.set(name, resolver);
}
