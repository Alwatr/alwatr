import {directiveRegistry_, logger} from './lib.js';

/**
 * Type definition for a directive constructor.
 * A directive class must have a constructor that accepts an HTMLElement.
 */
export type DirectiveConstructor = new (element: HTMLElement) => unknown;

/**
 * A class decorator that registers a class as a directive.
 *
 * @param selector The CSS selector to which this directive will be attached.
 *
 * @example
 * ```ts
 * @directive('.my-button')
 * class MyButtonDirective {
 *   constructor(element: HTMLElement) {
 *     element.addEventListener('click', () => console.log('Button clicked!'));
 *   }
 * }
 * ```
 */
export function directive(selector: string) {
  logger.logMethodArgs?.('@directive', selector);

  /**
   * The decorator function that receives the class constructor.
   * @param constructor The class to be registered as a directive.
   */
  return function (constructor: DirectiveConstructor): void {
    directiveRegistry_.push({selector, constructor});
  };
}
