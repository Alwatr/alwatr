import {attribute, Directive, lazyDirective, state} from '@alwatr/directive';
import {service_binding} from './service_binding.js';
import type {BindingValue} from './type.js';

/** `<h2 bind-text="user.fullName">loading..</h2>` — binds textContent to a store key. */
export class BindTextDirective extends Directive {
  @attribute('lazy-bind')
  protected accessor lazyBinding_!: null | string;

  protected override init_(): void {
    if (this.lazyBinding_ === null) {
      this.bindingInit_();
    } else {
      this.lazyInit_ = this.bindingInit_;
    }
  }

  @state()
  protected accessor bindingValue_: BindingValue;

  protected bindingInit_(): void {
    const [namespace, prop] = this.attributeValue.trim().split('.');
    if (!namespace || !prop) {
      this.logger_.accident?.('bindingInit_', 'invalid_binding', {namespace, prop});
      return;
    }
    const viewModel = service_binding.getViewModel(namespace);
    if (!viewModel) {
      this.logger_.accident?.('bindingInit_', 'missing_view_model', {namespace});
      return;
    }

    this.subscribe_(viewModel, (state) => {
      this.bindingValue_ = state[prop];
    });
  }

  protected override update_(): void {
    const value = this.bindingValue_;
    this.element_.textContent = value == null ? '' : String(value);
  }
}

export const registerBindTextDirective = lazyDirective('bind-text', BindTextDirective);
