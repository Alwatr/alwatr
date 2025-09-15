import {createComputedSignal} from '../creators/computed.js';

import type {ComputedSignal} from '../core/computed-signal.js';
import type {IReadonlySignal} from '../type.js';

/**
 * Creates a new read-only computed signal that transforms the value of a source
 * signal using a projection function.
 *
 * This operator is analogous to `Array.prototype.map`. It applies a function to
 * each value emitted by the source signal and emits the result.
 *
 * @template T The type of the source signal's value.
 * @template R The type of the projected value.
 *
 * @param sourceSignal The original signal to transform.
 * @param projectFunction A function to apply to each value from the source signal.
 * @param [signalId] An optional, unique identifier for the new signal for debugging. default: `${sourceSignal.signalId}-mapped`
 *
 * @returns A new, read-only computed signal with the transformed values.
 *
 * @example
 * const userSignal = createStateSignal({
 *   signalId: 'user',
 *   initialValue: { name: 'John', age: 30 },
 * });
 *
 * const userNameSignal = createMappedSignal(
 *   userSignal,
 *   (user) => user.name,
 * );
 *
 * console.log(userNameSignal.get()); // Outputs: "John"
 * // in next macro-task ...
 * userSignal.set({ name: 'Jane', age: 32 });
 * console.log(userNameSignal.get()); // Outputs: "Jane"
 */
export function createMappedSignal<T, R>(
  sourceSignal: IReadonlySignal<T>,
  projectFunction: (value: T) => R,
  signalId = `${sourceSignal.signalId}-mapped`,
): ComputedSignal<R> {
  return createComputedSignal({
    signalId,
    deps: [sourceSignal],
    get: () => projectFunction(sourceSignal.get()),
  });
}
