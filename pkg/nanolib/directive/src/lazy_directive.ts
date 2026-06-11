import type {Directive} from './directive_base_class.js';
import {bootstrapNewDirective_, directiveRegistry_, logger} from './lib.js';
import type {DirectiveConstructor, RegisterDirectiveFunction} from './type.js';

/**
 * Creates a lazy registration function for a directive.
 *
 * Unlike the `@directive` decorator — which registers the directive immediately at class
 * definition time (a module-level side effect) — `lazyDirective` introduces NO side effects
 * at import time. The directive is only registered when the consumer explicitly calls the
 * returned function. This makes the directive module fully tree-shakeable.
 *
 * @param name The name of the attribute that identifies the directive (e.g., 'my-attr' for `<div my-attr>`).
 * @param constructor The constructor function for the directive to initialize.
 * @param autoBootstrap If true (default), the directive will be automatically bootstrapped on the page immediately after registration. If false, the consumer must call `bootstrapDirectives()` manually to initialize the directive on the page.
 * @param bootstrapRoot An optional root element to limit the scope of directive initialization. If not provided, it defaults to `document`, meaning the directive will be initialized across the entire document.
 *
 * @example
 * ```typescript
 * // my-button.directive.ts
 * class MyButtonDirective extends Directive {
 *   // Directive implementation...
 * }
 * export const registerMyButtonDirective = lazyDirective('my-button', MyButtonDirective, false);
 *
 * // main.ts
 * requestIdleCallback(() => {
 *   registerMyButtonDirective();
 *   bootstrapDirectives(); // Only newly registered directives will be initialized on the page.
 * });
 * ```
 */
export function lazyDirective<T extends Directive>(
  name: string,
  constructor: DirectiveConstructor<T>,
): RegisterDirectiveFunction {
  // Return a closure — no registration happens here, only when the returned function is called.
  return function registerDirective(autoBootstrap: boolean, bootstrapRoot?: HTMLElement | Document): void {
    if (directiveRegistry_.has(name)) {
      DEV_MODE && logger.accident('lazyDirective', 'duplicate_directive_registration', {name});
      return;
    }
    DEV_MODE && logger.logMethodArgs?.('lazyDirective', name);
    directiveRegistry_.set(name, constructor);

    if (autoBootstrap && typeof document !== 'undefined') {
      bootstrapNewDirective_(name, constructor, bootstrapRoot);
    }
  };
}
