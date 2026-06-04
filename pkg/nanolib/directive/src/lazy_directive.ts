import type {Directive} from './directive_base_class.js';
import {bootstrapNewDirective_, directiveRegistry_, logger} from './lib.js';
import type {DirectiveConstructor} from './type.js';

/**
 * Creates a lazy registration function for a directive.
 *
 * Unlike the `@directive` decorator — which registers the directive immediately at class
 * definition time (a module-level side effect) — `lazyDirective` introduces NO side effects
 * at import time. The directive is only registered when the consumer explicitly calls the
 * returned function. This makes the directive module fully tree-shakeable.
 *
 * @param name The unique attribute name for this directive (e.g., 'on-action').
 * @param constructor The directive class constructor.
 * @returns A zero-argument function that registers the directive when called.
 *
 * @example
 * ```ts
 * // In the directive module — no side effect at import time:
 * export class MyDirective extends Directive { ... }
 * export const registerMyDirective = lazyDirective('my-attr', MyDirective);
 *
 * // In the consumer — opt-in explicitly:
 * import {registerMyDirective} from './my-directive.js';
 * registerMyDirective(); // only now is the directive registered
 * bootstrapDirectives();
 * ```
 */
export function lazyDirective<T extends Directive>(
  name: string,
  constructor: DirectiveConstructor<T>,
  autoBootstrap = true,
): () => void {
  // Return a closure — no registration happens here, only when the returned function is called.
  return function registerDirective(): void {
    if (directiveRegistry_.has(name)) {
      logger.accident('lazyDirective', 'duplicate_directive_registration', {name});
      return;
    }
    logger.logMethodArgs?.('lazyDirective', name);
    directiveRegistry_.set(name, constructor);

    if (autoBootstrap && typeof document !== 'undefined') {
      bootstrapNewDirective_(document.body, constructor, name);
    }
  };
}
