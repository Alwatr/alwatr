import {attribute, Directive, lazyDirective} from '@alwatr/directive';

import {service_binding, type BindingValue} from './main.js';

/**
 * A declarative DOM directive that binds DOM element attributes to view model properties.
 *
 * Syntax: `bind_attrib="attributeName=namespace.propertyName; anotherAttribute=namespace.anotherProperty"`
 *
 * Supports binding multiple attributes on the same element separated by semicolons (`;`).
 *
 * Behavior:
 * - `boolean` value: Toggles the presence of the attribute (idiomatic for boolean attributes like `disabled`, `hidden`, `readonly`, `checked`).
 * - `null` / `undefined` value: Removes the attribute from the element.
 * - Any other type: Coerced via `String(value)` and set as the attribute's value.
 *
 * Includes a redundant write guard (via `lastValues_`) that skips calls to the DOM if the property value hasn't changed.
 * Supports deferred viewport initialization if the `lazy_bind` attribute is present on the element.
 *
 * @example
 * ```html
 * <!-- Binds presence of 'disabled' to cart emptiness and 'aria-busy' to loading state -->
 * <button bind_attrib="disabled=user.cartIsEmpty; aria-busy=ui.loading">Checkout</button>
 *
 * <!-- Binds 'src' and 'alt' attributes -->
 * <img bind_attrib="src=user.avatarUrl; alt=user.fullName" />
 *
 * <!-- Lazy attribute binding -->
 * <iframe bind_attrib="src=video.embedUrl" lazy_bind></iframe>
 * ```
 */
export class BindAttribDirective extends Directive {
  /**
   * Attribute flag used to defer binding initialization until the element enters the viewport.
   * If `lazy_bind` attribute exists, this is non-null.
   */
  @attribute('lazy_bind')
  protected accessor lazyBinding_!: null | string;

  /**
   * Initializes the directive.
   * Checks if lazy binding is enabled via `lazy_bind`.
   * If yes, delegates the initialization to `lazyInit_`; otherwise, initializes immediately.
   */
  protected override init_(): void {
    DEV_MODE && this.logger_.logMethod?.('init_');
    if (this.lazyBinding_ === null) {
      this.bindingInit_();
    } else {
      this.lazyInit_ = this.bindingInit_;
    }
  }

  /**
   * Cache of the last applied values to guard against redundant DOM modifications.
   */
  protected lastValues_: Record<string, BindingValue> = {};

  /**
   * Main binding initialization logic. Parses each attribute-binding pair,
   * retrieves the corresponding ViewModel signals, subscribes to updates,
   * and applies the initial attribute state.
   */
  protected bindingInit_(): void {
    DEV_MODE && this.logger_.logMethod?.('bindingInit_');
    for (const rawPair of this.attributeValue.split(';')) {
      const pair = rawPair.trim();
      if (pair === '') continue;

      const [attributeName, viewKey_ = ''] = pair.split('=');
      const [namespace, prop] = viewKey_.split('.');
      if (!attributeName || !namespace || !prop) {
        DEV_MODE && this.logger_.accident('bindingInit_', 'invalid_binding_pair', {pair});
        continue;
      }

      const viewModel = service_binding.getViewModel(namespace);
      if (!viewModel) {
        DEV_MODE && this.logger_.accident('bindingInit_', 'missing_view_model', {namespace});
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

  /**
   * Applies the bound value to a specific DOM attribute on the element.
   *
   * @param attributeName The name of the target attribute (e.g., `'src'`, `'disabled'`).
   * @param value The value to apply.
   */
  protected applyAttribute_(attributeName: string, value: BindingValue): void {
    DEV_MODE && this.logger_.logMethodArgs?.('applyAttribute_', {attributeName, value});
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

/**
 * Helper to register `BindAttribDirective` lazily under the `bind_attrib` attribute.
 */
export const registerBindAttribDirective = lazyDirective('bind_attrib', BindAttribDirective);
