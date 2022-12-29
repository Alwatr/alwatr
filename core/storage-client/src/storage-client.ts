import {serviceRequest} from '@alwatr/fetch';
import {createLogger} from '@alwatr/logger';
import {AlwatrDocumentObject, AlwatrDocumentStorage, alwatrRegisteredList} from '@alwatr/type';

import type {AlwatrStorageClientConfig} from './type.js';
import type {FetchOptions} from '@alwatr/fetch';

export {AlwatrStorageClientConfig};

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
 * console.log('getStorage: %o', await db.getStorage());
 * console.log('delete: %o', await db.delete('alimd'));
 * try {
 *   await db.delete('abcd');
 * }
 * catch (err) {
 *   console.log('delete 404: %o', (err as Error).message);
 * }
 */
export class AlwatrStorageClient<DocumentType extends AlwatrDocumentObject = AlwatrDocumentObject> {
  protected _logger = createLogger(
      'alwatr-storage-client' + (this.config.name == null ? '' : ':' + this.config.name),
      undefined,
      this.config.debug,
  );

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
    retryDelay: 500,
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
   *     console.error((err as Error)?.message || err);
   *   }
   * }
   * ```
   */
  async get<T extends DocumentType = DocumentType>(
      documentId: string,
      storage: string | undefined = this.config.name,
  ): Promise<T> {
    this._logger.logMethodArgs('get', {storage, documentId});
    if (storage == null) throw new Error('storage_not_defined');

    const responseJson = await serviceRequest<T>({
      ...this.fetchOption,
      queryParameters: {
        storage,
        id: documentId,
      },
    });

    if (typeof responseJson.data !== 'object' || typeof responseJson.data.id !== 'string') {
      this._logger.error('get', 'invalid_response_data', {responseJson});
      throw new Error('invalid_response_data');
    }

    return responseJson.data;
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
  async has(documentId: string, storage: string | undefined = this.config.name): Promise<boolean> {
    this._logger.logMethodArgs('has', {storage, documentId});
    if (storage == null) throw new Error('storage_not_defined');

    const responseJson = await serviceRequest<{has: boolean | unknown}>({
      ...this.fetchOption,
      url: this.fetchOption.url + 'has',
      queryParameters: {
        storage,
        id: documentId,
      },
    });

    const has = responseJson.data?.has;

    if (typeof has !== 'boolean') {
      this._logger.error('has', 'invalid_response_data', {responseJson});
      throw new Error('invalid_response_data');
    }

    return has;
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
  async set<T extends DocumentType = DocumentType>(
      documentObject: T,
      storage: string | undefined = this.config.name,
  ): Promise<T> {
    this._logger.logMethodArgs('set', {documentId: documentObject.id});
    if (storage == null) throw new Error('storage_not_defined');

    const responseJson = await serviceRequest<T>({
      ...this.fetchOption,
      method: 'PATCH',
      queryParameters: {
        storage,
      },
      bodyJson: documentObject,
    });

    if (typeof responseJson.data?.id !== 'string') {
      this._logger.error('set', 'invalid_response_data', {responseJson});
      throw new Error('invalid_response_data');
    }

    return responseJson.data;
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
  async delete(documentId: string, storage: string | undefined = this.config.name): Promise<void> {
    this._logger.logMethodArgs('delete', {storage, documentId});
    if (storage == null) throw new Error('storage_not_defined');

    await serviceRequest({
      ...this.fetchOption,
      method: 'DELETE',
      queryParameters: {
        storage,
        id: documentId,
      },
    });
  }

  /**
   * Dump all storage.
   *
   * Example:
   *
   * ```ts
   * const userStorage = await userStorage.getStorage();
   * ```
   */
  async getStorage<T extends DocumentType = DocumentType>(
      name: string | undefined = this.config.name,
  ): Promise<AlwatrDocumentStorage<T>> {
    this._logger.logMethod('getStorage');
    if (name == null) throw new Error('storage_not_defined');

    const responseJson = (await serviceRequest({
      ...this.fetchOption,
      url: this.fetchOption.url + 'storage',
      queryParameters: {
        name,
      },
    })) as AlwatrDocumentStorage<T>;

    if (
      typeof responseJson.data !== 'object' ||
      typeof responseJson.meta !== 'object' ||
      typeof responseJson.meta.lastUpdated !== 'number'
    ) {
      this._logger.error('getStorage', 'invalid_response_data', {responseJson});
      throw new Error('invalid_response_data');
    }

    return responseJson;
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
  async keys(storage: string | undefined = this.config.name): Promise<Array<string>> {
    this._logger.logMethod('keys');
    if (storage == null) throw new Error('storage_not_defined');

    const responseJson = await serviceRequest<{keys: Array<string> | unknown}>({
      ...this.fetchOption,
      url: this.fetchOption.url + 'keys',
      queryParameters: {
        storage,
      },
    });

    const keys = responseJson.data.keys;

    if (!Array.isArray(keys)) {
      this._logger.error('keys', 'invalid_response_data', {responseJson});
      throw new Error('invalid_response_data');
    }

    return keys;
  }
}
