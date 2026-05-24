import type {SubscribeResult} from '@alwatr/signal';
import type {Awaitable} from '@alwatr/type-helper';

import {actionService, ActionService} from './action-service.js';
import type {Action, ActionRecord, DispatchParam, ModifierHandler, PayloadResolver} from './type.js';

export {actionService, ActionService};
export type {Action, ActionRecord, DispatchParam, ModifierHandler, PayloadResolver};

/**
 * Default DOM event types that cover the vast majority of interactive elements.
 *
 * - `click` — buttons, links, checkboxes, custom interactive elements
 * - `submit` — form submission
 * - `input` — live text input, range sliders
 * - `change` — select boxes, checkboxes, radio buttons (fires on commit)
 */
export const DEFAULT_DELEGATED_EVENTS = ActionService.DEFAULT_DELEGATED_EVENTS;

/**
 * Subscribes to a named action dispatched anywhere in the application.
 *
 * @template K - A key of ActionRecord.
 * @param type    - Action type or array of action types to subscribe to.
 * @param handler - Callback invoked with the full Action object.
 * @returns SubscribeResult containing an `unsubscribe` method.
 *
 * @example
 * ```ts
 * import {onAction} from '@alwatr/action';
 *
 * // Subscribe to multiple action types
 * const sub = onAction(['ui_open_drawer', 'ui_close_drawer'], (action) => {
 *   console.log(action.type, action.payload);
 * });
 * sub.unsubscribe();
 * ```
 *
 * @deprecated Use `actionService.on` instead.
 */
export function onAction<K extends keyof ActionRecord>(
  type: K | K[],
  handler: (action: Action<K>) => Awaitable<void>,
): SubscribeResult {
  return actionService.on(type, handler);
}

/**
 * Dispatches an action to all subscribers matching `action.type`.
 *
 * @template K - A key of ActionRecord.
 * @param action - Action object containing `type` and `payload`.
 *
 * @example
 * ```ts
 * import {dispatchAction} from '@alwatr/action';
 *
 * // Dispatches a typed action (payload is required)
 * dispatchAction({type: 'upload_complete', payload: 'file-123'});
 *
 * // Dispatches a void action (payload can be omitted)
 * dispatchAction({type: 'auth_expired'});
 * ```
 *
 * @deprecated Use `actionService.dispatch` instead.
 */
export function dispatchAction<K extends keyof ActionRecord>(action: DispatchParam<K>): void {
  actionService.dispatch(action);
}

/**
 * Registers global event delegation listeners on `document.body`.
 *
 * @param eventTypes - List of event types to delegate. Defaults to DEFAULT_DELEGATED_EVENTS.
 *
 * @example
 * ```ts
 * import {setupActionDelegation} from '@alwatr/action';
 *
 * setupActionDelegation();
 * ```
 *
 * @deprecated Use `actionService.setupDelegation` instead.
 */
export function setupActionDelegation(eventTypes?: readonly string[]): void {
  actionService.setupDelegation(eventTypes);
}

/**
 * Unregisters all global event delegation listeners.
 *
 * @example
 * ```ts
 * import {teardownActionDelegation} from '@alwatr/action';
 *
 * teardownActionDelegation();
 * ```
 *
 * @deprecated Use `actionService.teardownDelegation` instead.
 */
export function teardownActionDelegation(): void {
  actionService.teardownDelegation();
}

/**
 * Registers a custom modifier to enrich or filter actions before dispatch.
 *
 * @param name    - Modifier name (lowercase, alphanumeric).
 * @param handler - Function called when modifier is invoked.
 *
 * @example
 * ```ts
 * import {registerModifier} from '@alwatr/action';
 *
 * registerModifier('trace', (_event, _element, action) => {
 *   action.meta ??= {};
 *   action.meta['time'] = Date.now();
 *   return true;
 * });
 * ```
 *
 * @deprecated Use `actionService.registerModifier` instead.
 */
export function registerModifier(name: string, handler: ModifierHandler): void {
  actionService.registerModifier(name, handler);
}

/**
 * Registers a custom payload resolver to map DOM state to action payload.
 *
 * @param name     - Resolver token (by convention starting with `$`).
 * @param resolver - Function yielding payload from the event and element.
 *
 * @example
 * ```ts
 * import {registerPayloadResolver} from '@alwatr/action';
 *
 * registerPayloadResolver('$data-id', (_event, element) => {
 *   return element.dataset.id;
 * });
 * ```
 *
 * @deprecated Use `actionService.registerPayloadResolver` instead.
 */
export function registerPayloadResolver(name: string, resolver: PayloadResolver): void {
  actionService.registerPayloadResolver(name, resolver);
}
