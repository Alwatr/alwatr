import {resolve} from 'node:path';

import {alwatrRegisteredList, createLogger} from '@alwatr/logger';

import {readJsonFile, writeJsonFile} from './util.js';

import type {DocumentObject, DocumentListStorage, AlwatrStorageConfig} from './type.js';
import type {AlwatrLogger} from '@alwatr/logger';

export {DocumentObject, DocumentListStorage, AlwatrStorageConfig as Config};

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
 * await userStorage.readyPromise
 * ```
 */
export class AlwatrStorage<DocumentType extends DocumentObject> {
  /**
   * Storage name like database table name.
   */
  readonly name: string;

  /**
   * Storage file full path.
   */
  readonly storagePath: string;

  /**
   * Ready promise resolved when the storage is ready.
   * you can use this promise to wait for the storage to be loaded successfully and ready to use.
   *
   * Example:
   *
   * ```ts
   * const db = new AlwatrStorage<User>({name: 'user-list', path: 'db'});
   * await userStorage.readyPromise
   * const user = userStorage.get('user-1');
   * ```
   */
  readyPromise: Promise<void>;

  /**
   * Ready state set to true when the storage is ready and readyPromise resolved.
   */
  get readyState(): boolean {
    return this._readyState;
  }

  protected _readyState = false;
  protected _logger: AlwatrLogger;
  protected _storage: DocumentListStorage<DocumentType> = {};
  protected _keys: Array<string> | null = null;

  /**
   * All document ids in array.
   */
  get keys(): Array<string> {
    if (this._readyState !== true) throw new Error('storage_not_ready');

    if (this._keys === null) {
      this._keys = Object.keys(this._storage);
    }
    return this._keys;
  }

  /**
   * Size of the storage.
   */
  get length(): number {
    return this.keys.length;
  }

  constructor(config: AlwatrStorageConfig) {
    this._logger = createLogger(`alwatr-storage:${config.name}`);
    this._logger.logMethodArgs('constructor', config);
    this.name = config.name;
    this.storagePath = resolve(`${config.path ?? './db'}/${config.name}.json`);
    this.readyPromise = this._load();
  }

  /**
   * Initial process like open/parse storage file.
   * readyState will be set to true and readPromise will be resolved when this process finished.
   */
  private async _load(): Promise<void> {
    this._logger.logMethod('_load');
    this._storage = (await readJsonFile<DocumentListStorage<DocumentType>>(this.storagePath)) ?? {};
    this._readyState = true;
    this._logger.logProperty('readyState', this.readyState);
  }

  /**
   * Check documentId exist in the storage or not.
   *
   * Example:
   *
   * ```ts
   * if(!useruserStorage.has('user-1')) throw new Error('user not found');
   * ```
   */
  has(documentId: string): boolean {
    if (this._readyState !== true) throw new Error('storage_not_ready');
    return this._storage[documentId] != null;
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
   * const user = userStorage.get('user-1');
   * ```
   */
  get(documentId: string, fastInstance?: boolean): DocumentType | null {
    // this._logger.logMethodArgs('get', documentId);
    if (this._readyState !== true) throw new Error('storage_not_ready');

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
   * userStorage.set({
   *   _id: 'user-1',
   *   foo: 'bar',
   * });
   * ```
   */
  set(documentObject: DocumentType, fastInstance?: boolean): void {
    this._logger.logMethodArgs('set', documentObject._id);
    if (this._readyState !== true) throw new Error('storage_not_ready');

    const oldData = this._storage[documentObject._id];
    if (oldData == null) this._keys = null; // Clear cached keys on new docId

    // update meta
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
   * userStorage.remove('user-1');
   * ```
   */
  remove(documentId: string): void {
    this._logger.logMethodArgs('remove', documentId);
    if (this._readyState !== true) throw new Error('storage_not_ready');

    delete this._storage[documentId];
  }

  /**
   * For each loop over all document objects.
   *
   * Example:
   *
   * ```ts
   * userStorage.forEach(async (user) => {
   *   await sendMessage(user._id, 'Happy new year!');
   *   user.sent = true; // direct change document!
   * });
   * userStorage.save();
   * ```
   */
  forEach(callbackfn: (documentObject: DocumentType) => void): void {
    this.keys.forEach((documentId) => {
      const documentObject = this._storage[documentId];
      if (documentObject != null) callbackfn(documentObject);
    });
  }

  private _saveTimer: NodeJS.Timeout | null = null;

  /**
   * Save the storage to disk.
   */
  save(): void {
    this._logger.logMethod('save.request');
    if (this._readyState !== true) throw new Error('storage_not_ready');

    if (this._saveTimer != null) return; // save already requested

    this._saveTimer = setTimeout(() => {
      this._logger.logMethod('save.action');
      this._saveTimer = null;
      // TODO: catch errors
      writeJsonFile(this.storagePath, this._storage);
    }, 100);
  }

  /**
   * Unload storage data and free ram usage.
   */
  unload(): void {
    this._logger.logMethod('unload');
    this._readyState = false;
    this._storage = {};
    this.readyPromise = Promise.reject(new Error('storage_unloaded'));
  }

  /**
   * Reload storage data.
   */
  reload(): void {
    this._logger.logMethod('reload');
    this._readyState = false;
    this.readyPromise = this._load();
  }
}
