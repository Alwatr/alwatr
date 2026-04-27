/**
 * @file action.ts
 *
 * Defines the Alwatr Flux Standard Action (AFSA) — the single, unified data
 * structure that flows through the entire action bus for both dispatch and
 * subscription.
 *
 * ## Why a single Action object?
 *
 * Previously, `dispatchAction(id, payload)` and `onAction(id, handler(payload))`
 * treated the action as two separate concerns: an identifier and a raw payload.
 * This made it impossible to carry cross-cutting metadata (context, trace IDs,
 * timestamps) without breaking every call site.
 *
 * AFSA wraps everything into one object:
 * - `type`    — the action identifier (replaces the first positional argument)
 * - `payload` — the business data (replaces the second positional argument)
 * - `context` — the DOM context extracted from the nearest `[action-context]`
 *               ancestor at delegation time; `undefined` for programmatic dispatches
 * - `meta`    — open-ended bag for future cross-cutting concerns (trace IDs,
 *               timestamps, A/B flags, etc.) without breaking the typed API
 *
 * Modifiers in the delegation pipeline can also mutate `meta` before the action
 * reaches subscribers — e.g. a `trace` modifier could stamp a request ID.
 */

import type {DictionaryOpt} from '@alwatr/type-helper';
import type {ActionRecord} from './action-record.js';

/**
 * Alwatr Flux Standard Action (AFSA).
 *
 * The single, canonical object passed to every `dispatchAction` call and
 * received by every `onAction` handler. Keeping all action data in one
 * structure makes the bus extensible without breaking existing call sites.
 *
 * @template K - A key of `ActionRecord`; constrains `type` and `payload` together.
 *
 * @example — dispatching
 * ```ts
 * dispatchAction({type: 'add_to_cart', payload: {productId: 42, qty: 1}});
 * ```
 *
 * @example — subscribing
 * ```ts
 * onAction('add_to_cart', (action) => {
 *   console.log(action.type);    // 'add_to_cart'
 *   console.log(action.payload); // {productId: 42, qty: 1}
 *   console.log(action.context); // e.g. 'product-list' (from DOM) or undefined
 * });
 * ```
 */
export interface Action<K extends keyof ActionRecord = keyof ActionRecord> {
  /**
   * Unique action identifier — must be a key of `ActionRecord`.
   *
   * @example 'cart:add-item', 'open_drawer', 'logout'
   */
  readonly type: K;

  /**
   * The DOM context in which the action was triggered.
   *
   * Extracted at delegation time from the nearest ancestor element that carries
   * an `action-context` attribute. Useful for scoping the same action type to
   * different UI regions (e.g. two sliders on the same page both dispatching
   * `'slider:change'` but with different context values).
   *
   * `undefined` when the action is dispatched programmatically (no DOM involved)
   * or when no `[action-context]` ancestor exists.
   *
   * @example 'slider-123', 'product-list', 'checkout-form'
   */
  readonly context?: string;

  /**
   * The pure business payload carried by this action.
   *
   * Type is inferred from `ActionRecord[K]` — the compiler enforces the correct
   * shape at every call site. No manual generic annotation is needed.
   */
  readonly payload: ActionRecord[K];

  /**
   * Open-ended metadata bag for cross-cutting concerns.
   *
   * Intentionally untyped so that future infrastructure layers (tracing,
   * analytics, A/B testing) can attach data without touching the typed API.
   * Modifiers in the delegation pipeline may also write to `meta` before the
   * action reaches subscribers.
   *
   * Treat values here as `unknown` and validate before use.
   *
   * @example {traceId: 'abc-123', timestamp: Date.now()}
   */
  meta?: DictionaryOpt<unknown>;
}
