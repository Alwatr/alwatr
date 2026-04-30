import type {ModifierHandler, PayloadResolver} from './type.js';

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
 * (e.g. `on-input="ui:search_query:$value"`). Values are `PayloadResolver` functions.
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
 * @example `<form on-submit="ui:submit-form; prevent">`
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
 * @example `<form on-submit="ui:submit_form:$formdata; prevent,validate" novalidate>`
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
 * @example `<input on-input="ui:search_query:$value" />`
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
 * @example `<form on-submit="ui:submit_form:$formdata; prevent,validate">`
 * ```ts
 * onAction('ui:submit_form', (action) => {
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
 * @example `<input type="checkbox" on-change="ui:toggle_feature:$checked" />`
 * ```ts
 * onAction('ui:toggle_feature', (action) => {
 *   console.log(action.payload); // true or false
 *   featureSignal.set(action.payload);
 * });
 * ```
 */
payloadRegistry.set('$checked', (_event, element) => {
  return 'checked' in element ? (element as HTMLInputElement).checked : null;
});
