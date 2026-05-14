/**
 * Configuration options for a session storage provider.
 */
export interface SessionStorageProviderConfig<T = unknown> {
  /**
   * The unique name for the storage item.
   */
  name: string;

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
