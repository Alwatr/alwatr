import {fetch, FetchOptions} from '@alwatr/fetch';
import {alwatrRegisteredList, createLogger} from '@alwatr/logger';

import type {AlwatrStorageClientConfig} from './type.js';
import type {AlwatrDocumentObject, AlwatrServiceResponse} from '@alwatr/fetch';

export {AlwatrStorageClientConfig, AlwatrDocumentObject};

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
 * import type {AlwatrDocumentObject } from '@alwatr/storage-client';
 *
 * interface User extends AlwatrDocumentObject  {
 *   fname: string;
 *   lname: string;
 *   email: string;
 *   token?: string;
 * }
 *
 * const db = new AlwatrStorageClient<User>({
 *   name: 'user-list',
 *   host: 'http://127.0.0.1:80',
 *   token: 'YOUR_SECRET_TOKEN',
 *   timeout: 2_000,
 * });
 *
 * await db.set({
 *   id: 'alimd',
 *   fname: 'Ali',
 *   lname: 'Mihandoost',
 *   email: 'ali@mihandoost.com',
 * });
 *
 * await db.set({
 *   id: 'fmd',
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
export class AlwatrStorageClient<DocumentType extends AlwatrDocumentObject = AlwatrDocumentObject> {
  protected _logger = createLogger('alwatr-storage-client:' + this.config.name, undefined, this.config.debug);

  /**
   * Default fetch options.
   */
  fetchOption: FetchOptions = {
    url: 'http://' + this.config.host + ':' + this.config.port + '/',
    keepalive: true,
    timeout: this.config.timeout ?? 0,
    cacheStrategy: 'network_only',
    removeDuplicate: 'never',
    retry: 3,
    retryDelay: 300,
    token: this.config.token,
  };

  constructor(public readonly config: AlwatrStorageClientConfig) {
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
   * try {
   *   const user = await userStorage.get('user-1');
   *   console.dir(item);
   * }
   * catch (err) {
   *   if ((err as Error)?.message === 'document_not_found') {
   *     console.log('user_5000 id not found!');
   *   }
   *   else {
   *     console.err((err as Error)?.message ?? err);
   *   }
   * }
   * ```
   */
  async get<T extends DocumentType = DocumentType>(
      documentId: string,
      storage: string | undefined = this.config.name,
  ): Promise<T> {
    this._logger.logMethodArgs('get', {documentId});

    if (storage == null) throw new Error('storage_not_defined');

    const response = await fetch({
      ...this.fetchOption,
      queryParameters: {
        storage,
        id: documentId,
      },
    });

    let content: AlwatrServiceResponse<T>;
    try {
      content = await response.json();
    }
    catch {
      throw new Error('invalid_json');
    }

    if (content.ok === true && typeof content.data.id === 'string') {
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
   * const userExist = await userStorage.has('user-1');
   * if (!userExist) console.log('user_not_found');
   * ```
   */
  async has(documentId: string): Promise<boolean> {
    this._logger.logMethodArgs('has', {documentId});

    const response = await fetch({
      ...this.fetchOption,
      url: this.fetchOption.url + 'has',
      queryParameters: {
        storage: this.config.name,
        id: documentId,
      },
    });

    let content: AlwatrServiceResponse<{has: boolean}>;
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
   * @param documentObject The document object to insert/update contain `id`.
   *
   * Example:
   *
   * ```ts
   * await userStorage.set({
   *   id: 'user-1',
   *   foo: 'bar',
   * });
   * ```
   */
  async set(documentObject: DocumentType): Promise<DocumentType> {
    this._logger.logMethodArgs('set', {documentId: documentObject.id});

    const response = await fetch({
      ...this.fetchOption,
      method: 'PATCH',
      queryParameters: {
        storage: this.config.name,
      },
      bodyJson: documentObject,
    });

    let content: AlwatrServiceResponse<DocumentType>;
    try {
      content = await response.json();
    }
    catch {
      throw new Error('invalid_json');
    }

    if (content.ok && typeof content.data.id === 'string') {
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
    this._logger.logMethodArgs('delete', {documentId});

    const response = await fetch({
      ...this.fetchOption,
      method: 'DELETE',
      queryParameters: {
        storage: this.config.name,
        id: documentId,
      },
    });

    let content: AlwatrServiceResponse<Record<string, never>>;
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
    this._logger.logMethod('getAll');

    const response = await fetch({
      ...this.fetchOption,
      url: this.fetchOption.url + 'all',
      queryParameters: {
        storage: this.config.name,
      },
    });

    let content: AlwatrServiceResponse<Record<string, DocumentType>>;
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
    this._logger.logMethod('keys');

    const response = await fetch({
      ...this.fetchOption,
      url: this.fetchOption.url + 'keys',
      queryParameters: {
        storage: this.config.name,
      },
    });

    let content: AlwatrServiceResponse<{keys: Array<string>}>;
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
