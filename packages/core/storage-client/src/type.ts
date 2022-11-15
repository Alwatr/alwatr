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

export type DataStorage<T extends DocumentObject> = {
  ok: true;
  data: Record<string, T | undefined>;
}

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
  server?: string;

  /**
   * Debug output logs
   *
   * @default undefined Auto detect base on `NODE_ENV`
   */
  debug?: boolean;
};

type ServerResponseFailed<T> = {
  ok: false;
  statusCode: number;
  errorCode: string;
  data?: T;
}

type ServerResponseSuccess<T> = {
  ok: true;
  statusCode?: number;
  data: T;
}

export type ServerResponse<T extends Record<string, unknown>> = ServerResponseSuccess<T> | ServerResponseFailed<T>;
