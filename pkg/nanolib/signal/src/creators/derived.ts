import {DerivedSignal} from '../core/derived-signal.js';

import type {DerivedSignalConfig} from '../type.js';

/**
 * Creates a read-only signal mapping exactly 1-to-1 over a single upstream source.
 *
 * `createDerivedSignal` is a utility function to instantiate `DerivedSignal` without using the `new` keyword.
 * A derived signal wraps a source signal and maps its value to a new representation using a projector function.
 * It uses the "Cold Awakening Lifecycle" pattern, which avoids subscribing to the source signal until the derived
 * signal has at least one subscriber of its own, saving processing cycles.
 *
 * @template S The type of the source signal's state.
 * @template T The type of the projected derived state.
 *
 * @param config Configuration options including name, source, and projector.
 * @returns A new, readonly derived signal.
 *
 * @example
 * ```typescript
 * const countSignal = createStateSignal({ name: 'count', initialValue: 5 });
 *
 * const isEvenSignal = createDerivedSignal({
 *   name: 'is-even-signal',
 *   source: countSignal,
 *   projector: (count) => count % 2 === 0
 * });
 *
 * console.log(isEvenSignal.get()); // false
 * ```
 */
export function createDerivedSignal<S, T>(config: DerivedSignalConfig<S, T>): DerivedSignal<S, T> {
  return new DerivedSignal(config);
}
