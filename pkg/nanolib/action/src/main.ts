/**
 * @alwatr/action — Declarative DOM action-dispatch for Unidirectional Data Flow.
 *
 * ## Two ways to activate `on-action` attributes
 *
 * ### 1. Global delegation (recommended)
 *
 * One listener on `document.body` handles every `on-action` element — past,
 * present, and future. O(1) boot time regardless of element count.
 *
 * ```ts
 * import {setupActionDelegation, onAction} from '@alwatr/action';
 *
 * setupActionDelegation();
 * onAction('open-drawer', (panel) => openDrawer(panel));
 * ```
 *
 * ### 2. Programmatic dispatch
 *
 * Dispatch actions from code without any HTML attribute:
 *
 * ```ts
 * import {dispatchAction, onAction} from '@alwatr/action';
 *
 * dispatchAction('navigate', '/dashboard');
 * onAction('navigate', (path) => router.push(path));
 * ```
 *
 * ## Registering typed actions
 *
 * Extend `ActionMap` via declaration merging to get full type safety:
 *
 * ```ts
 * declare module '@alwatr/action' {
 *   interface ActionRecord {
 *     'open-drawer': string;
 *     'add-to-cart': {productId: number; qty: number};
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
 * - `dispatchPageId` — read `page-id` attribute and dispatch `'page-ready'`
 * - `registerModifier` / `registerPayloadResolver` — extend the attribute syntax
 */
export * from './method.js';
export * from './delegate.js';
export * from './page-ready.js';
export * from './action-record.js';
