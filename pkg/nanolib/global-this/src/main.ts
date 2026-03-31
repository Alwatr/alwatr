/// <reference types="@alwatr/nano-build" />

export type GlobalThis = typeof globalThis;

/**
 * The global object in various JavaScript environments.
 * It checks for `globalThis`, `window`, `global`, and `self` in that order.
 * @private
 */
const globalThis__: GlobalThis = (() => {
  if (typeof globalThis === 'object' && globalThis) return globalThis;
  if (typeof window === 'object' && window) return window;
  if (typeof global === 'object' && global) return global;
  if (typeof self === 'object' && self) return self;
  throw new Error(`${__package_name__} v${__package_version__}: Could not find global object.`);
})();

/**
 * Provides access to `globalThis`, ensuring cross-platform compatibility.
 *
 * @example
 * ```typescript
 * getGlobalThis<{alwatr:{foo: string}}>().alwatr = {
 *  foo: 'bar',
 * }
 * ```
 */
export function getGlobalThis<T extends DictionaryOpt = GlobalThis>(): GlobalThis & T {
  return globalThis__ as GlobalThis & T;
}
