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
 * * @param name The unique attribute name for this directive (e.g., 'alwatr-tooltip').
 *
 * @example
 * ```ts
 * @directive('alwatr-copy')
 * class CopyDirective extends DirectiveBase {
 * protected update_(): void {
 * // this.value contains the value of the 'alwatr-copy' attribute
 * console.log('Directive configured with:', this.value);
 * }
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
