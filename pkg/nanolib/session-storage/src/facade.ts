import {SessionStorageProvider} from './session-storage.provider.js';

import type {SessionStorageProviderConfig} from './type.js';

/**
 * Factory function to create a new SessionStorageProvider.
 *
 * @param config - The provider configuration.
 * @returns An instance of SessionStorageProvider.
 *
 * @example
 * ```typescript
 * const formData = createSessionStorageProvider({ name: 'multi-step-form' });
 *
 * // Write new data
 * formData.write({ step: 2, answers: { q1: 'yes' } });
 *
 * // Read the current data
 * const current = formData.read();
 * console.log(current); // { step: 2, answers: { q1: 'yes' } }
 * ```
 */
export function createSessionStorageProvider<T>(config: SessionStorageProviderConfig<T>): SessionStorageProvider<T> {
  return new SessionStorageProvider<T>(config);
}
