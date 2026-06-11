import {attribute, Directive, lazyDirective, state} from '@alwatr/directive';

import {service_binding} from './service_binding.js';
import type {BindingValue} from './type.js';

/**
 * A declarative DOM directive that binds an element's `textContent` to a view model property.
 *
 * Syntax: `bind_text="namespace.propertyName"`
 *
 * It subscribes to the projected computed signal of the namespace and surgically updates
 * the element's `textContent` whenever the property changes.
 *
 * Supports deferred viewport initialization if the `lazy_bind` attribute is present on the element.
 *
 * @example
 * ```html
 * <!-- Immediate binding (default) -->
 * <h2 bind_text="user.fullName">Loading...</h2>
 *
 * <!-- Lazy binding (evaluated only when element enters the viewport) -->
 * <p bind_text="article.summary" lazy_bind>Loading summary...</p>
 * ```
 */
export class BindTextDirective extends Directive {
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
   * Reactive state containing the current bound value.
   * Triggers an element update on assignment.
   */
  @state()
  protected accessor bindingValue_: BindingValue;

  /**
   * Main binding initialization logic. Parses the namespace and property key,
   * retrieves the ViewModel signal, and subscribes to state changes.
   */
  protected bindingInit_(): void {
    DEV_MODE && this.logger_.logMethod?.('bindingInit_');
    const [namespace, prop] = this.attributeValue.trim().split('.');
    if (!namespace || !prop) {
      DEV_MODE && this.logger_.accident('bindingInit_', 'invalid_binding', {namespace, prop});
      return;
    }
    const viewModel = service_binding.getViewModel(namespace);
    if (!viewModel) {
      DEV_MODE && this.logger_.accident('bindingInit_', 'missing_view_model', {namespace});
      return;
    }

    this.subscribe_(viewModel, (state) => {
      this.bindingValue_ = state[prop];
    });
  }

  /**
   * Renders the current bound value to the element's `textContent`.
   * Nullish values render as an empty string.
   */
  protected override update_(): void {
    DEV_MODE && this.logger_.logMethod?.('update_');
    const value = this.bindingValue_;
    this.element_.textContent = value == null ? '' : String(value);
  }
}

/**
 * Helper to register `BindTextDirective` lazily under the `bind_text` attribute.
 */
export const registerBindTextDirective = lazyDirective('bind_text', BindTextDirective);
