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
 * A property decorator that marks an accessor as reactive local state.
 *
 * When the accessor's value is set, `requestUpdate()` is called automatically on the directive
 * instance, scheduling a batched re-render for the next macrotask.
 *
 * This is the primary way to drive `LitDirective` re-renders from **local** state changes
 * (values owned by the directive itself). For **shared** application state, subscribe to a
 * `StateSignal` inside `init_()` and call `requestUpdate()` from the subscription callback —
 * see the signal example below.
 *
 * The decorator performs a **shallow equality check for primitives**: if the new value is
 * identical to the current value (via `Object.is`) and is a primitive (or `null`), the update
 * is skipped. For object and array values no equality check is performed — every `set` call
 * schedules an update regardless of whether the reference changed.
 *
 * @remarks
 * The `name`, `cache`, and `root` parameters are accepted for API symmetry with `@attribute`
 * but are currently unused. They are reserved for future use (e.g. persisting state to an
 * attribute or reading the initial value from the DOM).
 *
 * @example — Local state (owned by the directive)
 * ```ts
 * import {directive, LitDirective, state} from '@alwatr/directive';
 * import {html} from 'lit-html';
 *
 * @directive('like-button')
 * class LikeButtonDirective extends LitDirective {
 *   \@state()
 *   accessor liked_: string | null = null;
 *
 *   protected override init_(): void {
 *     this.liked_ = 'false'; // triggers first render
 *     this.on_('click', () => {
 *       this.liked_ = this.liked_ === 'true' ? 'false' : 'true'; // triggers re-render
 *     });
 *   }
 *
 *   protected override render_() {
 *     return html`<button class=${this.liked_ === 'true' ? 'liked' : ''}>♥</button>`;
 *   }
 * }
 * ```
 *
 * @example — Shared state via `StateSignal` subscription
 * ```ts
 * import {directive, LitDirective, state} from '@alwatr/directive';
 * import {html} from 'lit-html';
 * import {cartSignal} from '../signals/cart.js';
 *
 * @directive('cart-badge')
 * class CartBadgeDirective extends LitDirective {
 *   \@state()
 *   accessor count_: string | null = null;
 *
 *   protected override init_(): void {
 *     // Subscribe to the shared signal; each emission sets count_ and triggers a re-render.
 *     const sub = cartSignal.subscribe((cart) => {
 *       this.count_ = String(cart.items.length);
 *     });
 *     this.addDestroyHook(() => sub.unsubscribe());
 *   }
 *
 *   protected override render_() {
 *     return html`<span class="badge">${this.count_ ?? '0'}</span>`;
 *   }
 * }
 * ```
 */
export function state<T, D extends Directive = Directive>() {
  return function (
    _target: ClassAccessorDecoratorTarget<D, T>,
    context: ClassAccessorDecoratorContext<D, T>,
  ): ClassAccessorDecoratorResult<D, T> {
    if (context.kind !== 'accessor') {
      throw new Error('@state can only be used with the "accessor" keyword');
    }

    const privateKey = Symbol(`${String(context.name)}__state`);

    return {
      init(initialValue: T) {
        (this as any)[privateKey] = initialValue;
        return initialValue;
      },
      get(this: D) {
        return (this as any)[privateKey] as T;
      },
      set(this: D, newValue) {
        const oldValue = (this as any)[privateKey] as T;
        // For primitives (including null), do not notify if the value is the same.
        if (Object.is(oldValue, newValue) && (typeof newValue !== 'object' || newValue === null)) {
          return;
        }
        (this as any)[privateKey] = newValue;
        this.requestUpdate();
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
