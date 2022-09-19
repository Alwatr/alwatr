import {resolve} from 'node:path';

import {alwatrRegisteredList, createLogger} from '@alwatr/logger';
import exitHook from 'exit-hook';

import {readJsonFile, writeJsonFile} from './util.js';

import type {DocumentObject, DocumentListStorage, AlwatrStorageConfig} from './type';

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
 * ```
 */
export class AlwatrStorage<DocumentType extends DocumentObject> {
  /**
   * Storage name like database table name.
   */
  readonly name;

  /**
   * Storage file full path.
   */
  readonly storagePath;

  /**
   * Save debounce timeout for minimal disk iops usage.
   */
  readonly saveDebounce;

  /**
   * Write pretty formatted JSON file.
   */
  readonly saveBeautiful;


  /**
   * The storage has unsaved changes that have not yet been saved.
   */
  hasUnsavedChanges = false;

  protected _logger;
  protected _storage: DocumentListStorage<DocumentType> = {};
  protected _keys: Array<string> | null = null;

  /**
   * All document ids in array.
   *
   * Contain `_latest`!
   */
  get keys(): Array<string> {
    if (this._keys === null) {
      this._keys = Object.keys(this._storage);
    }
    return this._keys;
  }

  /**
   * Size of the storage (count `_latest`).
   */
  get length(): number {
    return this.keys.length;
  }

  constructor(config: AlwatrStorageConfig) {
    this._logger = createLogger(`alwatr-storage:${config.name}`, undefined, config.debug);
    this._logger.logMethodArgs('constructor', config);
    this.forceSave = this.forceSave.bind(this);

    this.name = config.name;
    this.storagePath = resolve(`${config.path ?? './db'}/${config.name}.json`);
    this.saveDebounce = config.saveDebounce ?? 100;
    this.saveBeautiful = config.saveBeautiful || false;

    exitHook(this.forceSave);
    this.load();
  }

  /**
   * Load process like open/parse storage file.
   */
  private load(): void {
    this._logger.logMethodArgs('load', {path: this.storagePath});
    this._storage = readJsonFile<DocumentListStorage<DocumentType>>(this.storagePath) ?? {};
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

    const documentObject = this._storage[documentId];
    if (typeof documentObject === 'string') { // for example _latest
      return this.get(documentObject);
    } else if (documentObject == null) {
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
  set(documentObject: DocumentType, fastInstance?: boolean): DocumentType {
    this._logger.logMethodArgs('set', documentObject._id);

    const oldData = this._storage[documentObject._id];
    if (oldData == null) this._keys = null; // Clear cached keys on new docId

    if (fastInstance !== true) {
      documentObject = JSON.parse(JSON.stringify(documentObject));
    }

    // update meta
    documentObject._updatedAt = Date.now();
    documentObject._createdAt = oldData?._createdAt ?? documentObject._updatedAt;
    documentObject._createdBy = oldData?._createdBy ?? documentObject._updatedBy;
    documentObject._rev = (oldData?._rev ?? 0) + 1;

    this._storage._last = documentObject._id;
    this._storage[documentObject._id] = documentObject;

    this.save();
    return documentObject;
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
  remove(documentId: string): boolean {
    this._logger.logMethodArgs('remove', documentId);

    if (this._storage[documentId] == null) {
      return false;
    }
    // else
    delete this._storage[documentId];
    this.save();
    return true;
  }

  /**
   * Loop over all document objects asynchronous.
   *
   * You can return false in callbackfn to break the loop.
   *
   * Example:
   *
   * ```ts
   * await userStorage.forAll(async (user) => {
   *   await sendMessage(user._id, 'Happy new year!');
   *   user.sent = true; // direct change document (use with caution)!
   * });
   * ```
   */
  async forAll(callbackfn: (documentObject: DocumentType) => void | false | Promise<void | false>): Promise<void> {
    const keys = this.keys;
    for (const documentId of keys) {
      if (documentId === '_latest') continue; // prevent to duplicate latest key.
      const documentObject = this.get(documentId);
      if (documentObject != null) {
        const retVal = await callbackfn(documentObject);
        if (retVal === false) break;
      }
    }
    this.save();
  }

  private _saveTimer: NodeJS.Timeout | null = null;

  /**
   * Save the storage to disk.
   */
  save(): void {
    this._logger.logMethod('save');
    if (this._saveTimer != null) return; // save already requested
    this.hasUnsavedChanges = true;
    this._saveTimer = setTimeout(this.forceSave, this.saveDebounce);
  }

  /**
   * Save the storage to disk without any debounce.
   */
  forceSave(): void {
    this._logger.logMethodArgs('forceSave', {hasUnsavedChanges: this.hasUnsavedChanges});

    if (this._saveTimer != null) {
      clearTimeout(this._saveTimer);
      this._saveTimer = null;
    }

    if (this.hasUnsavedChanges) {
      writeJsonFile(this.storagePath, this._storage, this.saveBeautiful ? 2 : 0);
      this.hasUnsavedChanges = false;
    }
  }

  /**
   * Unload storage data and free ram usage.
   */
  unload(): void {
    this._logger.logMethod('unload');
    if (this.hasUnsavedChanges) {
      this.forceSave();
    }
    this._storage = {};
  }
}
