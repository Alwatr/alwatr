import {internalChannel_, logger_} from './lib.js';
import type {SubscribeResult} from '@alwatr/signal';
import {modifierRegistry, payloadRegistry, type ModifierHandler, type PayloadResolver} from './registry.js';
import type {ActionRecord} from './action-record.js';

// Re-export extension types so consumers can import them from the package root.
export type {ModifierHandler, PayloadResolver};

// ─── Core Action API ──────────────────────────────────────────────────────────

/**
 * Subscribes to a named action dispatched anywhere in the application.
 *
 * `actionId` must be a key of `ActionRecord`. The handler's `payload` parameter
 * is automatically typed to the corresponding `ActionRecord` value — no manual
 * generic annotation needed:
 *
 * ```ts
 * // ActionRecord declares: 'add-to-cart': {productId: number; qty: number}
 * onAction('add-to-cart', (item) => {
 *   cartService.add(item.productId, item.qty); // fully typed, no `!` needed
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
 *     'open-drawer': string;
 *   }
 * }
 * ```
 *
 * Internally delegates to `ChannelSignal.on()` for **O(1) routing** — dispatching
 * action `'A'` never invokes handlers registered for action `'B'`.
 *
 * @param actionId - A key of `ActionRecord`.
 * @param handler  - Callback invoked with the typed payload on each dispatch.
 * @returns A `SubscribeResult` with an `unsubscribe()` method for cleanup.
 *
 * @example
 * ```ts
 * import {onAction} from '@alwatr/action';
 *
 * const sub = onAction('page-ready', (pageId) => {
 *   router.setPage(pageId); // pageId: string — inferred from ActionRecord
 * });
 *
 * sub.unsubscribe(); // stop listening when no longer needed
 * ```
 */
export function onAction<K extends keyof ActionRecord>(
  actionId: K,
  handler: (payload: ActionRecord[K]) => void,
): SubscribeResult {
  logger_.logMethodArgs?.('onAction', {actionId});
  // Cast through `unknown` to bridge the gap between the strict public signature
  // (ActionRecord[K]) and the internal channel's wider type (ActionRecord & Record<string, unknown>).
  return internalChannel_.on(actionId as string, handler as (payload: unknown) => void);
}

/**
 * Dispatches a named action to all `onAction` subscribers with a matching `actionId`.
 *
 * `actionId` must be a key of `ActionRecord`. The `payload` parameter is
 * automatically typed — passing the wrong type is a **compile error**:
 *
 * ```ts
 * // ActionRecord declares: 'add-to-cart': {productId: number; qty: number}
 * dispatchAction('add-to-cart', {productId: 42, qty: 1}); // ✅
 * dispatchAction('add-to-cart', 'wrong');                  // ❌ compile error
 * dispatchAction('unknown-action', 'x');                   // ❌ compile error
 * ```
 *
 * Register new actions by extending `ActionRecord` via declaration merging:
 *
 * ```ts
 * // src/action-record.ts
 * declare module '@alwatr/action' {
 *   interface ActionRecord {
 *     'navigate': string;
 *     'logout': void;
 *   }
 * }
 * ```
 *
 * Use `dispatchAction` when triggering an action from code — e.g. after an
 * async operation, from a service layer, or in tests. For DOM-driven actions,
 * use the `on-action` HTML attribute with `setupActionDelegation`.
 *
 * @param actionId      - A key of `ActionRecord`.
 * @param actionPayload - The payload; type is enforced by `ActionRecord`.
 *
 * @example — with payload
 * ```ts
 * import {dispatchAction} from '@alwatr/action';
 *
 * dispatchAction('page-ready', 'home');
 * dispatchAction('navigate', '/dashboard');
 * ```
 *
 * @example — void payload (no second argument)
 * ```ts
 * dispatchAction('logout');
 * ```
 */
// Overload for actions with a void/undefined payload — second argument omitted.
export function dispatchAction<K extends keyof ActionRecord>(
  ...args: ActionRecord[K] extends void | undefined ? [actionId: K] : [actionId: K, actionPayload: ActionRecord[K]]
): void;
// Implementation — accepts any declared key; payload is unknown at runtime.
export function dispatchAction(actionId: string, actionPayload?: unknown): void {
  logger_.logMethodArgs?.('dispatchAction', {actionId, actionPayload});
  internalChannel_.dispatch(actionId as string, actionPayload);
}

// ─── Extension API ────────────────────────────────────────────────────────────

/**
 * Registers a custom modifier that can be used in `on-action` attribute syntax.
 *
 * A modifier is a dot-chained token placed after the event type
 * (e.g. `click.mymod->action-id`). Its handler runs before the payload is
 * resolved and the action is dispatched. Returning `false` cancels the dispatch.
 *
 * Built-in modifiers (`prevent`, `stop`, `validate`, `once`) are always
 * available. This function lets you add domain-specific ones.
 *
 * Registering the same name twice logs an accident and overwrites the previous
 * handler — avoid duplicate registrations in production code.
 *
 * @param name    - The modifier token (lowercase, no dots or arrows).
 * @param handler - A `ModifierHandler` receiving `(event, element)`.
 *
 * @example — a `confirm` modifier that shows a browser dialog
 * ```ts
 * import {registerModifier} from '@alwatr/action';
 *
 * registerModifier('confirm', () => window.confirm('Are you sure?'));
 * ```
 * ```html
 * <button on-action="click.confirm->delete-item:42">Delete</button>
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
 * Registers a custom payload resolver that can be used in `on-action` attribute syntax.
 *
 * A payload resolver is a colon-suffixed token in the attribute value
 * (e.g. `click->action-id:$mytoken`). Its function is called at dispatch time
 * with an `ActionContext` as `this` and the DOM event as the argument.
 * The return value becomes the `actionPayload` passed to `onAction` subscribers.
 *
 * Built-in resolvers (`$value`, `$formdata`) are always available. This function
 * lets you add domain-specific ones.
 *
 * Registering the same name twice logs an accident and overwrites the previous
 * resolver — avoid duplicate registrations in production code.
 *
 * @param name     - The resolver token (should start with `$` by convention).
 * @param resolver - A `PayloadResolver` receiving `(event, element)`.
 *
 * @example — a `$checked` resolver for checkbox state
 * ```ts
 * import {registerPayloadResolver} from '@alwatr/action';
 *
 * registerPayloadResolver('$checked', (_event, element) => {
 *   return (element as HTMLInputElement).checked;
 * });
 * ```
 * ```html
 * <input type="checkbox" on-action="change->toggle-feature:$checked" />
 * ```
 */
export function registerPayloadResolver(name: string, resolver: PayloadResolver): void {
  logger_.logMethodArgs?.('registerPayloadResolver', {name});
  if (payloadRegistry.has(name)) {
    logger_.accident('registerPayloadResolver', 'payload_resolver_already_registered', {name});
  }
  payloadRegistry.set(name, resolver);
}
