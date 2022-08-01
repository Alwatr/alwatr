import {existsSync} from 'fs';

import {alwatrRegisteredList, createLogger} from '@alwatr/logger';

import {readJsonFile, writeJsonFile} from './util.js';

import type {DocumentObject, DocumentListStorage} from './type.js';
import type {AlwatrLogger} from '@alwatr/logger';

export * from './type.js';

alwatrRegisteredList.push({
  name: '@alwatr/storage',
  version: '{{ALWATR_VERSION}}',
});

/**
 * Elegant micro in-memory json-like storage with disk backed,
 * Fastest NoSQL Database written in tiny TypeScript ES module.
 *
 * @param {string} name Storage name like database table name.
 * @param {string} pathPrefix Saved file path prefix (default is `data`).
 *
 * Example:
 *
 * ```ts
 * import {AlwatrStorage, DocumentObject} from '@alwatr/storage';
 * interface User extends DocumentObject {...}
 * const db = new AlwatrStorage<User>('user-list');
 * await db.readyPromise
 * ```
 */
export class AlwatrStorage<DocumentType extends DocumentObject> {
  /**
   * Storage name like database table name.
   */
  readonly name: string;

  /**
   * Ready promise resolved when the storage is ready.
   * you can use this promise to wait for the storage to be loaded successfully and ready to use.
   *
   * Example:
   *
   * ```ts
   * const db = new AlwatrStorage<User>('user-list');
   * await db.readyPromise
   * const user = db.get('user-1');
   * ```
   */
  readonly readyPromise: Promise<void>;

  /**
   * Ready state set to true when the storage is ready and readyPromise resolved.
   */
  readyState = false;


  protected _logger: AlwatrLogger;
  protected _storage: DocumentListStorage<DocumentType> = {};
  protected _storagePath: string;

  constructor(name: string, pathPrefix = 'data') {
    this._logger = createLogger(`alwatr-storage:${name}`);
    this.name = name;
    this._storagePath = `${pathPrefix}/${name}.json`;
    this.readyPromise = this._init();
  }

  private async _init(): Promise<void> {
    this._logger.logMethod('_init');
    if (existsSync(this._storagePath)) {
      this._storage = await readJsonFile<DocumentListStorage<DocumentType>>(this._storagePath);
    } else {
      this._storage = {};
    }
    this.readyState = true;
    this._logger.logProperty('readyState', this.readyState);
  }

  /**
   * Get a document object by id.
   *
   * @param documentId The id of the document object.
   * @param fastInstance by default it will return a copy of the document.
   * if you set fastInstance to true, it will return the original document.
   * This is dangerous but much faster, you should use it only if you know what you are doing.
   *
   * Example:
   *
   * ```ts
   * const user = db.get('user-1');
   * ```
   */
  get(documentId: string, fastInstance?: boolean): DocumentType | null {
    this._logger.logMethodArgs('get', documentId);
    const documentObject = this._storage[documentId];
    if (documentObject == null) {
      return null;
    } else if (fastInstance) {
      return documentObject;
    } else {
      return JSON.parse(JSON.stringify(documentObject));
    }
  }

  /**
   * Insert/update a document object in the storage.
   *
   * @param documentObject The document object to insert/update contain `_id`.
   * @param fastInstance by default it will make a copy of the document before set.
   * if you set fastInstance to true, it will set the original document.
   * This is dangerous but much faster, you should use it only if you know what you are doing.
   *
   * Example:
   *
   * ```ts
   * db.set({
   *   _id: 'user-1',
   *   foo: 'bar',
   * });
   * ```
   */
  set(documentObject: DocumentType, fastInstance?: boolean): void {
    this._logger.logMethodArgs('set', documentObject._id);

    // update meta
    const oldData = this._storage[documentObject._id];
    documentObject._updatedAt = Date.now();
    documentObject._createdAt = oldData?._createdAt ?? documentObject._updatedAt;
    documentObject._createdBy = oldData?._createdBy ?? documentObject._updatedBy;
    documentObject._rev = (oldData?._rev ?? 0) + 1;

    if (fastInstance !== true) {
      documentObject = JSON.parse(JSON.stringify(documentObject));
    }

    this._storage._last = documentObject._id;
    this._storage[documentObject._id] = documentObject;
    this.save();
  }

  /**
   * Remove a document object from the storage.
   *
   * Example:
   *
   * ```ts
   * db.remove('user-1');
   * ```
   */
  remove(documentId: string): void {
    this._logger.logMethodArgs('remove', documentId);
    delete this._storage[documentId];
  }

  private _saveTimer?: NodeJS.Timeout | number;
  /**
   * Save the storage to disk.
   */
  save(): void {
    this._logger.logMethod('save.request');
    if (this._saveTimer != null) {
      return;
    }
    this._saveTimer = setTimeout(() => {
      this._logger.logMethod('save.action');
      clearTimeout(this._saveTimer);
      delete this._saveTimer;
      writeJsonFile(this._storagePath, this._storage);
    }, 100);
  }
}
