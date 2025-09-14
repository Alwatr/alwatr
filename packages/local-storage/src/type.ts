import type {} from '@alwatr/nano-build';
import type {} from '@alwatr/type-helper';

export interface StorageMeta {
  /**
   * The unique name for the storage item.
   */
  name: string;

  /**
   * The data structure version.
   * starting from 1 and incrementing by 1 for each new version.
   */
  version: number;
}

export interface LocalStorageProviderConfig<T> extends StorageMeta {
  /**
   * The default value to use if no value is stored.
   */
  defaultValue: T;
}
