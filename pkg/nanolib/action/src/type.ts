import type {DictionaryOpt} from '@alwatr/type-helper';

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
 *     // UI-originated actions (dispatched from HTML on-<event> attributes) — must start with 'ui_'
 *     'ui_open_drawer': string;
 *     'ui_add_to_cart': {productId: number; qty: number};
 *     'ui_logout': void;
 *
 *     // Code-originated actions (dispatched programmatically from services/controllers)
 *     'upload_complete': string;
 *     'auth_expired': void;
 *   }
 * }
 * ```
 */
export interface ActionRecord {}

/**
 * Builds the parameter type for `dispatchAction`.
 *
 * When `ActionRecord[K]` is `void`, the `payload` field becomes optional so
 * callers can omit it entirely. For all other payload types the field remains
 * required, preserving full type safety.
 *
 * @example — void action (payload omitted)
 * ```ts
 * dispatchAction({type: 'auth_expired'});
 * ```
 *
 * @example — typed action (payload required)
 * ```ts
 * dispatchAction({type: 'upload_complete', payload: fileId});
 * ```
 */
export type DispatchParam<K extends keyof ActionRecord> =
  ActionRecord[K] extends void ? Omit<Action<K>, 'payload'> & {payload?: void} : Action<K>;

/**
 * Alwatr Flux Standard Action (AFSA).
 *
 * The single, canonical object passed to every `dispatchAction` call and
 * received by every `onAction` handler. Keeping all action data in one
 * structure makes the bus extensible without breaking existing call sites.
 *
 * @template K - A key of `ActionRecord`; constrains `type` and `payload` together.
 *
 * @example — dispatching (code-originated action — no 'ui_' prefix)
 * ```ts
 * dispatchAction({type: 'upload_complete', payload: fileId});
 * ```
 *
 * @example — subscribing to a UI-originated action
 * ```ts
 * onAction('ui_add_to_cart', (action) => {
 *   console.log(action.type);    // 'ui_add_to_cart'
 *   console.log(action.payload); // {productId: 42, qty: 1}
 *   console.log(action.context); // e.g. 'product-list' (from DOM) or undefined
 * });
 * ```
 */
export interface Action<K extends keyof ActionRecord = keyof ActionRecord> {
  /**
   * Unique action identifier — must be a key of `ActionRecord`.
   *
   * @example 'ui_add_to_cart', 'ui_open_drawer', 'upload_complete'
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

/**
 * A modifier handler used in `on-<eventType>` attribute syntax.
 *
 * Receives the triggering DOM `event`, the `element` that owns the
 * `on-<eventType>` attribute, and the **mutable** `action` object being built.
 * The handler may mutate `action.meta` to attach cross-cutting data (e.g. a
 * trace ID, a timestamp, or an A/B flag) before the action reaches subscribers.
 *
 * Return `true` (or any truthy value) to allow the action to proceed, or
 * `false` to cancel the dispatch entirely.
 *
 * Using explicit parameters instead of `this` binding makes handlers
 * compatible with arrow functions and easier to test in isolation.
 *
 * @example — a modifier that stamps a timestamp into meta
 * ```ts
 * const timestampHandler: ModifierHandler = (_event, _element, action) => {
 *   action.meta ??= {};
 *   action.meta['timestamp'] = Date.now();
 *   return true;
 * };
 * ```
 *
 * @example — a modifier that cancels dispatch when the element is disabled
 * ```ts
 * const notDisabledHandler: ModifierHandler = (_event, element) => {
 *   return !(element as HTMLButtonElement).disabled;
 * };
 * ```
 */
export type ModifierHandler = (event: Event, element: HTMLElement, action: Action) => boolean;

/**
 * A payload resolver used in `on-<eventType>` attribute syntax.
 *
 * Receives the triggering DOM `event` and the `element` that owns the
 * `on-<eventType>` attribute. The return value becomes the `payload` field of
 * the `Action` object passed to `onAction` subscribers.
 *
 * Using explicit parameters instead of `this` binding makes resolvers
 * compatible with arrow functions and easier to test in isolation.
 *
 * @example — a resolver that returns the element's dataset id
 * ```ts
 * const dataIdResolver: PayloadResolver = (_event, element) => {
 *   return element.dataset.id ?? null;
 * };
 * ```
 */
export type PayloadResolver = (event: Event, element: HTMLElement) => unknown;

/**
 * Parsed representation of an action attribute descriptor.
 * @internal
 */
export interface ActionDescriptor {
  readonly modifiers: ReadonlySet<string>;
  readonly actionId: string;
  readonly payload: string | undefined;
}

/**
 * Helper type representing an action configuration that conforms to `ActionRecord` types.
 */
export type ActionConfig<K extends keyof ActionRecord = keyof ActionRecord> = {
  readonly [P in K]: ActionRecord[P] extends void | undefined
    ? {readonly type: P; readonly payload?: undefined}
    : {readonly type: P; readonly payload: ActionRecord[P]};
}[K];

