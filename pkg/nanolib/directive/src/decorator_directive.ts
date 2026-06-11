import {directiveRegistry_, logger} from './lib.js';
import type {DirectiveConstructor} from './type.js';

/**
 * A class decorator that registers a class as an attribute-based directive.
 *
 * @param name The unique attribute name for this directive (e.g., `'copy-button'`).
 *
 * @example
 * ```ts
 * import {Directive, directive} from '@alwatr/directive';
 *
 * @directive('copy-button')
 * class CopyDirective extends Directive {
 *   protected init_(): void {
 *     // this.attributeValue contains the value of the 'copy-button' attribute
 *     console.log('Directive configured with:', this.attributeValue);
 *   }
 * }
 * ```
 */
export function directive(name: string) {
  DEV_MODE && logger.logMethodArgs?.('@directive', name);

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
      DEV_MODE && logger.accident('@directive', 'duplicate_directive_registration', {name});
      return;
    }

    directiveRegistry_.set(name, constructor);
  };
}
