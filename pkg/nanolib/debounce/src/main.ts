import {Debouncer} from './debounce.js';

import type {DebouncerConfig} from './type.js';

export * from './debounce.js';
export type * from './type.js';

/**
 * Factory function for creating a Debouncer instance for better type inference.
 * @param config Configuration for the debouncer.
 *
 * @example
 * ```typescript
 * const debouncer = createDebouncer({
 *   func: (text: string) => console.log('Searching:', text),
 *   delay: 300,
 *   leading: false,
 *   trailing: true,
 * });
 *
 * // Debounce search input
 * debouncer.trigger('hello');
 * debouncer.trigger('hello world'); // Only 'hello world' will log after 300ms
 *
 * // With custom thisContext
 * const obj = { log: (msg: string) => console.log('Obj:', msg) };
 * const debouncerWithContext = createDebouncer({
 *   func: obj.log,
 *   thisContext: obj,
 *   delay: 200,
 * });
 * debouncerWithContext.trigger('test'); // Logs 'Obj: test'
 * ```
 */
export function createDebouncer<F extends AnyFunc>(config: DebouncerConfig<F>): Debouncer<F> {
  return new Debouncer(config);
}
