/* eslint-disable @typescript-eslint/no-explicit-any */
import type {DirectiveBase} from './directiveClass.js';

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
 *   protected myElement: HTMLDivElement | null;
 * }
 * ```
 */
export function query(selector: string, cache = true, root?: ParentNode) {
  return function (target: DirectiveBase, propertyKey: string): void {
    const privateKey = Symbol(`${String(propertyKey)}__`);

    Object.defineProperty(target, propertyKey, {
      get(this: DirectiveBase) {
        if (cache === false || (this as any)[privateKey] === undefined) {
          root ??= this.element_;
          (this as any)[privateKey] = root.querySelector(selector);
        }
        return (this as any)[privateKey];
      },
      configurable: true,
      enumerable: true,
    });
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
 *   protected myElements: NodeListOf<HTMLDivElement>;
 * }
 * ```
 */
export function queryAll(selector: string, cache = true, root?: ParentNode) {
  return function (target: DirectiveBase, propertyKey: string): void {
    const privateKey = Symbol(`${String(propertyKey)}__`);

    Object.defineProperty(target, propertyKey, {
      get(this: DirectiveBase) {
        if (cache === false || (this as any)[privateKey] === undefined) {
          root ??= this.element_;
          (this as any)[privateKey] = root.querySelectorAll(selector);
        }
        return (this as any)[privateKey];
      },
      configurable: true,
      enumerable: true,
    });
  };
}
