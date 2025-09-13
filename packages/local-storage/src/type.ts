export interface LocalStorageProviderConfig<T> {
  /**
   * The unique name for the storage item.
   */
  name: string;

  /**
   * The data structure version.
   * starting from 1 and incrementing by 1 for each new version.
   */
  version: number;

  /**
   * The default value to use if no value is stored.
   */
  defaultValue: T;
}
