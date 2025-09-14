export type GlobalThis = typeof globalThis;

const globalThis__: GlobalThis = /* #__PURE__ */ (() => {
  if (typeof globalThis === 'object' && globalThis) return globalThis;
  if (typeof window === 'object' && window) return window;
  if (typeof global === 'object' && global) return global;
  if (typeof self === 'object' && self) return self;
  throw new Error('alwatr/logger: Could not find global object.');
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
