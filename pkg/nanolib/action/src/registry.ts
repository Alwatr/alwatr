import type {Action} from './action.js';

// ─── Type Definitions ────────────────────────────────────────────────────────

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
 *   return (element as HTMLElement).dataset.id ?? null;
 * };
 * ```
 */
export type PayloadResolver = (event: Event, element: HTMLElement) => unknown;

// ─── Registries ──────────────────────────────────────────────────────────────

/**
 * Registry of all named modifier handlers.
 *
 * Keys are modifier names used in the `on-<eventType>` attribute syntax
 * (e.g. `on-click="action-id; prevent"`). Values are `ModifierHandler` functions.
 * Populated at module load with built-in modifiers; extended at runtime via
 * `registerModifier`.
 *
 * @internal
 */
export const modifierRegistry = new Map<string, ModifierHandler>();

/**
 * Registry of all named payload resolvers.
 *
 * Keys are resolver tokens used in the `on-<eventType>` attribute syntax
 * (e.g. `on-input="search_query:$value"`). Values are `PayloadResolver` functions.
 * Populated at module load with built-in resolvers; extended at runtime via
 * `registerPayloadResolver`.
 *
 * @internal
 */
export const payloadRegistry = new Map<string, PayloadResolver>();

// ─── Built-in Modifiers ───────────────────────────────────────────────────────

/**
 * `prevent` — calls `event.preventDefault()` before dispatching.
 *
 * Use it to suppress the browser's default behaviour (e.g. form submission,
 * link navigation, context menu).
 *
 * @example `<form on-submit="submit-form; prevent">`
 */
modifierRegistry.set('prevent', (event) => {
  event.preventDefault();
  return true;
});

/**
 * `validate` — cancels the dispatch if the nearest `<form>` fails validation.
 *
 * Looks for a `<form>` ancestor (or the element itself if it is a form) and
 * calls `checkValidity()`. If the form is invalid the action is not dispatched,
 * allowing native constraint-validation UI to surface errors. If no form is
 * found the dispatch is also cancelled.
 *
 * Pair with `prevent` on `submit` events to avoid page reloads:
 *
 * @example `<form on-submit="submit_form:$formdata; prevent,validate" novalidate>`
 */
modifierRegistry.set('validate', (_event, element) => {
  const form = element instanceof HTMLFormElement ? element : element.closest('form');
  if (!form) return false;
  return form.checkValidity();
});

// ─── Built-in Payload Resolvers ───────────────────────────────────────────────

/**
 * `$value` — resolves to the element's `.value` property at dispatch time.
 *
 * Works with any element that exposes a `value` property: `<input>`,
 * `<textarea>`, `<select>`. Returns `null` for elements without `.value`.
 *
 * @example `<input on-input="search_query:$value" />`
 */
payloadRegistry.set('$value', (_event, element) => {
  return 'value' in element ? (element as {value: unknown}).value : null;
});

/**
 * `$formdata` — resolves to a plain object of all fields in the nearest `<form>`.
 *
 * Collects entries via `FormData` and converts them to a `Record<string, FormDataEntryValue>`.
 * Looks for a `<form>` ancestor (or the element itself). Returns `null` when no
 * form is found.
 *
 * @example `<form on-submit="submit_form:$formdata; prevent,validate">`
 * ```ts
 * onAction('submit_form', (action) => {
 *   console.log(action.payload); // {username: 'ali', password: '…'}
 * });
 * ```
 */
payloadRegistry.set('$formdata', (_event, element) => {
  const form = element instanceof HTMLFormElement ? element : element.closest('form');
  return form ? Object.fromEntries(new FormData(form)) : null;
});

/**
 * `$checked` — resolves to the `.checked` boolean property of a checkbox or radio input.
 *
 * Works with `<input type="checkbox">` and `<input type="radio">`.
 * Returns `null` for elements that do not have a `checked` property.
 *
 * @example `<input type="checkbox" on-change="toggle_feature:$checked" />`
 * ```ts
 * onAction('toggle_feature', (action) => {
 *   console.log(action.payload); // true or false
 *   featureSignal.set(action.payload);
 * });
 * ```
 */
payloadRegistry.set('$checked', (_event, element) => {
  return 'checked' in element ? (element as HTMLInputElement).checked : null;
});
