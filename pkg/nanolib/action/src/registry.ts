import type {AlwatrActionDirective} from './directive.js';

// ─── Type Definitions ────────────────────────────────────────────────────────

/**
 * A modifier handler attached to an `on-action` directive.
 *
 * Called with the directive instance as `this` and the triggering DOM `event`.
 * Return `true` to allow the action to proceed, or `false` to cancel it.
 * Returning `false` is the only way a modifier can veto a dispatch.
 *
 * @example
 * ```ts
 * // A modifier that only allows the action when the element is not disabled
 * const notDisabledHandler: ModifierHandler = function () {
 *   return !(this.element_ as HTMLButtonElement).disabled;
 * };
 * ```
 */
export type ModifierHandler = (this: AlwatrActionDirective, event: Event) => boolean;

/**
 * A payload resolver attached to an `on-action` directive.
 *
 * Called with the directive instance as `this` and the triggering DOM `event`
 * at dispatch time. The return value becomes the `actionPayload` of the
 * dispatched action. Use this to compute dynamic payloads from the DOM state.
 *
 * @example
 * ```ts
 * // A resolver that returns the element's dataset id
 * const dataIdResolver: PayloadResolver = function () {
 *   return (this.element_ as HTMLElement).dataset.id ?? null;
 * };
 * ```
 */
export type PayloadResolver = (this: AlwatrActionDirective, event: Event) => unknown;

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
 * `stop` — calls `event.stopPropagation()` before dispatching.
 *
 * Prevents the event from bubbling further up the DOM tree. Useful when a
 * child element should handle a click without triggering a parent's listener.
 *
 * @example `<button on-action="click.stop->select-item:42">`
 */
modifierRegistry.set('stop', (event) => {
  event.stopPropagation();
  return true;
});

/**
 * `validate` — cancels the dispatch if the nearest `<form>` fails validation.
 *
 * Looks for a `<form>` ancestor (or the element itself if it is a form) and
 * calls `checkValidity()`. If the form is invalid the action is not dispatched,
 * allowing native constraint-validation UI to surface errors. If no form is
 * found the dispatch is also cancelled and an accident is logged.
 *
 * Pair with `.prevent` on `submit` events to avoid page reloads:
 *
 * @example `<form on-action="submit.prevent.validate->submit-form" novalidate>`
 */
modifierRegistry.set('validate', function () {
  const form = this.element_ instanceof HTMLFormElement ? this.element_ : this.element_.closest('form');
  if (!form) {
    this.logger_.accident('validate_modifier', 'no_form_found', {element: this.element_});
    return false;
  }
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
payloadRegistry.set('$value', function () {
  return 'value' in this.element_ ? (this.element_ as {value: unknown}).value : null;
});

/**
 * `$formdata` — resolves to a plain object of all fields in the nearest `<form>`.
 *
 * Collects entries via `FormData` and converts them to a `Record<string, FormDataEntryValue>`.
 * Looks for a `<form>` ancestor (or the element itself). Returns `null` when no
 * form is found.
 *
 * @example `<form on-action="submit.prevent.validate->submit-form">`
 * ```ts
 * onAction<Record<string, FormDataEntryValue>>('submit-form', (data) => {
 *   console.log(data); // {username: 'ali', password: '…'}
 * });
 * ```
 */
payloadRegistry.set('$formdata', function () {
  const form = this.element_ instanceof HTMLFormElement ? this.element_ : this.element_.closest('form');
  return form ? Object.fromEntries(new FormData(form).entries()) : null;
});
