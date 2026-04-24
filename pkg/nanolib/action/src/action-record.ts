/**
 * @file action-record.ts
 *
 * Global action type registry via TypeScript declaration merging.
 *
 * ## How it works
 *
 * `ActionRecord` is an open interface — any package in the monorepo (or any
 * consumer application) can extend it with their own action names and payload
 * types using declaration merging, without modifying this file:
 *
 * ```ts
 * // In your package: src/action-record.ts
 * declare module '@alwatr/action' {
 *   interface ActionRecord {
 *     'open-drawer': string;
 *     'add-to-cart': {productId: number; qty: number};
 *     'logout': void;
 *   }
 * }
 * ```
 *
 * Once declared, `onAction` and `dispatchAction` become fully type-safe for
 * those action names — the compiler enforces the correct payload type at every
 * call site and provides autocomplete for action identifiers.
 *
 * Only actions declared in `ActionRecord` are accepted. Passing an unknown
 * action name is a **compile error** — there is no string fallback.
 */

/**
 * Global registry mapping action identifiers to their payload types.
 *
 * Extend this interface via declaration merging to register your application's
 * actions and gain full type safety in `onAction` and `dispatchAction`.
 *
 * Built-in system actions are declared here. Application-level actions should
 * be declared in a dedicated `action-record.ts` file within each feature package.
 *
 * @example — registering actions in a feature package
 * ```ts
 * // pkg/my-feature/src/action-record.ts
 * declare module '@alwatr/action' {
 *   interface ActionRecord {
 *     'open-drawer': string;
 *     'add-to-cart': {productId: number; qty: number};
 *     'logout': void;
 *   }
 * }
 * ```
 */
export interface ActionRecord {
  /**
   * Dispatched by `dispatchPageId()` when the page identity is read from the
   * `page-id` HTML attribute. Payload is the page identifier string.
   *
   * @example
   * ```html
   * <body page-id="home">…</body>
   * ```
   * ```ts
   * onAction('page-ready', (pageId) => router.setPage(pageId));
   * ```
   */
  'page-ready': string;
}
