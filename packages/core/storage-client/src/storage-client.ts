import {fetch} from '@alwatr/fetch';
import {alwatrRegisteredList, createLogger} from '@alwatr/logger';

import type {DocumentObject, DataStorage, AlwatrStorageConfig, ServerResponse, StorageKeys} from './type.js';

export {DocumentObject, DataStorage, AlwatrStorageConfig as Config};

alwatrRegisteredList.push({
  name: '@alwatr/storage-client',
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
export class AlwatrStorageClient<DocumentType extends DocumentObject> {
  /**
   * Storage name like database table name.
   */
  readonly name;

  /**
   * Storage server URL.
   */
  readonly server;

  protected _logger;
  protected _token;

  constructor(config: AlwatrStorageConfig) {
    this._logger = createLogger(`alwatr-storage-client:${config.name}`, undefined, config.debug);
    this._logger.logMethodArgs('constructor', config);

    this.name = config.name;
    this.server = config.server;
    this._token = config.token;
  }

  /**
   * Get a document object by id.
   *
   * @param documentId The id of the document object.
   *
   * Example:
   *
   * ```ts
   * const user = await userStorage.get('user-1');
   * ```
   */
  async get(documentId: string): Promise<DocumentType | null> {
    const response = await fetch({
      url: this.server,
      queryParameters: {
        storage: this.name,
        id: documentId,
      },
      headers: {
        'Authorization': `Bearer ${this._token}`,
      },
    });

    let content: ServerResponse<DocumentType>;
    try {
      content = (await response.json()) as ServerResponse<DocumentType>;
    }
    catch {
      throw new Error('invalid_json');
    }

    if (content.ok) {
      return content.data;
    }
    else if (content.errorCode === 'document_not_found') {
      return null;
    }
    else {
      throw new Error('fetch_failed');
    }
  }

  /**
   * Insert/update a document object in the storage.
   *
   * @param documentObject The document object to insert/update contain `_id`.
   *
   * Example:
   *
   * ```ts
   * await userStorage.set({
   *   _id: 'user-1',
   *   foo: 'bar',
   * });
   * ```
   */
  async set(documentObject: DocumentType): Promise<DocumentType | null> {
    const response = await fetch({
      url: this.server,
      method: 'PATCH',
      queryParameters: {
        storage: this.name,
      },
      headers: {
        'Authorization': `Bearer ${this._token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(documentObject),
    });

    let content: ServerResponse<DocumentType>;
    try {
      content = (await response.json()) as ServerResponse<DocumentType>;
    }
    catch {
      throw new Error('invalid_json');
    }

    if (content.ok) {
      return content.data;
    }
    else {
      throw new Error('fetch_failed');
    }
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
  async delete(documentId: string): Promise<true | null> {
    const response = await fetch({
      url: this.server,
      method: 'DELETE',
      queryParameters: {
        storage: this.name,
        id: documentId,
      },
      headers: {
        'Authorization': `Bearer ${this._token}`,
      },
    });

    let content: ServerResponse<DocumentType>;
    try {
      content = (await response.json()) as ServerResponse<DocumentType>;
    }
    catch {
      throw new Error('invalid_json');
    }

    if (content.ok) {
      return content.ok;
    }
    else if (content.errorCode === 'document_not_found') {
      return null;
    }
    else {
      throw new Error('fetch_failed');
    }
  }

  /**
   * Get All a document object.
   *
   * Example:
   *
   * ```ts
   * const userList = await userStorage.getAll();
   * ```
   */
  async getAll(): Promise<DocumentType | null> {
    const response = await fetch({
      url: `${this.server}/all`,
      queryParameters: {
        storage: this.name,
      },
      headers: {
        'Authorization': `Bearer ${this._token}`,
      },
    });

    let content: ServerResponse<DocumentType>;
    try {
      content = (await response.json()) as ServerResponse<DocumentType>;
    }
    catch {
      throw new Error('invalid_json');
    }

    if (content.ok) {
      return content.data;
    }
    else {
      throw new Error('fetch_failed');
    }
  }

  /**
   * Get All a document keys.
   *
   * Example:
   *
   * ```ts
   * const keys = await userStorage.keys();
   * ```
   */
  async keys(): Promise<Array<string> | null> {
    const response = await fetch({
      url: `${this.server}/keys`,
      queryParameters: {
        storage: this.name,
      },
      headers: {
        'Authorization': `Bearer ${this._token}`,
      },
    });

    let content: ServerResponse<StorageKeys>;
    try {
      content = (await response.json()) as ServerResponse<StorageKeys>;
    }
    catch {
      this._logger.error('set', 'invalid_json', 'Parsing json failed');
      return null;
    }

    if (content.ok) {
      return content.data.keys;
    }
    else {
      throw new Error('fetch_failed');
    }
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
   * });
   * ```
   */
  async forAll(callbackfn: (documentObject: DocumentType) => void | false | Promise<void | false>): Promise<void> {
    const keys = await this.keys();
    if (keys == null) throw new Error('null_keys_list');

    for (const documentId of keys) {
      const documentObject = await this.get(documentId);
      if (documentObject != null) {
        const retVal = await callbackfn(documentObject);
        if (retVal === false) break;
      }
    }
  }
}
