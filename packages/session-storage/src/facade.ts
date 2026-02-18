import { SessionStorageProvider } from './session-storage.provider.js';

/**
 * Factory function to create a new SessionStorageProvider.
 *
 * @param name - The unique name for the storage item.
 * @returns An instance of SessionStorageProvider.
 *
 * @example
 * ```typescript
 * const formData = createSessionStorageProvider('multi-step-form');
 *
 * // Write new data
 * formData.write({ step: 2, answers: { q1: 'yes' } });
 *
 * // Read the current data
 * const current = formData.read();
 * console.log(current); // { step: 2, answers: { q1: 'yes' } }
 * ```
 */
export function createSessionStorageProvider<T extends JsonValue>(name: string): SessionStorageProvider<T> {
  return new SessionStorageProvider<T>(name);
}
