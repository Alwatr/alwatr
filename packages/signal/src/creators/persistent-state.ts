import {PersistentStateSignal} from '../core/persistent-state-signal.js';

import type {PersistentStateSignalConfig} from '../type.js';

/**
 * Creates a stateful signal that persists its value in localStorage.
 *
 * This function provides a clean, declarative API for creating state that
 * survives page reloads. It automatically handles reading the initial state
 * from localStorage and saving subsequent updates.
 *
 * @template T The type of the state it holds.
 *
 * @param {PersistentStateSignalConfig<T>} config The configuration for the persistent state signal.
 * @returns {PersistentStateSignal<T>} A new instance of PersistentStateSignal.
 *
 * @example
 * // Create a signal to store user's preferred theme.
 * const userThemeSignal = createPersistentStateSignal<string>({
 *   name: 'user-theme',
 *   schemaVersion: 1,
 *   defaultValue: 'light',
 * });
 *
 * // The initial value is read from localStorage, or 'light' if not present.
 * console.log(userThemeSignal.get());
 *
 * // Setting a new value updates the in-memory state and writes to localStorage.
 * userThemeSignal.set('dark');
 */
export function createPersistentStateSignal<T extends JsonValue>(config: PersistentStateSignalConfig<T>): PersistentStateSignal<T> {
  return new PersistentStateSignal(config);
}
