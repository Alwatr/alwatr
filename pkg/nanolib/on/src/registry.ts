import type {AlwatrActionDirective} from './directive';

/**
 * Type definition for modifier handlers and payload resolvers, along with their registries.
 */
export type ModifierHandler = (this: AlwatrActionDirective, event: Event) => boolean;

/**
 * Type definition for payload resolvers, which can compute dynamic payloads based on the event and directive context.
 */
export type PayloadResolver = (this: AlwatrActionDirective, event: Event) => unknown;

/**
 * Registries for modifiers and payload resolvers. These maps store the registered handlers and resolvers
 */
export const modifierRegistry = new Map<string, ModifierHandler>();

/**
 * The payload registry maps string keys (used in the directive syntax) to resolver functions that compute the payload at dispatch time.
 */
export const payloadRegistry = new Map<string, PayloadResolver>();

/**
 * Register built-in modifiers and payload resolvers. These provide common functionality out of the box, such as preventing default behavior or resolving an input's value.
 */
modifierRegistry.set('prevent', (event) => {
  event.preventDefault();
  return true;
});

/**
 * Built-in 'stop' modifier that calls `event.stopPropagation()` to prevent the event from bubbling up the DOM tree.
 */
modifierRegistry.set('stop', (event) => {
  event.stopPropagation();
  return true;
});

/**
 * Built-in 'validate' modifier that checks the validity of the closest form element. If the directive is on a form element itself, it checks that element; otherwise, it looks for the nearest ancestor form. If no form is found, it logs an accident and cancels the dispatch.
 */
modifierRegistry.set('validate', function () {
  const form = this.element_ instanceof HTMLFormElement ? this.element_ : this.element_.closest('form');
  if (!form) {
    this.logger_.accident('validate_modifier', 'no_form_found', {element: this.element_});
    return false;
  }
  return form.checkValidity();
});

/**
 * Built-in '$value' payload resolver that returns the current value of the element if it has a 'value' property (e.g. input, textarea, select), or `null` otherwise.
 */
payloadRegistry.set('$value', function () {
  return 'value' in this.element_ ? (this.element_ as {value: unknown}).value : null;
});

/**
 * Built-in '$formdata' payload resolver that returns an object representing the form data of the closest form element. If the directive is on a form element itself, it uses that; otherwise, it looks for the nearest ancestor form. If no form is found, it returns `null`. The payload is an object where each key is a form field name and the value is the corresponding field value.
 */
payloadRegistry.set('$formdata', function () {
  const form = this.element_ instanceof HTMLFormElement ? this.element_ : this.element_.closest('form');
  return form ? Object.fromEntries(new FormData(form).entries()) : null;
});
