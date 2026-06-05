/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Directive} from './directive_base_class.js';

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
