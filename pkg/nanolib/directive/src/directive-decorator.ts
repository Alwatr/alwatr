import {directiveRegistry_, logger} from './lib.js';
import type {DirectiveBase} from './directive-class.js';

/**
 * Type definition for a directive constructor.
 * A directive class must have a constructor that accepts an HTMLElement.
 */
export type DirectiveConstructor<T extends DirectiveBase = DirectiveBase> = new (
  element: HTMLElement,
  attributeName: string,
) => T;

/**
 * A class decorator that registers a class as an attribute-based directive.
 * @param name The unique attribute name for this directive (e.g., 'alwatr-tooltip').
 *
 * @example
 * ```ts
 * @directive('alwatr-copy')
 * class CopyDirective extends DirectiveBase {
 *   protected init_(): void {
 *     // this.attributeValue contains the value of the 'alwatr-copy' attribute
 *     console.log('Directive configured with:', this.attributeValue);
 *   }
 * }
 * ```
 */
export function directive(name: string) {
  logger.logMethodArgs?.('@directive', name);

  /**
   * The decorator function that receives the class constructor.
   * @param constructor The class to be registered as a directive.
   * @param context The decorator context.
   */
  return function (constructor: DirectiveConstructor, context: ClassDecoratorContext): void {
    if (context.kind !== 'class') {
      throw new Error('@directive can only be used on classes');
    }

    if (directiveRegistry_.has(name)) {
      logger.accident('@directive', 'duplicate_directive_registration', {name});
      return;
    }

    directiveRegistry_.set(name, constructor);
  };
}

/**
 * Creates a lazy registration function for a directive.
 *
 * Unlike the `@directive` decorator — which registers the directive immediately at class
 * definition time (a module-level side effect) — `lazyDirective` introduces NO side effects
 * at import time. The directive is only registered when the consumer explicitly calls the
 * returned function. This makes the directive module fully tree-shakeable.
 *
 * @param name The unique attribute name for this directive (e.g., 'alwatr-on').
 * @param constructor The directive class constructor.
 * @returns A zero-argument function that registers the directive when called.
 *
 * @example
 * ```ts
 * // In the directive module — no side effect at import time:
 * export class MyDirective extends DirectiveBase { ... }
 * export const registerMyDirective = lazyDirective('my-attr', MyDirective);
 *
 * // In the consumer — opt-in explicitly:
 * import {registerMyDirective} from './my-directive.js';
 * registerMyDirective(); // only now is the directive registered
 * bootstrapDirectives();
 * ```
 */
export function lazyDirective<T extends DirectiveBase>(name: string, constructor: DirectiveConstructor<T>): () => void {
  // Return a closure — no registration happens here, only when the returned function is called.
  return function registerDirective(): void {
    if (directiveRegistry_.has(name)) {
      logger.accident('lazyDirective', 'duplicate_directive_registration', {name});
      return;
    }
    logger.logMethodArgs?.('lazyDirective', name);
    directiveRegistry_.set(name, constructor);
  };
}
