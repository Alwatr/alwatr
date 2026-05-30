import {createComputedSignal} from '../creators/computed.js';
import {createStateSignal} from '../creators/state.js';

import type {ComputedSignal} from '../core/computed-signal.js';
import type {IReadonlySignal} from '../type.js';

/**
 * Creates a new computed signal that only emits values from a source signal
 * that satisfy a predicate function.
 *
 * This operator is analogous to `Array.prototype.filter`. It is particularly
 * useful for creating effects or other computed signals that should only react
 * to a specific subset of state changes.
 *
 * Note: The resulting signal's value will be `undefined` until the source
 * emits a value that passes the filter.
 *
 * @template T The type of the signal's value.
 *
 * @param sourceSignal The original signal to filter.
 * @param predicate A function that returns `true` if the value should be passed.
 * @param name An optional, unique identifier for the new signal for debugging. default: `${sourceSignal.name}-filtered`
 *
 * @returns A new computed signal that emits filtered values.
 *
 * @example
 * ```typescript
 * const numberSignal = createStateSignal({ name: 'number', initialValue: 0 });
 *
 * const evenNumberSignal = createFilteredSignal(
 *   numberSignal,
 *   (num) => num % 2 === 0,
 * );
 *
 * createEffect({
 *   deps: [evenNumberSignal],
 *   run: () => {
 *     // This effect only runs for even numbers.
 *     // The value can be `undefined` on the first run if initialValue is not even.
 *     if (evenNumberSignal.get() !== undefined) {
 *       console.log(`Even number detected: ${evenNumberSignal.get()}`);
 *     }
 *   },
 *   runImmediately: true,
 * });
 * // Logs: "Even number detected: 0"
 *
 * numberSignal.set(1); // Effect does not run
 * numberSignal.set(2); // Logs: "Even number detected: 2"
 * ```
 */
export function createFilteredSignal<T>(
  sourceSignal: IReadonlySignal<T>,
  predicate: (value: T) => boolean,
  name = `${sourceSignal.name}-filtered`,
): ComputedSignal<T | undefined> {
  const sourceValue = sourceSignal.get();
  const initialValue = predicate(sourceValue) ? sourceValue : undefined;

  const internalSignal = createStateSignal({
    name: `${name}-internal`,
    initialValue,
  });

  const subscription = sourceSignal.subscribe((newValue) => {
    if (predicate(newValue)) {
      internalSignal.set(newValue);
    }
  });

  return createComputedSignal({
    name: name,
    deps: [internalSignal],
    get: () => internalSignal.get(),
    onDestroy: () => {
      subscription.unsubscribe();
      internalSignal.destroy();
    },
  });
}
