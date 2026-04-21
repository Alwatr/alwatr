import {internalSignal_, logger_} from './lib.js';
import type {SubscribeResult} from '@alwatr/signal';
import {modifierRegistry, payloadRegistry, type ModifierHandler, type PayloadResolver} from './registry.js';

// Re-export extension types so consumers can import them from the package root.
export type {ModifierHandler, PayloadResolver};

// ─── Core Action API ──────────────────────────────────────────────────────────

/**
 * Subscribes to a named action dispatched anywhere in the application.
 *
 * The handler is invoked every time `dispatchAction(actionId, payload)` is
 * called — whether from an `on-action` directive or from code — and the
 * `actionId` matches. Multiple subscribers for the same `actionId` are all
 * notified in subscription order.
 *
 * The generic parameter `T` narrows the type of the received payload.
 * Defaults to `string`, which covers the common case of attribute-driven
 * literal payloads.
 *
 * @param actionId - The action identifier to listen for (e.g. `'open-drawer'`).
 * @param handler  - Callback invoked with the resolved payload each time the
 *                   action is dispatched. `payload` is `undefined` when the
 *                   action was dispatched without a value.
 * @returns A `SubscribeResult` with an `unsubscribe()` method for cleanup.
 *
 * @example — basic string payload
 * ```ts
 * import {onAction} from '@alwatr/action';
 *
 * const sub = onAction('open-drawer', (panel) => {
 *   openDrawer(panel); // panel === 'settings'
 * });
 *
 * // Stop listening when the component is destroyed
 * sub.unsubscribe();
 * ```
 *
 * @example — typed object payload
 * ```ts
 * import {onAction} from '@alwatr/action';
 *
 * onAction<{productId: number; qty: number}>('add-to-cart', (item) => {
 *   cartService.add(item!.productId, item!.qty);
 * });
 * ```
 */
export function onAction<T = string>(actionId: string, handler: (payload?: T) => void): SubscribeResult {
  logger_.logMethodArgs?.('onAction', {actionId});
  return internalSignal_.subscribe((signal) => {
    if (signal.actionId === actionId) {
      logger_.logMethodArgs?.('onAction.invoke', {actionId, payload: signal.actionPayload});
      handler(signal.actionPayload as T);
    }
  });
}

/**
 * Dispatches a named action to all `onAction` subscribers with a matching `actionId`.
 *
 * This is the programmatic counterpart to the `on-action` HTML attribute.
 * Use it when you need to trigger an action from code rather than from a DOM
 * event (e.g. after an async operation completes, or from a service layer).
 *
 * The generic parameter `T` types the payload. Omit it to default to `string`.
 *
 * @param actionId     - The action identifier (e.g. `'navigate'`).
 * @param actionPayload - Optional value passed to every matching subscriber.
 *
 * @example — dispatch without payload
 * ```ts
 * import {dispatchAction} from '@alwatr/action';
 *
 * dispatchAction('logout');
 * ```
 *
 * @example — dispatch with a typed payload
 * ```ts
 * import {dispatchAction} from '@alwatr/action';
 *
 * dispatchAction('navigate', '/dashboard');
 * dispatchAction<{code: number}>('show-error', {code: 404});
 * ```
 */
export function dispatchAction<T = string>(actionId: string, actionPayload?: T): void {
  logger_.logMethodArgs?.('dispatchAction', {actionId, actionPayload});
  internalSignal_.dispatch({actionId, actionPayload});
}

// ─── Extension API ────────────────────────────────────────────────────────────

/**
 * Registers a custom modifier that can be used in `on-action` attribute syntax.
 *
 * A modifier is a dot-chained token placed after the event type
 * (e.g. `click.mymod->action-id`). Its handler runs before the payload is
 * resolved and the action is dispatched. Returning `false` cancels the dispatch.
 *
 * Built-in modifiers (`prevent`, `stop`, `validate`, `once`, `passive`) are
 * always available. This function lets you add domain-specific ones.
 *
 * Registering the same name twice logs an accident and overwrites the previous
 * handler — avoid duplicate registrations in production code.
 *
 * @param name    - The modifier token (lowercase, no dots or arrows).
 * @param handler - The `ModifierHandler` function bound to the directive instance.
 *
 * @example — a `confirm` modifier that shows a browser dialog
 * ```ts
 * import {registerModifier} from '@alwatr/action';
 *
 * registerModifier('confirm', function () {
 *   return window.confirm('Are you sure?');
 * });
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
 * with the directive instance as `this` and the DOM event as the argument.
 * The return value becomes the `actionPayload` passed to `onAction` subscribers.
 *
 * Built-in resolvers (`$value`, `$formdata`) are always available. This function
 * lets you add domain-specific ones.
 *
 * Registering the same name twice logs an accident and overwrites the previous
 * resolver — avoid duplicate registrations in production code.
 *
 * @param name     - The resolver token (should start with `$` by convention).
 * @param resolver - The `PayloadResolver` function bound to the directive instance.
 *
 * @example — a `$checked` resolver for checkbox state
 * ```ts
 * import {registerPayloadResolver} from '@alwatr/action';
 *
 * registerPayloadResolver('$checked', function () {
 *   return (this.element_ as HTMLInputElement).checked;
 * });
 * ```
 * ```html
 * <input type="checkbox" on-action="change->toggle-feature:$checked" />
 * ```
 *
 * @example — a `$dataset-id` resolver for data attributes
 * ```ts
 * registerPayloadResolver('$dataset-id', function () {
 *   return (this.element_ as HTMLElement).dataset.id ?? null;
 * });
 * ```
 * ```html
 * <li on-action="click->select-item:$dataset-id" data-id="42">Item</li>
 * ```
 */
export function registerPayloadResolver(name: string, resolver: PayloadResolver): void {
  logger_.logMethodArgs?.('registerPayloadResolver', {name});
  if (payloadRegistry.has(name)) {
    logger_.accident('registerPayloadResolver', 'payload_resolver_already_registered', {name});
  }
  payloadRegistry.set(name, resolver);
}
