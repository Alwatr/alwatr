/* eslint-disable no-prototype-builtins */

/**
 * A polyfill for Object.hasOwn
 *
 * @example
 * ```typescript
 * import '@alwatr/polyfill-has-own';
 *
 * const obj = { foo: 'bar' };
 * Object.hasOwn(obj, 'foo'); // true
 * ```
 */
if (Object.prototype.hasOwnProperty.call(Object, 'hasOwn') === false) {
  // @ts-expect-error - TS doesn't know about this polyfill
  Object.hasOwn = Object.call.bind(Object.prototype.hasOwnProperty);
}
