import {ComputedSignal} from '../core/computed-signal.js';

import type {ComputedSignalConfig} from '../type.js';

/**
 * Creates a  * A read-only signal that derives its value from a set of dependency signals.
 *
 * `ComputedSignal` is a powerful tool for creating values that reactively update when their underlying
 * data sources change. Its value is memoized, meaning the `get` function is only re-evaluated when
 * one of its dependencies has actually changed.
 *
 * A key feature is its lifecycle management: a `ComputedSignal` **must** be destroyed when no longer
 * needed to prevent memory leaks from its subscriptions to dependency signals.
 *
 * @template T The type of the computed value.
 *
 * @param {ComputedSignalConfig<T>} config The configuration for the computed signal.
 * @returns {IComputedSignal<T>} A new, read-only computed signal.
 *
 * @example
 * const firstName = createStateSignal({ initialValue: 'John' });
 * const lastName = createStateSignal({ initialValue: 'Doe' });
 *
 * const fullName = createComputedSignal({
 *   signalId: 'fullName',
 *   deps: [firstName, lastName],
 *   get: () => `${firstName.value} ${lastName.value}`,
 * });
 *
 * console.log(fullName.value); // "John Doe"
 *
 * // IMPORTANT: Always destroy a computed signal when no longer needed.
 * // fullName.destroy();
 */
export function createComputedSignal<T>(config: ComputedSignalConfig<T>): ComputedSignal<T> {
  return new ComputedSignal(config);
}
