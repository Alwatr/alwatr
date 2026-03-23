import { directiveRegistry_, logger } from './lib.js';

import type { DirectiveBase } from './directiveClass.js';

/**
 * Type definition for a directive constructor.
 * A directive class must have a constructor that accepts an HTMLElement.
 */
export type DirectiveConstructor<T extends DirectiveBase = DirectiveBase> = new (element: HTMLElement, selector: string) => T;

/**
 * A class decorator that registers a class as a directive.
 *
 * @param selector The CSS selector to which this directive will be attached.
 *
 * @example
 * ```ts
 * @directive('.my-button')
 * class MyButtonDirective extends DirectiveBase {
 *   protected update_(): void {
 *     this.element_.addEventListener('click', () => console.log('Button clicked!'));
 *   }
 * }
 * ```
 */
export function directive(selector: string) {
  logger.logMethodArgs?.('@directive', selector);

  /**
   * The decorator function that receives the class constructor.
   * @param constructor The class to be registered as a directive.
   * @param context The decorator context.
   */
  return function (constructor: DirectiveConstructor, context: ClassDecoratorContext): void {
    if (context.kind !== 'class') {
      throw new Error('@directive can only be used on classes');
    }

    directiveRegistry_.push({
      selector,
      constructor
    });
  };
}
