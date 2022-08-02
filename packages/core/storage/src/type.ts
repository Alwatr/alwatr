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

export type DocumentListStorage<DocType extends DocumentObject> =
  Record<string, DocType | undefined> & {_last?: string};

export interface Config {
  /**
   * Storage name.
   */
  name: string,

  /**
   * Storage path.
   *
   * @default './db'
   */
  path?: string,
}
