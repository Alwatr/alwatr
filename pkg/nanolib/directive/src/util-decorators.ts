/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Directive} from './directive-class.js';

/**
 * A property decorator that queries the directive's element for a selector.
 * The query is performed once and the result is cached.
 *
 * @param selector The CSS selector to query for.
 * @param cache Whether to cache the result on first access. Defaults is true.
 * @param root Optional root element to perform the query on. Defaults to the directive's element.
 *
 * @example
 * ```ts
 * @directive('[my-directive]')
 * class MyDirective extends Directive {
 *   @query('.my-element')
 *   protected myElement!: HTMLDivElement | null;
 * }
 * ```
 */
export function query<T extends Element>(selector: string, cache = true, root?: ParentNode) {
  /**
   * The decorator function that receives the property accessor.
   * @param target The prototype of the class.
   * @param context The decorator context.
   * @return A property descriptor with a getter that performs the query and caches the result.
   */
  return function (
    _target: ClassAccessorDecoratorTarget<Directive, T | null>,
    context: ClassAccessorDecoratorContext<Directive, T | null>,
  ): ClassAccessorDecoratorResult<Directive, T | null> {
    if (context.kind !== 'accessor') {
      throw new Error('@query can only be used with the "accessor" keyword');
    }

    const privateKey = Symbol(`${String(context.name)}__`);

    return {
      get() {
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
 * A property decorator that queries the directive's element for all selectors.
 * The queries are performed once and the result is cached.
 *
 * @param selector The CSS selector to query for.
 * @param cache Whether to cache the result on first access. Defaults is true.
 * @param root Optional root element to perform the query on. Defaults to the directive's element.
 *
 * @example
 * ```ts
 * @directive('[my-directive]')
 * class MyDirective extends Directive {
 *   @queryAll('.my-elements')
 *   protected myElements!: NodeListOf<HTMLDivElement>;
 * }
 * ```
 */
export function queryAll<T extends Element>(selector: string, cache = true, root?: ParentNode) {
  /**
   * The decorator function that receives the property accessor.
   * @param target The prototype of the class.
   * @param context The decorator context.
   * @return A property descriptor with a getter that performs the query and caches the result.
   */
  return function (
    _target: ClassAccessorDecoratorTarget<Directive, NodeListOf<T>>,
    context: ClassAccessorDecoratorContext<Directive, NodeListOf<T>>,
  ): ClassAccessorDecoratorResult<Directive, NodeListOf<T>> {
    if (context.kind !== 'accessor') {
      throw new Error('@queryAll can only be used with the "accessor" keyword');
    }

    const privateKey = Symbol(`${String(context.name)}__`);

    return {
      get() {
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
 * The read is performed once and the result is cached.
 *
 * @param name The attribute name to read.
 * @param cache Whether to cache the result on first access. Defaults to true.
 * @param root Optional root element to read the attribute from. Defaults to the directive's element.
 *
 * @example
 * ```ts
 * @directive('[my-directive]')
 * class MyDirective extends Directive {
 *   @attribute('data-id')
 *   accessor dataId!: string | null;
 * }
 * ```
 */
export function attribute(name: string, cache = true, root?: Element) {
  return function (
    _target: ClassAccessorDecoratorTarget<Directive, string | null>,
    context: ClassAccessorDecoratorContext<Directive, string | null>,
  ): ClassAccessorDecoratorResult<Directive, string | null> {
    if (context.kind !== 'accessor') {
      throw new Error('@attribute can only be used with the "accessor" keyword');
    }

    const privateKey = Symbol(`${String(context.name)}__`);

    return {
      get() {
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
 * @param selector Optional CSS selector to target a child element via `this.element_.querySelector(selector)`.
 *   When omitted, the listener is registered directly on `this.element_`.
 * @param options Optional `AddEventListenerOptions` or capture boolean passed to `addEventListener`.
 *
 * @deprecated Do not use this decorator until the JS Decorator `addInitializer` become stable.
 *
 * @example
 * ```ts
 * @directive('[my-directive]')
 * class MyDirective extends Directive {
 *   protected init_(): void {}
 *
 *   // Listen on this.element_
 *   @on('click')
 *   protected onClick_(event: Event): void {
 *     console.log('clicked', event);
 *   }
 *
 *   // Listen on a child element
 *   @on('input', '.search-input')
 *   protected onInput_(event: Event): void {
 *     console.log('input', (event.target as HTMLInputElement).value);
 *   }
 *
 *   // With options
 *   @on('scroll', undefined, {passive: true})
 *   protected onScroll_(event: Event): void { }
 * }
 * ```
 */
export function on(
  eventType: keyof HTMLElementEventMap | string,
  selector?: string,
  options?: AddEventListenerOptions | boolean,
) {
  return function (
    target: (this: Directive, event: Event) => void,
    context: ClassMethodDecoratorContext<Directive, (event: Event) => void>,
  ): void {
    if (context.kind !== 'method') {
      throw new Error('@on can only be used on class methods');
    }

    context.addInitializer(function (this: Directive) {
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
