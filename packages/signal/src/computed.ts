import {StateSignal} from './state-signal.js';

import type {ComputedOptions, ReadonlySignal} from './type.js';

/**
 * Creates a read-only computed signal that derives its value from other signals.
 * Its value is recalculated whenever any of the specified dependencies change.
 *
 * @template T The type of the computed value.
 * @param options The options object containing the computation details.
 * @param options.signalId Optional unique identifier for the signal.
 * @param options.deps An array of signals that this computation depends on.
 * @param options.get The function to run to compute the value.
 * @returns A `ReadonlySignal` containing the computed value.
 *
 * @example
 * const firstName = new StateSignal({ initialValue: 'John' });
 * const lastName = new StateSignal({ initialValue: 'Doe' });
 *
 * const fullName = computed({
 *   signalId: 'fullName', // Optional
 *   deps: [firstName, lastName],
 *   get: () => `${firstName.value} ${lastName.value}`,
 * });
 *
 * console.log(fullName.value); // "John Doe"
 * firstName.set('Jane');
 * console.log(fullName.value); // "Jane Doe"
 */
export function computed<T>(options: ComputedOptions<T>): ReadonlySignal<T> {
  // Use a StateSignal internally to hold the computed value and manage subscribers.
  const internalSignal = new StateSignal<T>({
    signalId: options.signalId, // Use provided signalId or default
    initialValue: options.get(), // Calculate the initial value
  });

  const recalculate = (): void => {
    internalSignal.set(options.get());
  };

  // Subscribe to every dependency. When any of them change, recalculate.
  for (const signal of options.deps) {
    // TODO: destroying a computed?!
    signal.subscribe(recalculate);
  }

  // Return a read-only version of the internal signal.
  // This prevents consumers from calling .set() on a computed signal.
  return {
    get value(): T {
      return internalSignal.value;
    },
    subscribe: internalSignal.subscribe.bind(internalSignal),
  };
}
