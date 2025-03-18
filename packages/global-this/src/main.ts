export type GlobalThis = typeof globalThis;

const globalThis__: GlobalThis =
  (typeof globalThis === 'object' && globalThis) ||
  (typeof window === 'object' && window) ||
  (typeof global === 'object' && global) ||
  self;

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
