/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Directive} from './directive_base_class.js';

/**
 * A method decorator that registers a DOM event listener on the directive's element (or a matching
 * child element when a CSS selector is provided). The listener is automatically removed when the
 * directive is destroyed, preventing memory leaks.
 *
 * @param eventType The DOM event type to listen for (e.g. `'click'`, `'input'`).
 * @param selector  Optional CSS selector; when provided, the listener is registered on
 *                  `this.element_.querySelector(selector)` instead of `this.element_`.
 * @param options   Optional `AddEventListenerOptions` or capture boolean passed to `addEventListener`.
 *
 * @deprecated Do not use this decorator until the JS Decorator `addInitializer` becomes stable.
 *
 * @example
 * ```ts
 * @directive('my-form')
 * class MyFormDirective extends Directive {
 *   @on('click')
 *   protected onClick_(event: Event): void {
 *     console.log('clicked', event);
 *   }
 *
 *   @on('input', '.search-input')
 *   protected onInput_(event: Event): void {
 *     console.log('input', (event.target as HTMLInputElement).value);
 *   }
 * }
 * ```
 */
export function on<D extends Directive = Directive>(
  eventType: keyof HTMLElementEventMap | string,
  selector?: string,
  options?: AddEventListenerOptions | boolean,
) {
  return function (
    target: (this: D, event: Event) => void,
    context: ClassMethodDecoratorContext<D, (event: Event) => void>,
  ): void {
    if (context.kind !== 'method') {
      throw new Error('@on can only be used on class methods');
    }

    context.addInitializer(function (this: D) {
      DEV_MODE && this.logger_.logMethodArgs?.('@on-init', {eventType, selector, options});
      const targetElement = selector ? this.element_.querySelector(selector) : this.element_;

      if (selector && targetElement === null) {
        this.logger_.accident('on', 'selector_not_found', {selector});
        return;
      }

      const boundMethod = target.bind(this);
      (targetElement as HTMLElement).addEventListener(eventType, boundMethod, options);
      this.addDestroyHook(() => (targetElement as HTMLElement).removeEventListener(eventType, boundMethod, options));
    });
  };
}
