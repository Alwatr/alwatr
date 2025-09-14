import {EffectSignal} from '../core/effect-signal.js';

import type {EffectSignalConfig, IEffectSignal} from '../type.js';

/**
 * Creates a side-effect that runs in response to changes in dependency signals.
 *
 * `EffectSignal` is designed for running logic that interacts with the "outside world"—such as
 * logging, network requests, or DOM manipulation—whenever its dependencies are updated.
 * It encapsulates the subscription and cleanup logic, providing a robust and memory-safe
 * way to handle reactive side-effects.
 *
 * A key feature is its lifecycle management: an `EffectSignal` **must** be destroyed when no longer
 * needed to prevent memory leaks and stop the effect from running unnecessarily.
 *
 * @param {EffectSignalConfig} config The configuration for the effect.
 * @returns {IEffectSignal} An object with a `destroy` method to stop the effect.
 *
 * @example
 * // --- Create dependency signals ---
 * const counter = new StateSignal({ initialValue: 0, signalId: 'counter' });
 * const user = new StateSignal({ initialValue: 'guest', signalId: 'user' });
 *
 * // --- Create an effect ---
 * const analyticsEffect = createEffect({
 *   deps: [counter, user],
 *   run: () => {
 *     console.log(`Analytics: User '${user.value}' clicked ${counter.value} times.`);
 *   },
 *   runImmediately: true, // Optional: run once on creation
 * });
 * // Immediately logs: "Analytics: User 'guest' clicked 0 times."
 *
 * // --- Trigger the effect by updating a dependency ---
 * counter.set(1);
 * // After a macrotask, logs: "Analytics: User 'guest' clicked 1 times."
 *
 * // --- IMPORTANT: Clean up when the effect is no longer needed ---
 * analyticsEffect.destroy();
 *
 * // Further updates will not trigger the effect.
 * counter.set(2); // Nothing is logged.
 */
export function createEffect(config: EffectSignalConfig): EffectSignal {
  return new EffectSignal(config);
}
