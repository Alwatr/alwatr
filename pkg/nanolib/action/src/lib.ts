import {createLogger} from '@alwatr/logger';
import {createEventSignal} from '@alwatr/signal';

/**
 * The shape of every payload carried by the internal action signal.
 *
 * `actionId` identifies which action was dispatched (e.g. `'open-drawer'`).
 * `actionPayload` is the optional value attached to the action — defaults to
 * `string` but can be narrowed to any type via the generic parameter `T`.
 *
 * @template T The type of the action payload. Defaults to `string`.
 *
 * @example
 * ```ts
 * // Typed payload for a cart action
 * const payload: ActionSignalPayload<{productId: number; qty: number}> = {
 *   actionId: 'add-to-cart',
 *   actionPayload: {productId: 42, qty: 1},
 * };
 * ```
 */
export interface ActionSignalPayload<T = string> {
  actionId: string;
  actionPayload?: T;
}

/**
 * Module-scoped logger for `@alwatr/action`.
 * Scoped to `'alwatr-action'` so log lines are easy to filter in the console.
 *
 * @internal
 */
export const logger_ = createLogger('alwatr-action');

/**
 * The single shared event signal that carries every dispatched action.
 *
 * All `ActionDirective` instances write to this signal via `dispatchAction`,
 * and all `onAction` subscriptions read from it. Using one central signal keeps
 * the pub/sub wiring minimal and makes the action flow easy to trace.
 *
 * The payload is typed as `ActionSignalPayload<unknown>` at the signal level;
 * individual subscribers narrow the type through the `onAction` generic.
 *
 * @internal — not part of the public API; use `onAction` / `dispatchAction` instead.
 */
export const internalSignal_ = createEventSignal<ActionSignalPayload<unknown>>({name: 'alwatr-action'});
