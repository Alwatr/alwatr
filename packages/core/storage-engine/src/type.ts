export type JSON = Record<string, unknown>;

export interface DocumentObject {
  [key: string]: unknown;
  /**
   * Document uniq ID or `auto_increment`.
   */
  _id: string;
  _rev?: number;
  _createdAt?: number;
  _createdBy?: string;
  _updatedAt?: number;
  _updatedBy: string;
}

export type DataStorage<T extends DocumentObject> = {
  ok: true;
  meta?: {
    formatVersion: number;
    reversion: number;
    lastUpdatedAt: number;
    lastUpdatedId: string;
    lastCreatedId: string;
  };
  data: Record<string, T | undefined>;
}

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
