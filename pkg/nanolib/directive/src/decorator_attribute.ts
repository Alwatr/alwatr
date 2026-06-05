/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Directive} from './directive_base_class.js';

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
