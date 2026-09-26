import {delay} from '@alwatr/delay';
import {exitHook} from '@alwatr/exit-hook';
import {getStoreId, getStorePath} from '@alwatr/nitrobase-helper';
import {CollectionReference, DocumentReference} from '@alwatr/nitrobase-reference';
import {
  StoreFileType,
  StoreFileExtension,
  Region,
  type StoreFileStat,
  type StoreFileContext,
  type CollectionContext,
  type DocumentContext,
  type StoreFileId,
  type CollectionItem,
} from '@alwatr/nitrobase-types';
import {existsSync, readJson, resolve, unlink, writeJson} from '@alwatr/node-fs';

import {logger} from './logger.js';
import type { DictionaryReq, JsonObject, DictionaryOpt } from '@alwatr/type-helper';


DEV_MODE && logger.logFileModule?.('alwatr-nitrobase');

/**
 * AlwatrNitrobase configuration.
 */
export interface AlwatrNitrobaseConfig {
  /**
   * The root path of the storage.
   * This is where the AlwatrNitrobase will nitrobase its data.
   */
  rootPath: string;

  /**
   * The save debounce timeout in milliseconds for minimal disk I/O usage.
   * This is used to limit the frequency of disk writes for performance reasons.
   * The recommended value is `40`.
   */
  defaultChangeDebounce?: number;

  /**
   * If true, an error will be thrown when trying to read or write to a nitrobase file that is not initialized (new storage).
   * The default value is `false` but highly recommended to set it to `true` in production to prevent data loss.
   */
  errorWhenNotInitialized?: boolean;
}

/**
 * AlwatrNitrobase engine.
 *
 * It provides methods to read, write, validate, and manage nitrobase files.
 * It also provides methods to interact with `documents` and `collections` in the nitrobase.
 */
export class AlwatrNitrobase {
  /**
   * The Alwatr Nitrobase version string.
   *
   * Use for nitrobase file format version for check compatibility.
   */
  public static readonly version = __package_version__;

  /**
   * The root nitrobase file stat.
   */
  private static readonly rootDbStat__: StoreFileStat = {
    name: '.nitrobase',
    region: Region.Secret,
    type: StoreFileType.Collection,
    extension: StoreFileExtension.Json,
    changeDebounce: 40,
  };

  /**
   * `collectionReference` of all `storeFileStat`s.
   * This is the root nitrobase collection.
   */
  private rootDb__;

  /**
   * Keep all loaded nitrobase file context loaded in memory.
   */
  private cacheReferences__: DictionaryReq<DocumentReference | CollectionReference> = {};

  /**
   * Constructs an AlwatrNitrobase instance with the provided configuration.
   *
   * @param config The configuration of the AlwatrNitrobase engine.
   * @example
   * ```typescript
   * const alwatrStore = new AlwatrNitrobase({
   *   rootPath: './db',
   *   saveDebounce: 40,
   * });
   * ```
   */
  constructor(public readonly config: AlwatrNitrobaseConfig) {
    this.storeChanged_ = this.storeChanged_.bind(this);

    logger.logMethodArgs?.('new', config);
    this.config.defaultChangeDebounce ??= 40;
    this.rootDb__ = this.loadRootDb__();
    exitHook(this.exitHook__.bind(this));
  }

  /**
   * Checks if a nitrobase file with the given ID exists.
   *
   * @param storeId - The ID of the nitrobase file to check.
   * @returns `true` if the nitrobase file exists, `false` otherwise.
   * @example
   * ```typescript
   * if (!alwatrStore.hasStore('user1/profile')) {
   *  alwatrStore.defineDocument(...)
   * }
   * ```
   */
  public hasStore(storeId: StoreFileId): boolean {
    const id_ = getStoreId(storeId);
    const exists = this.rootDb__.hasItem(id_);
    logger.logMethodFull?.('hasStore', id_, exists);
    return exists;
  }

  /**
   * Defines a new document with the given configuration and initial data.
   * If a document with the same ID already exists, an error is thrown.
   *
   * @param stat nitrobase file stat
   * @param data initial data for the document
   * @template TDoc document data type
   * @example
   * ```typescript
   * await alwatrStore.newDocument<Order>(
   *   {
   *     name: 'profile',
   *     region: Region.PerUser,
   *     ownerId: 'user1',
   *   },
   *   {
   *     name: 'Ali',
   *     email: 'ali@alwatr.io',
   *   }
   * );
   * ```
   */
  public newDocument<TDoc extends JsonObject = JsonObject>(stat: Omit<StoreFileStat, 'type'>, data: TDoc): void {
    logger.logMethodArgs?.('newDocument', stat);
    return this.newStoreFile__(
      {
        ...stat,
        type: StoreFileType.Document,
      },
      data,
    );
  }

  /**
   * Defines a new collection with the given configuration and initial data.
   * If a collection with the same ID already exists, an error is thrown.
   *
   * @param stat nitrobase file stat
   * @example
   * ```typescript
   * await alwatrStore.newCollection<Order>(
   *   {
   *     name: 'orders',
   *     region: Region.PerUser,
   *     ownerId: 'user1',
   *   }
   * );
   * ```
   */
  public newCollection(stat: Omit<StoreFileStat, 'type'>): void {
    logger.logMethodArgs?.('newCollection', stat);
    return this.newStoreFile__({
      ...stat,
      type: StoreFileType.Collection,
    });
  }

  /**
   * Defines a AlwatrNitrobaseFile with the given configuration and initial data.
   *
   * @param stat nitrobase file stat
   * @param data initial data for the document
   */
  private newStoreFile__(stat: StoreFileStat, data?: DictionaryOpt<any>): void {
    logger.logMethodArgs?.('newStoreFile__', stat);

    (stat.changeDebounce as number | undefined) ??= this.config.defaultChangeDebounce;

    let fileStoreRef: DocumentReference | CollectionReference;
    if (stat.type === StoreFileType.Document) {
      if (data === undefined) {
        DEV_MODE && logger.accident('newStoreFile__', 'document_data_required', stat);
        throw new Error('document_data_required', {cause: stat});
      }
      fileStoreRef = DocumentReference.newRefFromData(stat, data, this.storeChanged_);
    }
    else if (stat.type === StoreFileType.Collection) {
      fileStoreRef = CollectionReference.newRefFromData(stat, this.storeChanged_);
    }
    else {
      DEV_MODE && logger.accident('newStoreFile__', 'store_file_type_not_supported', stat);
      throw new Error('store_file_type_not_supported', {cause: stat});
    }

    if (this.rootDb__.hasItem(fileStoreRef.id)) {
      DEV_MODE && logger.accident('newStoreFile__', 'store_file_already_defined', stat);
      throw new Error('store_file_already_defined', {cause: stat});
    }

    this.rootDb__.addItem(fileStoreRef.id, stat);
    this.cacheReferences__[fileStoreRef.id] = fileStoreRef;

    // fileStoreRef.save();
    this.storeChanged_(fileStoreRef);
  }

  /**
   * Open a document with the given id and create and return a DocumentReference.
   * If the document not exists or its not a document, an error is thrown.
   *
   * @template TDoc document data type
   * @param documentId document id {@link StoreFileId}
   * @returns document reference {@link DocumentReference}
   * @example
   * ```typescript
   * const userProfile = await alwatrStore.openDocument<User>({
   *   name: 'user1/profile',
   *   region: Region.PerUser,
   *   ownerId: 'user1',
   * });
   * userProfile.update({name: 'ali'});
   * ```
   */
  public async openDocument<TDoc extends JsonObject>(documentId: StoreFileId): Promise<DocumentReference<TDoc>> {
    const id = getStoreId(documentId);
    logger.logMethodArgs?.('openDocument', id);

    if (Object.hasOwn(this.cacheReferences__, id)) {
      const ref = this.cacheReferences__[id];
      if (!(ref instanceof DocumentReference)) {
        DEV_MODE && logger.accident('openDocument', 'document_wrong_type', id);
        throw new Error('document_wrong_type', {cause: id});
      }
      return this.cacheReferences__[id] as unknown as DocumentReference<TDoc>;
    }

    if (!this.rootDb__.hasItem(id)) {
      DEV_MODE && logger.accident('openDocument', 'document_not_found', id);
      throw new Error('document_not_found', {cause: id});
    }

    const storeStat = this.rootDb__.getItemData(id);

    if (storeStat.type != StoreFileType.Document) {
      DEV_MODE && logger.accident('openDocument', 'document_wrong_type', id);
      throw new Error('document_wrong_type', {cause: id});
    }

    const context = await this.readContext__<DocumentContext<TDoc>>(storeStat);
    const docRef = DocumentReference.newRefFromContext(context, this.storeChanged_);
    this.cacheReferences__[id] = docRef as unknown as DocumentReference;
    return docRef;
  }

  /**
   * Open a collection with the given id and create and return a CollectionReference.
   * If the collection not exists or its not a collection, an error is thrown.
   *
   * @template TItem collection item data type
   * @param collectionId collection id {@link StoreFileId}
   * @returns collection reference {@link CollectionReference}
   * @example
   * ```typescript
   * const orders = await alwatrStore.openCollection<Order>({
   *   name: 'orders',
   *   region: Region.PerUser,
   *   ownerId: 'user1',
   * });
   * orders.append({name: 'order 1'});
   * ```
   */
  public async openCollection<TItem extends JsonObject>(collectionId: StoreFileId): Promise<CollectionReference<TItem>> {
    const id = getStoreId(collectionId);
    logger.logMethodArgs?.('openCollection', id);

    // try to get from cache
    if (Object.hasOwn(this.cacheReferences__, id)) {
      const ref = this.cacheReferences__[id];
      if (!(ref instanceof CollectionReference)) {
        DEV_MODE && logger.accident('openCollection', 'collection_wrong_type', id);
        throw new Error('collection_wrong_type', {cause: id});
      }
      return this.cacheReferences__[id] as unknown as CollectionReference<TItem>;
    }

    // load and create new collection reference
    if (!this.rootDb__.hasItem(id)) {
      DEV_MODE && logger.accident('openCollection', 'collection_not_found', id);
      throw new Error('collection_not_found', {cause: id});
    }

    const storeStat = this.rootDb__.getItemData(id);

    if (storeStat.type != StoreFileType.Collection) {
      DEV_MODE && logger.accident('openCollection', 'collection_wrong_type', id);
      throw new Error('collection_not_found', {cause: id});
    }

    const context = await this.readContext__<CollectionContext<TItem>>(storeStat);
    const colRef = CollectionReference.newRefFromContext(context, this.storeChanged_);
    this.cacheReferences__[id] = colRef as unknown as CollectionReference;
    return colRef;
  }

  /**
   * Unloads the nitrobase file with the given id from memory.
   *
   * @param storeId The unique identifier of the nitrobase file. {@link StoreFileId}
   * @example
   * ```typescript
   * alwatrStore.unloadStore({name: 'user-list', region: Region.Secret});
   * alwatrStore.hasStore({name: 'user-list', region: Region.Secret}); // true
   * ```
   */
  public unloadStore(storeId: StoreFileId): void {
    const id_ = getStoreId(storeId);
    logger.logMethodArgs?.('unloadStore', id_);
    const ref = this.cacheReferences__[id_];
    if (ref === undefined) return;
    if (ref.hasUnprocessedChanges_ === true) {
      ref.updateDelayed_ = false;
      this.storeChanged_(ref);
    }
    delete this.cacheReferences__[id_];
  }

  /**
   * Remove document or collection from nitrobase and delete the file from disk.
   * If the file is not found, an error is thrown.
   * If the file is not unloaded, it will be unloaded first.
   * You don't need to await this method to complete unless you want to make sure the file is deleted on disk.
   *
   * @param storeId The ID of the file to delete. {@link StoreFileId}
   * @returns A Promise that resolves when the file is deleted.
   * @example
   * ```typescript
   * alwatrStore.removeStore({name: 'user-list', region: Region.Secret});
   * alwatrStore.hasStore({name: 'user-list', region: Region.Secret}); // false
   * ```
   */
  public async removeStore(storeId: StoreFileId): Promise<void> {
    const id_ = getStoreId(storeId);
    logger.logMethodArgs?.('removeStore', id_);
    if (!this.rootDb__.hasItem(id_)) {
      DEV_MODE && logger.accident('removeStore', 'document_not_found', id_);
      throw new Error('document_not_found', {cause: id_});
    }
    const ref = this.cacheReferences__[id_];
    if (ref !== undefined) {
      // direct unload to prevent save
      ref.freeze = true;
      ref.updateDelayed_ = false;
      ref.hasUnprocessedChanges_ = false;
      delete this.cacheReferences__[id_]; // unload
    }
    const path = getStorePath(this.rootDb__.getItemData(id_));
    this.rootDb__.removeItem(id_);
    await delay.by(0);
    try {
      await unlink(resolve(this.config.rootPath, path));
    }
    catch (error) {
      logger.error('removeStore', 'remove_file_failed', error, {id: storeId, path});
    }
  }

  /**
   * Saves all changes in the nitrobase.
   *
   * @returns A Promise that resolves when all changes are saved.
   * @example
   * ```typescript
   * await alwatrStore.saveAll();
   * ```
   */
  public async saveAll(): Promise<void> {
    logger.logMethod?.('saveAll');
    for (const ref of Object.values(this.cacheReferences__)) {
      if (ref.hasUnprocessedChanges_ === true && ref.freeze !== true) {
        ref.updateDelayed_ = false;
        await this.storeChanged_(ref);
      }
    }
  }

  /**
   * Reads the context from a given path or StoreFileStat object.
   *
   * @param path The path or StoreFileStat object from which to read the context.
   * @returns A promise that resolves to the context object.
   */
  private async readContext__<T extends StoreFileContext>(path: string | StoreFileStat): Promise<T> {
    if (typeof path !== 'string') path = getStorePath(path);
    logger.logMethodArgs?.('readContext__', path);
    logger.time?.(`readContext__time(${path})`);
    const context = (await readJson(resolve(this.config.rootPath, path))) as T;
    logger.timeEnd?.(`readContext__time(${path})`);
    return context;
  }

  /**
   * Writes the context to the specified path.
   *
   * @template T The type of the context.
   * @param path The path where the context will be written.
   * @param context The context to be written.
   * @param sync Indicates whether the write operation should be synchronous.
   * @returns A promise that resolves when the write operation is complete.
   */
  private writeContext__<T extends StoreFileContext>(path: string | StoreFileStat, context: T): Promise<void> {
    if (typeof path !== 'string') path = getStorePath(path);
    logger.logMethodArgs?.('writeContext__', path);
    return writeJson(resolve(this.config.rootPath, path), context);
  }

  /**
   * Write nitrobase file context.
   *
   * @param from nitrobase file reference
   * @returns A promise that resolves when the write operation is complete.
   */
  protected async storeChanged_<T extends JsonObject>(from: DocumentReference<T> | CollectionReference<T>): Promise<void> {
    logger.logMethodArgs?.('storeChanged__', from.id);
    const rev = from.getStoreMeta().rev;
    try {
      await this.writeContext__(from.path, from.getFullContext_());
      if (rev === from.getStoreMeta().rev) {
        // Context not changed during saving
        from.hasUnprocessedChanges_ = false;
      }
    }
    catch (error) {
      logger.error('storeChanged__', 'write_context_failed', {id: from.id, error});
    }
  }

  /**
   * Load storeFilesCollection or create new one.
   */
  private loadRootDb__(): CollectionReference<StoreFileStat> {
    logger.logMethod?.('loadRootDb__');
    const fullPath = resolve(this.config.rootPath, getStorePath(AlwatrNitrobase.rootDbStat__));
    if (!existsSync(fullPath)) {
      if (this.config.errorWhenNotInitialized === true) {
        throw new Error('store_not_found', {cause: 'Nitrobase not initialized'});
      }

      logger.banner('Initialize new alwatr-nitrobase');
      return CollectionReference.newRefFromData(AlwatrNitrobase.rootDbStat__, this.storeChanged_);
    }
    // else
    const context = readJson<CollectionContext<StoreFileStat>>(fullPath, true);
    return CollectionReference.newRefFromContext(context, this.storeChanged_, 'root-db');
  }

  /**
   * Save all nitrobase files.
   */
  private exitHook__(): void {
    logger.logMethod?.('exitHook__');
    for (const ref of Object.values(this.cacheReferences__)) {
      logger.logProperty?.(`StoreFile.${ref.id}.hasUnprocessedChanges`, ref.hasUnprocessedChanges_);
      if (ref.hasUnprocessedChanges_ === true && ref.freeze !== true) {
        logger.incident?.('exitHook__', 'rescue_unsaved_context', {id: ref.id});
        writeJson(resolve(this.config.rootPath, ref.path), ref.getFullContext_(), true);
        ref.hasUnprocessedChanges_ = false;
      }
    }
  }

  /**
   * Get all nitrobase files.
   *
   * @returns all nitrobase files.
   * @example
   * ```typescript
   * const storeList = alwatrStore.getStoreList();
   * for (const nitrobase of storeList) {
   *   console.log(nitrobase.meta.id, nitrobase.data);
   * }
   */
  public getStoreList(): CollectionItem<Omit<StoreFileStat, 'schemaVer'>>[] {
    logger.logMethod?.('getStoreList');
    return this.rootDb__.values();
  }
}
