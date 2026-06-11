import {attribute, Directive, lazyDirective} from '@alwatr/directive';

import {service_binding, type BindingValue} from './main.js';

/**
 * A declarative DOM directive that binds CSS custom properties (variables) to view model properties.
 *
 * Syntax: `bind_css_var="--var-name: namespace.propertyName; --another-var: namespace.anotherProperty"`
 *
 * Supports binding multiple CSS variables on the same element separated by semicolons (`;`).
 *
 * Behavior:
 * - `null` / `undefined` value: Removes the CSS variable from the element's inline style.
 * - Any other type: Coerced via `String(value)` and set as the CSS variable's value on the element's style.
 *
 * Includes a redundant write guard (via `lastValues_`) that skips calls to the DOM if the property value hasn't changed.
 * Supports deferred viewport initialization if the `lazy_bind` attribute is present on the element.
 *
 * @example
 * ```html
 * <!-- Binds '--player-progress' to 'player.progress' -->
 * <div bind_css_var="--player-progress: player.progress"></div>
 *
 * <!-- Binds multiple CSS variables -->
 * <div bind_css_var="--color: theme.primaryColor; --font-size: theme.fontSize"></div>
 *
 * <!-- Lazy CSS variable binding -->
 * <div bind_css_var="--opacity: ui.opacity" lazy_bind></div>
 * ```
 */
export class BindCssVarDirective extends Directive {
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
   * Main binding initialization logic. Parses each CSS variable-binding pair,
   * retrieves the corresponding ViewModel signals, subscribes to updates,
   * and applies the initial CSS variable state.
   */
  protected bindingInit_(): void {
    DEV_MODE && this.logger_.logMethod?.('bindingInit_');
    for (const rawPair of this.attributeValue.split(';')) {
      const pair = rawPair.trim();
      if (pair === '') continue;

      const index = pair.indexOf(':');
      if (index === -1) {
        DEV_MODE && this.logger_.accident('bindingInit_', 'invalid_binding_pair', {pair});
        continue;
      }
      const cssVarName = pair.substring(0, index).trim();
      const viewKey_ = pair.substring(index + 1).trim();
      const [namespace, prop] = viewKey_.split('.');

      if (!cssVarName || !namespace || !prop) {
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
        if (Object.is(this.lastValues_[cssVarName], value)) return; // guard against redundant updates
        this.lastValues_[cssVarName] = value;
        this.applyCssVar_(cssVarName, value);
      });
    }
  }

  /**
   * Applies the bound value to a specific CSS variable on the element's style.
   *
   * @param name The name of the CSS variable (e.g., `'--player-progress'`).
   * @param value The value to apply.
   */
  protected applyCssVar_(name: string, value: BindingValue): void {
    DEV_MODE && this.logger_.logMethodArgs?.('applyCssVar_', {name, value});
    if (value == null) {
      this.element_.style.removeProperty(name);
      return;
    }
    this.element_.style.setProperty(name, String(value));
  }
}

/**
 * Helper to register `BindCssVarDirective` lazily under the `bind_css_var` attribute.
 */
export const registerBindCssVarDirective = lazyDirective('bind_css_var', BindCssVarDirective);
