/**
 * Configuration options for a local storage provider.
 */
export interface LocalStorageProviderConfig<T = unknown> {
  /**
   * The unique name for the storage item.
   */
  name: string;

  /**
   * The version of the data structure.
   * Start from 1 for production, 0 for development mode, and increment by 1 for each new data schema change.
   */
  schemaVersion: number;

  /**
   * Custom parser function for deserializing the stored string.
   * Useful for specialized data types like Maps, Sets, or Dates.
   * Defaults to `JSON.parse`.
   */
  parse?: (value: string) => T;

  /**
   * Custom stringifier function for serializing the value.
   * Useful for specialized data types like Maps, Sets, or Dates.
   * Defaults to `JSON.stringify`.
   */
  stringify?: (value: T) => string;
}
