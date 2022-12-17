import type {AlwatrDocumentObject, AlwatrServiceResponseSuccessWithMeta} from '@alwatr/fetch/type.js';

export {AlwatrDocumentObject};

export type StorageMeta = {
  formatVersion: number;
  reversion: number;
  lastUpdated: number;
  lastAutoId: number;
};

export type DataStorage<T extends AlwatrDocumentObject> = Readonly<
  Omit<AlwatrServiceResponseSuccessWithMeta<Record<string, T | undefined>, StorageMeta>, 'statusCode' | 'errorCode'>
>;

export type AlwatrStorageEngineConfig = {
  /**
   * Storage name.
   */
  name: string;

  /**
   * Storage path.
   *
   * @default './db'
   */
  path?: string;

  /**
   * Save debounce timeout for minimal disk iops usage.
   *
   * @default 1000
   */
  saveDebounce?: number;

  /**
   * Write pretty formatted JSON file.
   *
   * @default false
   */
  saveBeautiful?: boolean;

  /**
   * Debug output logs
   *
   * @default undefined Auto detect base on `NODE_ENV`
   */
  debug?: boolean;
};

export type AlwatrStorageEngineProviderConfig = {
  /**
   * Default storage path. you can override it in get config params.
   *
   * @default './db'
   */
  path?: string;

  /**
   * Save debounce timeout for minimal disk iops usage.
   *
   * @default 100
   */
  saveDebounce?: number;

  /**
   * Write pretty formatted JSON file.
   *
   * @default false
   */
  saveBeautiful?: boolean;

  /**
   * Debug output logs
   *
   * @default undefined Auto detect base in NODE_ENV
   */
  debug?: boolean;
};
