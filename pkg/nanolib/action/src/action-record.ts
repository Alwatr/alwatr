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
 *     'open_drawer': string;
 *     'add_to_cart': {productId: number; qty: number};
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
 * This interface is intentionally empty in the base package — all actions are
 * application-specific and should be declared in a dedicated `action-record.ts`
 * file within each feature package.
 *
 * @example — registering actions in a feature package
 * ```ts
 * // pkg/my-feature/src/action-record.ts
 * declare module '@alwatr/action' {
 *   interface ActionRecord {
 *     'open_drawer': string;
 *     'add_to_cart': {productId: number; qty: number};
 *     'logout': void;
 *   }
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ActionRecord {}
