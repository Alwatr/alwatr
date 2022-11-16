import {fetch} from '@alwatr/fetch';
import {alwatrRegisteredList, createLogger} from '@alwatr/logger';

import type {DocumentObject, DataStorage, AlwatrStorageConfig, ServerResponse} from './type.js';

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
   * Storage file full path.
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
      this._logger.error('set', 'invalid_json', 'Parsing json failed');
      return null;
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

    throw new Error('fetch_failed');
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
      this._logger.error('set', 'invalid_json', 'Parsing json failed');
      return null;
    }

    if (content.ok) {
      return content.data;
    }
    else {
      throw new Error('fetch_failed');
    }
  }

  async keys(): Promise<DocumentObject | null> {
    const response = await fetch({
      url: `${this.server}/keys`,
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
      this._logger.error('set', 'invalid_json', 'Parsing json failed');
      return null;
    }

    if (content.ok) {
      return content.data;
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
   *   user.sent = true; // direct change document (use with caution)!
   * });
   * ```
   */
  // async forAll(callbackfn: (documentObject: DocumentType) => void | false | Promise<void | false>): Promise<void> {
  // }
}
