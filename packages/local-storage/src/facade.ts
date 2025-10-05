import {LocalStorageProvider} from './local-storage.provider.js';

import type {LocalStorageProviderConfig} from './type.js';

/**
 * Factory function to create a new LocalStorageProvider.
 *
 * @param config - The configuration for the provider.
 * @returns An instance of LocalStorageProvider.
 *
 * @example
 * ```typescript
 * const userSettings = createLocalStorageProvider({
 *   name: 'user-settings',
 *   schemaVersion: 1,
 *   defaultValue: { theme: 'light', notifications: true }
 * });
 *
 * // Write new settings
 * userSettings.write({ theme: 'dark', notifications: false });
 *
 * // Read the current settings
 * const currentSettings = userSettings.read();
 * console.log(currentSettings); // { theme: 'dark', notifications: false }
 * ```
 */
export function createLocalStorageProvider<T extends JsonValue>(config: LocalStorageProviderConfig): LocalStorageProvider<T> {
  return new LocalStorageProvider<T>(config);
}
