/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DirectiveBase } from './directive-class.js';

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
 * class MyDirective extends DirectiveBase {
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
    _target: ClassAccessorDecoratorTarget<DirectiveBase, T | null>,
    context: ClassAccessorDecoratorContext<DirectiveBase, T | null>
  ): ClassAccessorDecoratorResult<DirectiveBase, T | null> {
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
      }
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
 * class MyDirective extends DirectiveBase {
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
    _target: ClassAccessorDecoratorTarget<DirectiveBase, NodeListOf<T>>,
    context: ClassAccessorDecoratorContext<DirectiveBase, NodeListOf<T>>
  ): ClassAccessorDecoratorResult<DirectiveBase, NodeListOf<T>> {
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
      }
    };
  };
}
