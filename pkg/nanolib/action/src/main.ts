/**
 * @alwatr/action — Declarative DOM action-dispatch for Unidirectional Data Flow.
 *
 * Implements the **Alwatr Flux Standard Action (AFSA)** pattern: every action
 * flowing through the bus is a single, typed `Action<K>` object carrying
 * `type`, `payload`, `context`, and optional `meta`. This replaces the previous
 * two-argument `(id, payload)` API with a unified structure that is extensible
 * without breaking existing call sites.
 *
 * ## Activating `on-<eventType>` attributes
 *
 * Call `setupActionDelegation()` once at bootstrap. A single capture-phase
 * listener on `document.body` handles every `on-click`, `on-submit`, etc. element —
 * including elements added dynamically after bootstrap — with O(1) initialization cost.
 *
 * ```ts
 * import {setupActionDelegation, onAction} from '@alwatr/action';
 *
 * setupActionDelegation();
 * onAction('ui_open_drawer', (action) => openDrawer(action.payload));
 * ```
 *
 * ## Attribute syntax
 *
 * ```
 * on-<eventType>="actionId[:payload][; modifier1,modifier2,…]"
 * ```
 *
 * ```html
 * <button on-click="ui_open_drawer:main">Open</button>
 * <input on-input="ui_search_query:$value" />
 * <form on-submit="ui_submit_form:$formdata; prevent,validate" novalidate>…</form>
 * ```
 *
 * ## Context scoping
 *
 * Wrap elements in an `[action-context]` container to scope their actions.
 * The delegation handler resolves the nearest ancestor and attaches its value
 * to `action.context`:
 *
 * ```html
 * <section action-context="product-list">
 *   <button on-click="ui_add_to_cart:42">Add</button>
 * </section>
 * ```
 *
 * ```ts
 * onAction('ui_add_to_cart', (action) => {
 *   console.log(action.context); // 'product-list'
 *   console.log(action.payload); // '42'
 * });
 * ```
 *
 * ## Programmatic dispatch
 *
 * Code-originated actions should not use the `ui_` prefix — that prefix is
 * reserved for DOM-originated actions dispatched via HTML attributes.
 *
 * ```ts
 * import {dispatchAction} from '@alwatr/action';
 *
 * dispatchAction({type: 'navigate', payload: '/dashboard'});
 * ```
 *
 * ## Registering typed actions
 *
 * Extend `ActionRecord` via declaration merging to get full type safety:
 *
 * ```ts
 * // src/action-record.ts
 * declare module '@alwatr/action' {
 *   interface ActionRecord {
 *     // UI-originated actions — must start with 'ui_'
 *     'ui_open_drawer': string;
 *     'ui_add_to_cart': {productId: number; qty: number};
 *     'ui_logout': void;
 *
 *     // Code-originated actions — no 'ui_' prefix
 *     'upload_complete': string;
 *     'auth_expired': void;
 *   }
 * }
 * ```
 *
 * ## Public API
 *
 * - `Action`          — the AFSA object interface (`type`, `payload`, `context`, `meta`)
 * - `ActionRecord`    — extend this interface to register typed actions
 * - `setupActionDelegation` / `teardownActionDelegation` — global delegation lifecycle
 * - `DEFAULT_DELEGATED_EVENTS` — default event types covered by delegation
 * - `onAction` / `dispatchAction` — subscribe to and dispatch named actions
 * - `registerModifier` / `registerPayloadResolver` — extend the attribute syntax
 *
 * ## Page identity
 *
 * For page-ready signals in SSG/SSR apps, use `@alwatr/page-ready` instead.
 */
export * from './delegate.js';
export * from './method.js';
export type * from './type.js';
