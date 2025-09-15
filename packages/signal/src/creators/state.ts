import {StateSignal} from '../core/state-signal.js';

import type {StateSignalConfig} from '../type.js';

/**
 * Creates a stateful signal that holds a value and notifies listeners when the value changes.
 *
 * `StateSignal` is the core of the signal library, representing a piece of mutable state.
 * It always has a value, and new subscribers immediately receive the current value by default.
 *
 * @template T The type of the state it holds.
 *
 * @param config The configuration for the state signal.
 * @returns A new instance of StateSignal.
 *
 * @example
 * const counter = createStateSignal({
 *   signalId: 'counter-signal',
 *   initialValue: 0,
 * });
 *
 * console.log(counter.get()); // Outputs: 0
 * counter.set(1);
 * console.log(counter.get()); // Outputs: 1
 */
export function createStateSignal<T>(config: StateSignalConfig<T>): StateSignal<T> {
  return new StateSignal(config);
}
