import type {DependencyList} from './type.js';

/**
 * Runs a side-effect function whenever any of the specified dependencies change.
 * The function is also run once immediately upon creation.
 *
 * @param sideEffectFn The function to run as a side effect.
 * @param dependencies An array of signals that this effect depends on.
 * @returns A `stop` function that can be called to clean up the effect and unsubscribe from all dependencies.
 *
 * @example
 * const counter = new StateSignal({ initialValue: 0 });
 *
 * const stopEffect = effect(() => {
 * console.log(`The count is ${counter.value}`);
 * }, [counter]);
 * // Immediately logs: "The count is 0"
 *
 * counter.set(1); // Logs: "The count is 1"
 *
 * // To clean up the effect later:
 * stopEffect();
 */
export function effect(sideEffectFn: () => void, dependencies: DependencyList): () => void {
  // Run the effect immediately.
  sideEffectFn();

  // Subscribe to all dependencies.
  const unsubscribers = dependencies.map((signal) => signal.subscribe(sideEffectFn).unsubscribe);

  /**
   * A cleanup function that stops the effect by unsubscribing from all dependencies.
   */
  const stop = (): void => {
    for (const unsubscribe of unsubscribers) {
      unsubscribe();
    }
  };

  return stop;
}
