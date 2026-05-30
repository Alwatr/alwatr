import {attribute, Directive, lazyDirective} from '@alwatr/directive';

import {service_binding, type BindingValue} from './main.js';

/**
 * `<button bind-attrib="disabled=user.cartIsEmpty; aria-busy=ui.loading">`
 * `<img bind-attrib="src=user.avatarUrl" />`
 *
 * Syntax: "attrName=binding.key" pairs, separated by ';'.
 * - boolean value → attribute PRESENCE toggle (idiomatic for disabled/hidden/flags).
 * - null/undefined → attribute removed.
 * - everything else → attribute set to String(value).
 */
export class BindAttribDirective extends Directive {
  @attribute('lazy-bind')
  protected accessor lazyBinding_!: null | string;

  protected override init_(): void {
    if (this.lazyBinding_ === null) {
      this.bindingInit_();
    } else {
      this.lazyInit_ = this.bindingInit_;
    }
  }

  protected lastValues_: Record<string, BindingValue> = {};

  protected bindingInit_(): void {
    for (const rawPair of this.attributeValue.split(';')) {
      const pair = rawPair.trim();
      if (pair === '') continue;

      const [attributeName, viewKey_ = ''] = pair.split('=');
      const [namespace, prop] = viewKey_.split('.');
      if (!attributeName || !namespace || !prop) {
        this.logger_.accident?.('bindingInit_', 'invalid_binding_pair', {pair});
        continue;
      }

      const viewModel = service_binding.getViewModel(namespace);
      if (!viewModel) {
        this.logger_.accident?.('bindingInit_', 'missing_view_model', {namespace});
        continue;
      }

      this.subscribe_(viewModel, (state) => {
        const value = state[prop];
        if (Object.is(this.lastValues_[attributeName], value)) return; // guard against redundant updates
        this.lastValues_[attributeName] = value;
        this.applyAttribute_(attributeName, value);
      });
    }
  }

  protected applyAttribute_(attributeName: string, value: BindingValue): void {
    if (typeof value === 'boolean') {
      if (value) this.element_.setAttribute(attributeName, '');
      else this.element_.removeAttribute(attributeName);
      return;
    }
    if (value == null) {
      this.element_.removeAttribute(attributeName);
      return;
    }
    this.element_.setAttribute(attributeName, String(value));
  }
}

export const registerBindAttribDirective = lazyDirective('bind-attrib', BindAttribDirective);
