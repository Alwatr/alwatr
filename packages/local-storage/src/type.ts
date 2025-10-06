import type {} from '@alwatr/nano-build';
import type {} from '@alwatr/type-helper';

/**
 * Configuration options for a local storage provider.
 */
export interface LocalStorageProviderConfig {
  /**
   * The unique name for the storage item.
   */
  name: string;

  /**
   * The version of the data structure.
   * Start from 1 for production, 0 for development mode, and increment by 1 for each new data schema change.
   */
  schemaVersion: number;
}
