import {lazyDirective} from '@alwatr/directive';

import {BindTextDirective} from './directive_bind_text.js';

/**
 * A declarative DOM directive for binding input, select, and textarea element values to a view model.
 *
 * Syntax: `bind-value="namespace.propertyName"`
 *
 * Extends `BindTextDirective`. The crucial feature of `BindValueDirective` is its DOM write guard:
 * it compares the current element value with the incoming value and only writes to the DOM
 * when they differ. This prevents the browser from resetting the text cursor/selection position
 * when typing in an active text field.
 *
 * @example
 * ```html
 * <input
 *   type="text"
 *   bind-value="user.firstName"
 *   on-input="ui_edit_name:$value"
 * />
 * ```
 */
export class BindValueDirective extends BindTextDirective {
  /**
   * Updates the element's `value` attribute with the current bound value.
   *
   * Includes a cursor preservation guard: it only updates `inputEl.value`
   * if the new value is actually different from the current input value,
   * preventing unnecessary DOM writes that would reset the cursor position.
   */
  protected override update_(): void {
    DEV_MODE && this.logger_.logMethod?.('update_');
    const value = this.bindingValue_;
    const nextValue = value == null ? '' : String(value);
    const inputEl = this.element_ as HTMLInputElement;

    // Guard against redundant DOM writes that kill cursor position!
    if (inputEl.value !== nextValue) {
      inputEl.value = nextValue;
    }
  }
}

/**
 * Helper to register `BindValueDirective` lazily under the `bind-value` attribute.
 */
export const registerBindValueDirective = lazyDirective('bind-value', BindValueDirective);
