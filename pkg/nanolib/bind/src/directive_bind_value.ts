import {lazyDirective} from '@alwatr/directive';
import {BindTextDirective} from './directive_bind_text.js';

/** `<input bind-value="user.firstName" on-input="ui_edit_name:$value" />` */
export class BindValueDirective extends BindTextDirective {
  protected override update_(): void {
    const value = this.bindingValue_;
    const nextValue = value == null ? '' : String(value);
    const inputEl = this.element_ as HTMLInputElement;

    // Guard against redundant DOM writes that kill cursor position!
    if (inputEl.value !== nextValue) {
      inputEl.value = nextValue;
    }
  }
}

export const registerBindValueDirective = lazyDirective('bind-value', BindValueDirective);
