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
 * Elegant micro client for storage server written in tiny TypeScript ES module.
 *
 * Example:
 *
 * ```ts
 * import {AlwatrStorageClient} from '@alwatr/storage-client';
 * import type {DocumentObject} from '@alwatr/storage-client';
 *
 * interface User extends DocumentObject {
 *   fname: string;
 *   lname: string;
 *   email: string;
 *   token?: string;
 * }
 *
 * const db = new AlwatrStorageClient<User>({
 *   name: 'user-list',
 *   host: 'http://127.0.0.1:80',
 *   token: 'alwatr_110_313',
 *   timeout: 2_000,
 * });
 *
 * await db.set({
 *   _id: 'alimd',
 *   _updatedBy: 'demo',
 *   fname: 'Ali',
 *   lname: 'Mihandoost',
 *   email: 'ali@mihandoost.com',
 * });
 *
 * await db.set({
 *   _id: 'fmd',
 *   _updatedBy: 'demo',
 *   fname: 'Fatemeh',
 *   lname: 'Mihandoost',
 *   email: 'Fatemeh@mihandoost.com',
 *   token: Math.random().toString(36).substring(2, 15),
 * });
 *
 * console.log('has \'alimd\': %o', await db.has('alimd'));
 * console.log('keys: %o', await db.keys());
 * console.log('getAll: %o', await db.getAll());
 * console.log('delete: %o', await db.delete('alimd'));
 * try {
 *   await db.delete('abcd');
 * }
 * catch (err) {
 *   console.log('delete 404: %o', (err as Error).message);
 * }
 */
export class AlwatrStorageClient<DocumentType extends DocumentObject> {
  protected _logger = createLogger('alwatr-storage-client:' + this.config.name, undefined, this.config.debug);

  constructor(public readonly config: AlwatrStorageClientConfig) {
    // add / at end of URL
    if (!(config.host[config.host.length - 1] === '/')) {
      config.host += '/';
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
  async get(documentId: string): Promise<DocumentType> {
    const response = await fetch({
      url: this.config.host,
      queryParameters: {
        storage: this.config.name,
        id: documentId,
      },
      headers: {
        Authorization: `Bearer ${this.config.token}`,
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
      throw new Error('document_not_found');
    }
    else {
      throw new Error('fetch_failed');
    }
  }

  /**
   * Check document exists by id.
   *
   * @param documentId The id of the document object.
   *
   * Example:
   *
   * ```ts
   * const isUserExists = await userStorage.has('user-1');
   * if (!isUserExists) console.log('user_not_found');
   * ```
   */
  async has(documentId: string): Promise<boolean> {
    const response = await fetch({
      url: this.config.host + 'has',
      queryParameters: {
        storage: this.config.name,
        id: documentId,
      },
      headers: {
        Authorization: `Bearer ${this.config.token}`,
      },
      timeout: this.config.timeout,
    });

    let content: ServerResponse<{has: boolean}>;
    try {
      content = await response.json();
    }
    catch {
      throw new Error('invalid_json');
    }

    if (content.ok === true && typeof content.data.has === 'boolean') {
      return content.data.has;
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
  async set(documentObject: DocumentType): Promise<DocumentType> {
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
        Authorization: `Bearer ${this.config.token}`,
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
      url: this.config.host + 'all',
      queryParameters: {
        storage: this.config.name,
      },
      headers: {
        Authorization: `Bearer ${this.config.token}`,
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
        Authorization: `Bearer ${this.config.token}`,
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
