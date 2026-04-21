/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Directive} from './directive-class.js';

/**
 * A property decorator that queries the directive's element for a CSS selector.
 * The result is cached on first access by default.
 *
 * @param selector The CSS selector to query for.
 * @param cache    Whether to cache the result after first access. Defaults to `true`.
 * @param root     Optional root element to query from. Defaults to `this.element_`.
 *
 * @example
 * ```ts
 * @directive('my-card')
 * class CardDirective extends Directive {
 *   @query('.card-title')
 *   accessor titleEl!: HTMLElement | null;
 * }
 * ```
 */
export function query<T extends Element, D extends Directive = Directive>(
  selector: string,
  cache = true,
  root?: ParentNode,
) {
  return function (
    _target: ClassAccessorDecoratorTarget<D, T | null>,
    context: ClassAccessorDecoratorContext<D, T | null>,
  ): ClassAccessorDecoratorResult<D, T | null> {
    if (context.kind !== 'accessor') {
      throw new Error('@query can only be used with the "accessor" keyword');
    }

    const privateKey = Symbol(`${String(context.name)}__`);

    return {
      get(this: D) {
        let value = (this as any)[privateKey] as T | null | undefined;
        if (value === undefined || cache === false) {
          const parent = root ?? this.element_;
          value = (this as any)[privateKey] = parent.querySelector<T>(selector);
        }
        return value;
      },
    };
  };
}

/**
 * A property decorator that queries the directive's element for all matching elements.
 * The result is cached on first access by default.
 *
 * @param selector The CSS selector to query for.
 * @param cache    Whether to cache the result after first access. Defaults to `true`.
 * @param root     Optional root element to query from. Defaults to `this.element_`.
 *
 * @example
 * ```ts
 * @directive('my-tabs')
 * class TabsDirective extends Directive {
 *   @queryAll('.tab-item')
 *   accessor tabItems!: NodeListOf<HTMLElement>;
 * }
 * ```
 */
export function queryAll<T extends Element, D extends Directive = Directive>(
  selector: string,
  cache = true,
  root?: ParentNode,
) {
  return function (
    _target: ClassAccessorDecoratorTarget<D, NodeListOf<T>>,
    context: ClassAccessorDecoratorContext<D, NodeListOf<T>>,
  ): ClassAccessorDecoratorResult<D, NodeListOf<T>> {
    if (context.kind !== 'accessor') {
      throw new Error('@queryAll can only be used with the "accessor" keyword');
    }

    const privateKey = Symbol(`${String(context.name)}__`);

    return {
      get(this: D) {
        let value = (this as any)[privateKey] as NodeListOf<T> | undefined;
        if (value === undefined || cache === false) {
          const parent = root ?? this.element_;
          value = (this as any)[privateKey] = parent.querySelectorAll<T>(selector);
        }
        return value;
      },
    };
  };
}

/**
 * A property decorator that reads an attribute value from the directive's element.
 * The result is cached on first access by default.
 *
 * @param name  The attribute name to read.
 * @param cache Whether to cache the result after first access. Defaults to `true`.
 * @param root  Optional element to read the attribute from. Defaults to `this.element_`.
 *
 * @example
 * ```ts
 * @directive('user-card')
 * class UserCardDirective extends Directive {
 *   @attribute('user-id')
 *   accessor userId!: string | null;
 * }
 * ```
 */
export function attribute<D extends Directive = Directive>(name: string, cache = true, root?: Element) {
  return function (
    _target: ClassAccessorDecoratorTarget<D, string | null>,
    context: ClassAccessorDecoratorContext<D, string | null>,
  ): ClassAccessorDecoratorResult<D, string | null> {
    if (context.kind !== 'accessor') {
      throw new Error('@attribute can only be used with the "accessor" keyword');
    }

    const privateKey = Symbol(`${String(context.name)}__`);

    return {
      get(this: D) {
        let value = (this as any)[privateKey] as string | null | undefined;
        if (value === undefined || cache === false) {
          const element = root ?? this.element_;
          value = (this as any)[privateKey] = element.getAttribute(name);
        }
        return value;
      },
    };
  };
}

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
      this.logger_.logMethodArgs?.('@on-init', {eventType, selector, options});
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
