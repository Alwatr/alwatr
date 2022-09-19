export type JSON = Record<string, unknown>;

export interface DocumentObject {
  [key: string]: unknown;
  _id: string;
  _rev?: number;
  _createdAt?: number;
  _createdBy?: string;
  _updatedAt?: number;
  _updatedBy: string;
}

export type DocumentListStorage<DocType extends DocumentObject> = Record<string, DocType | undefined> & {
  _last?: string;
};

export type AlwatrStorageConfig = {
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

export type AlwatrStorageProviderConfig = {
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
