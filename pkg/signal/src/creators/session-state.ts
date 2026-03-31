import { SessionStateSignal } from '../core/session-state-signal.js';

import type { SessionStateSignalConfig } from '../type.js';

/**
 * Creates a stateful signal that persists its value in `sessionStorage`.
 *
 * The stored data survives soft navigations and page refreshes within the same browser tab,
 * but is automatically cleared when the tab or window is closed.
 *
 * Use this for transient UI state such as:
 * - Multi-step wizard progress
 * - Unsaved form drafts
 * - Scroll position or active tab indices
 *
 * @template T The type of the state it holds. Must be JSON-serializable.
 *
 * @param {SessionStateSignalConfig<T>} config The configuration for the session state signal.
 * @returns {SessionStateSignal<T>} A new `SessionStateSignal` instance.
 *
 * @example
 * ```typescript
 * import {createSessionStateSignal} from '@alwatr/signal';
 *
 * const checkoutWizard = createSessionStateSignal<{step: number}>({
 *   name: 'checkout-wizard',
 *   initialValue: {step: 1},
 * });
 *
 * // State is restored from sessionStorage if it exists.
 * console.log(checkoutWizard.get()); // {step: 1} or last saved value
 *
 * // Update state — automatically saved to sessionStorage.
 * checkoutWizard.set({step: 2});
 *
 * // Cleanup when no longer needed.
 * checkoutWizard.destroy();
 * ```
 */
export function createSessionStateSignal<T extends JsonValue>(config: SessionStateSignalConfig<T>): SessionStateSignal<T> {
  return new SessionStateSignal(config);
}