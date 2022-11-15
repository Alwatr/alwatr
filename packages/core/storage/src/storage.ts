import {resolve} from 'node:path';

import {alwatrRegisteredList, createLogger} from '@alwatr/logger';
import exitHook from 'exit-hook';

import {readJsonFile, writeJsonFile} from './util.js';

import type {DocumentObject, DataStorage, AlwatrStorageConfig} from './type.js';

export {DocumentObject, DataStorage, AlwatrStorageConfig as Config};

alwatrRegisteredList.push({
  name: '@alwatr/storage',
  version: '{{ALWATR_VERSION}}',
});

/**
 * Elegant micro in-memory json-like storage with disk backed,
 * Fastest NoSQL Database written in tiny TypeScript ES module.
 *
 * Example:
 *
 * ```ts
 * import {AlwatrStorage} from '@alwatr/storage';
 *
 * import type {DocumentObject} from '@alwatr/storage';
 *
 * interface User extends DocumentObject {
 *   fname: string;
 *   lname: string;
 *   email: string;
 *   token?: string;
 * }
 *
 * const db = new AlwatrStorage<User>({
 *   name: 'user-list',
 *   path: 'db',
 *   saveBeautiful: true,
 *   debug: true,
 * });
 *
 * console.log('db loaded and ready to access.');
 *
 * let ali = db.get('alimd');
 *
 * if (ali == null) {
 *   console.log('ali not found');
 *   ali = {
 *     _id: 'alimd',
 *     _updatedBy: 'demo',
 *     fname: 'Ali',
 *     lname: 'Mihandoost',
 *     email: 'ali@mihandoost.com',
 *   };
 * }
 * else {
 *   console.log('ali found: %o', ali);
 *   ali.token = Math.random().toString(36).substring(2, 15);
 * }
 *
 * db.set(ali);
 *
 * db.set({
 *   _id: 'fmd',
 *   _updatedBy: 'demo',
 *   fname: 'Fatemeh',
 *   lname: 'Mihandoost',
 *   email: 'Fatemeh@mihandoost.com',
 *   token: Math.random().toString(36).substring(2, 15),
 * });
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
  protected _storage: DataStorage<DocumentType>;
  protected _keys: Array<string> | null = null;

  /**
   * All document ids in array.
   */
  get keys(): Array<string> {
    if (this._keys === null) {
      this._keys = Object.keys(this._storage.data);
    }
    return this._keys;
  }

  /**
   * Size of the storage.
   */
  get length(): number {
    return this.keys.length;
  }

  get _data(): typeof this._storage.data {
    return this._storage.data;
  }

  protected get _newStorage(): DataStorage<DocumentType> {
    return {ok: true, data: {}};
  }

  constructor(config: AlwatrStorageConfig) {
    this._logger = createLogger(`alwatr-storage:${config.name}`, undefined, config.debug);
    this._logger.logMethodArgs('constructor', config);
    this.forceSave = this.forceSave.bind(this);

    this.name = config.name;
    this.storagePath = resolve(`${config.path ?? './db'}/${config.name}.json`);
    this.saveDebounce = config.saveDebounce ?? 1000;
    this.saveBeautiful = config.saveBeautiful || false;

    exitHook(this.forceSave);
    this._storage = this.load();
  }

  /**
   * load storage file.
   */
  protected load(): DataStorage<DocumentType> {
    this._logger.logMethodArgs('load', {name: this.name, path: this.storagePath});

    const storage = readJsonFile<DataStorage<DocumentType>>(this.storagePath);

    if (storage === null) {
      this._logger.incident('load', 'file_not_found', 'Storage path not found, empty storage loaded', {
        path: this.storagePath,
      });
      return this._newStorage;
    }

    if (storage.ok !== true) {
      throw new Error('invalid_data');
    }

    return storage;
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
    return this._storage.data[documentId] != null;
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
    this._logger.logMethodArgs('get', documentId);

    const documentObject = this._storage.data[documentId];
    if (typeof documentObject === 'string') {
      return this.get(documentObject);
    }
    else if (documentObject == null) {
      return null;
    }
    else if (fastInstance) {
      return documentObject;
    }
    else {
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

    const oldData = this._storage.data[documentObject._id];
    if (oldData == null) this._keys = null; // Clear cached keys

    if (fastInstance !== true) {
      documentObject = JSON.parse(JSON.stringify(documentObject));
    }

    // update meta
    documentObject._updatedAt = Date.now();
    documentObject._createdAt = oldData?._createdAt ?? documentObject._updatedAt;
    documentObject._createdBy = oldData?._createdBy ?? documentObject._updatedBy;
    documentObject._rev = (oldData?._rev ?? 0) + 1;

    this._storage.data[documentObject._id] = documentObject;

    this.save();
    return documentObject;
  }

  /**
   * Delete a document object from the storage.
   *
   * Example:
   *
   * ```ts
   * userStorage.delete('user-1');
   * ```
   */
  delete(documentId: string): boolean {
    this._logger.logMethodArgs('delete', documentId);

    if (this._storage.data[documentId] == null) {
      return false;
    }
    // else
    delete this._storage.data[documentId];

    // Clear cached keys
    this._keys = null;

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
   * Unload storage data and free ram usage (auto saved before unload).
   *
   * Example:
   *
   * ```ts
   * userStorage.unload();
   * delete userStorage;
   * ```
   */
  unload(): void {
    this._logger.logMethod('unload');
    this.forceSave();
    this._keys = null;
    this._storage = this._newStorage;
  }
}
