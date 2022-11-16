import {fetch} from '@alwatr/fetch';
import {alwatrRegisteredList, createLogger} from '@alwatr/logger';

import type {AlwatrStorageClientConfig, ServerResponse} from './type.js';
import type {DocumentObject} from '@alwatr/storage-engine';

export {DocumentObject, AlwatrStorageClientConfig as AlwatrStorageConfig};

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
  protected _logger = createLogger(`alwatr-storage-client:${this.config.name}`, undefined, this.config.debug);

  constructor(public readonly config: AlwatrStorageClientConfig) {
    if (config.host[config.host.length - 1] === '/') {
      config.host = config.host.substring(0, config.host.length - 1);
    }
    this._logger.logMethodArgs('constructor', config);
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
      url: this.config.host,
      queryParameters: {
        storage: this.config.name,
        id: documentId,
      },
      headers: {
        'Authorization': `Bearer ${this.config.token}`,
      },
      timeout: this.config.timeout,
    });

    let content: ServerResponse<DocumentType>;
    try {
      content = await response.json();
    }
    catch {
      throw new Error('invalid_json');
    }

    if (content.ok === true && typeof content.data._id === 'string') {
      return content.data;
    }
    else if (content.ok === false && content.errorCode === 'document_not_found') {
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
      url: this.config.host,
      method: 'PATCH',
      queryParameters: {
        storage: this.config.name,
      },
      headers: {
        'Authorization': `Bearer ${this.config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(documentObject),
      timeout: this.config.timeout,
    });

    let content: ServerResponse<DocumentType>;
    try {
      content = await response.json();
    }
    catch {
      throw new Error('invalid_json');
    }

    if (content.ok && typeof content.data._id === 'string') {
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
   * await userStorage.delete('user-1');
   * ```
   */
  async delete(documentId: string): Promise<void> {
    const response = await fetch({
      url: this.config.host,
      method: 'DELETE',
      queryParameters: {
        storage: this.config.name,
        id: documentId,
      },
      headers: {
        'Authorization': `Bearer ${this.config.token}`,
      },
      timeout: this.config.timeout,
    });

    let content: ServerResponse<Record<string, never>>;
    try {
      content = await response.json();
    }
    catch {
      throw new Error('invalid_json');
    }

    if (content.ok) {
      return;
    }
    else if (content.errorCode === 'document_not_found') {
      throw new Error('document_not_found');
    }
    else {
      throw new Error('fetch_failed');
    }
  }

  /**
   * Dump all storage data.
   *
   * Example:
   *
   * ```ts
   * const userStorage = await userStorage.getAll();
   * ```
   */
  async getAll(): Promise<Record<string, DocumentType>> {
    const response = await fetch({
      url: this.config.host + '/all',
      queryParameters: {
        storage: this.config.name,
      },
      headers: {
        'Authorization': `Bearer ${this.config.token}`,
      },
      timeout: this.config.timeout,
    });

    let content: ServerResponse<Record<string, DocumentType>>;
    try {
      content = await response.json();
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
   * Get all documents keys.
   *
   * Example:
   *
   * ```ts
   * const userIdArray = await userStorage.keys();
   * ```
   */
  async keys(): Promise<Array<string>> {
    const response = await fetch({
      url: this.config.host + 'keys',
      queryParameters: {
        storage: this.config.name,
      },
      headers: {
        'Authorization': `Bearer ${this.config.token}`,
      },
      timeout: this.config.timeout,
    });

    let content: ServerResponse<{keys: Array<string>}>;
    try {
      content = await response.json();
    }
    catch {
      throw new Error('invalid_json');
    }

    if (content.ok && Array.isArray(content.data?.keys)) {
      return content.data.keys;
    }
    else {
      throw new Error('fetch_failed');
    }
  }
}
