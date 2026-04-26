/**
 * @alwatr/action — Declarative DOM action-dispatch for Unidirectional Data Flow.
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
 * onAction('open_drawer', (panel) => openDrawer(panel));
 * ```
 *
 * ## Attribute syntax
 *
 * ```
 * on-<eventType>="actionId[:payload][; modifier1,modifier2,…]"
 * ```
 *
 * ```html
 * <button on-click="open_drawer:main">Open</button>
 * <input on-input="search_query:$value" />
 * <form on-submit="submit_form:$formdata; prevent,validate" novalidate>…</form>
 * ```
 *
 * ## Programmatic dispatch
 *
 * ```ts
 * import {dispatchAction} from '@alwatr/action';
 *
 * dispatchAction('navigate', '/dashboard');
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
 *     'open_drawer': string;
 *     'add_to_cart': {productId: number; qty: number};
 *     'logout': void;
 *   }
 * }
 * ```
 *
 * ## Public API
 *
 * - `ActionRecord` — extend this interface to register typed actions
 * - `setupActionDelegation` / `teardownActionDelegation` — global delegation lifecycle
 * - `DEFAULT_DELEGATED_EVENTS` — default event types covered by delegation
 * - `onAction` / `dispatchAction` — subscribe to and dispatch named actions
 * - `registerModifier` / `registerPayloadResolver` — extend the attribute syntax
 *
 * ## Page identity
 *
 * For page-ready signals in SSG/SSR apps, use `@alwatr/page-ready` instead.
 */
export type {ActionRecord} from './action-record.js';
export * from './method.js';
export * from './delegate.js';
