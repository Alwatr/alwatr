import {createDebouncer} from '@alwatr/debounce';
import {StateSignal} from '../core/state-signal.js';
import type {IReadonlySignal, DebounceSignalConfig} from '../type.js';

/**
 * Creates a new computed signal that debounces updates from a source signal.
 *
 * The returned signal is a `ComputedSignal`, meaning it is read-only and its value is
 * derived from the source. It only updates its value after a specified period of
 * inactivity from the source signal.
 *
 * This operator is essential for handling high-frequency events, such as user input
 * in a search box, resizing a window, or any other event that fires rapidly.
 * By debouncing, you can ensure that expensive operations (like API calls or heavy
 * computations) are only executed once the events have settled.
 *
 * @template T The type of the signal's value.
 *
 * @param {IReadonlySignal<T>} source The original signal to debounce.
 * It can be a `StateSignal`, `ComputedSignal`, or any signal implementing `IReadonlySignal`.
 * @param {DebounceSignalConfig} config Configuration object for the debouncer,
 * including `delay`, `leading`, and `trailing` options from `@alwatr/debounce`.
 *
 * @returns {IComputedSignal<T>} A new, read-only computed signal that emits debounced values.
 * Crucially, you **must** call `.destroy()` on this signal when it's no longer
 * needed to prevent memory leaks by cleaning up internal subscriptions and timers.
 *
 * @example
 * ```typescript
 * // Create a source signal for user input.
 * const searchInput = createStateSignal({
 *   name: 'search-input',
 *   initialValue: '',
 * });
 *
 * // Create a debounced signal that waits 300ms after the user stops typing.
 * const debouncedSearch = createDebouncedSignal(searchInput, { delay: 300 });
 *
 * // Use an effect to react to the debounced value.
 * createEffect({
 *   deps: [debouncedSearch],
 *   run: () => {
 *     if (debouncedSearch.get()) {
 *       console.log(`🚀 Sending API request for: "${debouncedSearch.get()}"`);
 *     }
 *   },
 * });
 *
 * searchInput.set('Alwatr');
 * searchInput.set('Alwatr Signal');
 * // (after 300ms of inactivity)
 * // Logs: "🚀 Sending API request for: "Alwatr Signal""
 *
 * // IMPORTANT: Clean up when the component unmounts.
 * // debouncedSearch.destroy();
 * ```
 */
export function createDebouncedSignal<T>(source: IReadonlySignal<T>, config: DebounceSignalConfig): IReadonlySignal<T> {
  const name = config.name ?? `${source.name}_debounced`;

  const internalSignal = new StateSignal<T>({
    name,
    initialValue: source.get(),
    onDestroy() {
      subscription.unsubscribe();
      debouncer.cancel();
      config.onDestroy?.();
      config = null as unknown as DebounceSignalConfig;
    },
  });

  const debouncer = createDebouncer({
    ...config,
    thisContext: internalSignal,
    func: internalSignal.set,
  });

  const subscription = source.subscribe(debouncer.trigger, {receivePrevious: false});

  return internalSignal;
}
