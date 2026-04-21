import type {AlwatrActionDirective} from './directive';

export type ModifierHandler = (this: AlwatrActionDirective, event: Event) => boolean;
export type PayloadResolver = (this: AlwatrActionDirective, event: Event) => unknown;

export const modifierRegistry = new Map<string, ModifierHandler>();
export const payloadRegistry = new Map<string, PayloadResolver>();

modifierRegistry.set('prevent', (event) => {
  event.preventDefault();
  return true;
});

modifierRegistry.set('stop', (event) => {
  event.stopPropagation();
  return true;
});

modifierRegistry.set('validate', function () {
  const form = this.element_ instanceof HTMLFormElement ? this.element_ : this.element_.closest('form');
  if (!form) {
    this.logger_.accident('validate_modifier', 'no_form_found', {element: this.element_});
    return false;
  }
  return form.checkValidity();
});

payloadRegistry.set('$value', function () {
  return 'value' in this.element_ ? (this.element_ as {value: unknown}).value : null;
});

payloadRegistry.set('$formdata', function () {
  const form = this.element_ instanceof HTMLFormElement ? this.element_ : this.element_.closest('form');
  return form ? Object.fromEntries(new FormData(form).entries()) : null;
});
