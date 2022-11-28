import {resolve} from 'node:path';

import {alwatrRegisteredList, createLogger} from '@alwatr/logger';
import exitHook from 'exit-hook';

import {readJsonFile, writeJsonFile} from './util.js';

import type {DataStorage, AlwatrStorageEngineConfig, AlwatrDocumentObject} from './type.js';

export {DataStorage, AlwatrStorageEngineConfig};

alwatrRegisteredList.push({
  name: '@alwatr/storage-engine',
  version: '{{ALWATR_VERSION}}',
});

/**
 * Elegant micro in-memory json-like storage with disk backed,
 * Fastest NoSQL Database written in tiny TypeScript ES module.
 *
 * Example:
 *
 * ```ts
 * import {AlwatrStorageEngine} from '@alwatr/storage-engine';
 *
 * import type {AlwatrDocumentObject} from '@alwatr/fetch';
 *
 * interface User extends AlwatrDocumentObject {
 *   fname: string;
 *   lname: string;
 *   email: string;
 *   token?: string;
 * }
 *
 * const db = new AlwatrStorageEngine<User>({
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
 *     id: 'alimd',
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
 *   id: 'fmd',
 *   fname: 'Fatemeh',
 *   lname: 'Mihandoost',
 *   email: 'Fatemeh@mihandoost.com',
 *   token: Math.random().toString(36).substring(2, 15),
 * });
 * ```
 */
export class AlwatrStorageEngine<DocumentType extends AlwatrDocumentObject> {
  static readonly formatVersion = 4;

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
   * The storage has unsaved changes that have not yet saved.
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

  /**
   * Get all data.
   */
  get _data(): typeof this._storage.data {
    return this._storage.data;
  }

  /**
   * Get storage meta.
   */
  get meta(): typeof this._storage.meta {
    return this._storage.meta;
  }

  /**
   * Get next auto increment id for numerical document id.
   */
  nextAutoIncrementId(): string {
    this._storage.meta.lastAutoId;
    do {
      this._storage.meta.lastAutoId++;
    } while (this._storage.data[this._storage.meta.lastAutoId.toString()] != null);
    return this._storage.meta.lastAutoId.toString();
  }

  protected get _newStorage(): DataStorage<DocumentType> {
    return {
      ok: true,
      meta: {
        formatVersion: AlwatrStorageEngine.formatVersion,
        reversion: 0,
        lastUpdated: Date.now(),
        lastAutoId: -1,
      },
      data: {},
    };
  }

  constructor(config: AlwatrStorageEngineConfig) {
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
   * @param documentObject The document object to insert/update contain `id`.
   * @param fastInstance by default it will make a copy of the document before set.
   * if you set fastInstance to true, it will set the original document.
   * This is dangerous but much faster, you should use it only if you know what you are doing.
   *
   * Example:
   *
   * ```ts
   * userStorage.set({
   *   id: 'user-1',
   *   foo: 'bar',
   * });
   * ```
   */
  set(documentObject: DocumentType, fastInstance?: boolean): DocumentType {
    this._logger.logMethodArgs('set', documentObject.id);

    if (fastInstance !== true) {
      documentObject = JSON.parse(JSON.stringify(documentObject));
    }

    if (documentObject.id === 'auto_increment') {
      documentObject.id = this.nextAutoIncrementId();
    }

    const oldData = this._storage.data[documentObject.id];

    if (oldData == null) {
      this._keys = null; // Clear cached keys
    }

    // update meta
    documentObject.meta ??= {
      rev: 0,
      updated: 0,
      created: 0,
    };
    documentObject.meta.updated = Date.now();
    documentObject.meta.created = oldData?.meta?.created ?? documentObject.meta.updated;
    documentObject.meta.rev = (oldData?.meta?.rev ?? 0) + 1;

    this._storage.meta.lastUpdated = documentObject.meta.updated;

    this._storage.data[documentObject.id] = documentObject;

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
   * Loop over all document objects.
   *
   * Example:
   *
   * ```ts
   * for(const user of userStorage.allObject()) {
   *   await sendMessage(user.id, 'Happy new year!');
   *   user.sent = true; // direct change document (use with caution)!
   * }
   * ```
   */
  * allObject(): Generator<DocumentType, void, void> {
    for (const documentId of this.keys) {
      const documentObject = this.get(documentId);
      if (documentObject != null) yield documentObject;
    }
    this.save();
  }

  private _saveTimer: NodeJS.Timeout | null = null;

  /**
   * Save the storage to disk.
   */
  save(): void {
    this._logger.logMethod('save');
    this._storage.meta.reversion++;
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
