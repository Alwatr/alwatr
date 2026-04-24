// ─── Type Definitions ────────────────────────────────────────────────────────

/**
 * A modifier handler used in `on-action` attribute syntax.
 *
 * Called with an `ActionContext` as `this` and the triggering DOM `event`.
 * Return `true` (or any truthy value) to allow the action to proceed,
 * or `false` to cancel the dispatch.
 *
 * @example
 * ```ts
 * // A modifier that only allows the action when the element is not disabled
 * const notDisabledHandler: ModifierHandler = function () {
 *   return !(this.element as HTMLButtonElement).disabled;
 * };
 * ```
 */
export type ModifierHandler = (event: Event, element: HTMLElement) => boolean;

/**
 * A payload resolver used in `on-action` attribute syntax.
 *
 * Called with an `ActionContext` as `this` and the triggering DOM `event`
 * at dispatch time. The return value becomes the `actionPayload` passed to
 * `onAction` subscribers. Use this to compute dynamic payloads from DOM state.
 *
 * @example
 * ```ts
 * // A resolver that returns the element's dataset id
 * const dataIdResolver: PayloadResolver = function () {
 *   return (this.element as HTMLElement).dataset.id ?? null;
 * };
 * ```
 */
export type PayloadResolver = (event: Event, element: HTMLElement) => unknown;

// ─── Registries ──────────────────────────────────────────────────────────────

/**
 * Registry of all named modifier handlers.
 *
 * Keys are modifier names used in the `on-action` attribute syntax
 * (e.g. `click.prevent->action-id`). Values are `ModifierHandler` functions.
 * Populated at module load with built-in modifiers; extended at runtime via
 * `registerModifier`.
 *
 * @internal
 */
export const modifierRegistry = new Map<string, ModifierHandler>();

/**
 * Registry of all named payload resolvers.
 *
 * Keys are resolver tokens used in the `on-action` attribute syntax
 * (e.g. `click->action-id:$value`). Values are `PayloadResolver` functions.
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
 * @example `<form on-action="submit.prevent->submit-form">`
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
 * Pair with `.prevent` on `submit` events to avoid page reloads:
 *
 * @example `<form on-action="submit.prevent.validate->submit-form:$formdata" novalidate>`
 */
modifierRegistry.set('validate', function (_, element) {
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
 * @example `<input on-action="input->search-query:$value" />`
 */
payloadRegistry.set('$value', function (_, element) {
  return 'value' in element ? (element as {value: unknown}).value : null;
});

/**
 * `$formdata` — resolves to a plain object of all fields in the nearest `<form>`.
 *
 * Collects entries via `FormData` and converts them to a `Record<string, FormDataEntryValue>`.
 * Looks for a `<form>` ancestor (or the element itself). Returns `null` when no
 * form is found.
 *
 * @example `<form on-action="submit.prevent.validate->submit-form:$formdata">`
 * ```ts
 * onAction<Record<string, FormDataEntryValue>>('submit-form', (data) => {
 *   console.log(data); // {username: 'ali', password: '…'}
 * });
 * ```
 */
payloadRegistry.set('$formdata', function (_, element) {
  const form = element instanceof HTMLFormElement ? element : element.closest('form');
  return form ? Object.fromEntries(new FormData(form).entries()) : null;
});
