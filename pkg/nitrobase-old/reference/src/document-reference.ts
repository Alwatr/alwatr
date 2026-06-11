import {delay} from '@alwatr/delay';
import {createLogger} from '@alwatr/logger';
import {getStoreId, getStorePath} from '@alwatr/nitrobase-helper';
import {StoreFileType, StoreFileExtension, type StoreFileId, type DocumentContext, type StoreFileMeta} from '@alwatr/nitrobase-types';

import {logger} from './logger.js';
import type { JsonObject, DictionaryOpt } from '@alwatr/type-helper';

DEV_MODE && logger.logFileModule?.('document-reference');

/**
 * Represents a reference to a document of the AlwatrNitrobase.
 * Provides methods to interact with the document, such as get, set, update and save.
 */
export class DocumentReference<TDoc extends JsonObject = JsonObject> {
  /**
   * Alwatr nitrobase engine version string.
   */
  public static readonly version = __package_version__;

  /**
   * Alwatr nitrobase engine file format version number.
   */
  public static readonly fileFormatVersion = 3;

  /**
   * Creates new DocumentReference instance from stat and initial data.
   *
   * @param statId the document stat.
   * @param data the document data.
   * @param updatedCallback the callback to invoke when the document changed.
   * @template TDoc The document data type.
   * @returns A new document reference class.
   */
  public static newRefFromData<TDoc extends JsonObject>(
    statId: StoreFileId,
    data: TDoc,
    updatedCallback: (from: DocumentReference<TDoc>) => unknown,
    debugDomain?: string,
  ): DocumentReference<TDoc> {
    logger.logMethodArgs?.('doc.newRefFromData', statId);

    const now = Date.now();
    const initialContext: DocumentContext<TDoc> = {
      ok: true,
      meta: {
        ...statId,
        rev: 1,
        updated: now,
        created: now,
        type: StoreFileType.Document,
        extension: StoreFileExtension.Json,
        fv: DocumentReference.fileFormatVersion,
        extra: {},
      },
      data,
    };

    return new DocumentReference(initialContext, updatedCallback, debugDomain);
  }

  /**
   * Creates new DocumentReference instance from DocumentContext.
   *
   * @param context the document context.
   * @param updatedCallback the callback to invoke when the document changed.
   * @template TDoc The document data type.
   * @returns A new document reference class.
   */
  public static newRefFromContext<TDoc extends JsonObject>(
    context: DocumentContext<TDoc>,
    updatedCallback: (from: DocumentReference<TDoc>) => unknown,
    debugDomain?: string,
  ): DocumentReference<TDoc> {
    logger.logMethodArgs?.('doc.newRefFromContext', context.meta);
    return new DocumentReference(context, updatedCallback, debugDomain);
  }

  /**
   * Validates the document context and try to migrate it to the latest version.
   */
  private validateContext__(): void {
    this.logger__.logMethod?.('validateContext__');

    if (this.context__.ok !== true) {
      DEV_MODE && this.logger__.accident('validateContext__', 'store_not_ok');
      throw new Error('store_not_ok', {cause: {context: this.context__}});
    }

    if (this.context__.meta === undefined) {
      DEV_MODE && this.logger__.accident('validateContext__', 'store_meta_undefined');
      throw new Error('store_meta_undefined', {cause: {context: this.context__}});
    }

    if (this.context__.meta.type !== StoreFileType.Document) {
      DEV_MODE && this.logger__.accident('validateContext__', 'document_type_invalid', this.context__.meta);
      throw new Error('document_type_invalid', {cause: this.context__.meta});
    }

    if (this.context__.meta.fv !== DocumentReference.fileFormatVersion) {
      this.logger__.incident?.('validateContext__', 'store_file_version_incompatible', {
        old: this.context__.meta.fv,
        new: DocumentReference.fileFormatVersion,
      });
      this.migrateContext__();
    }
  }

  /**
   * Migrate the document context to the latest.
   */
  private migrateContext__(): void {
    if (this.context__.meta.fv === DocumentReference.fileFormatVersion) return;

    this.logger__.logMethod?.('migrateContext__');

    if (this.context__.meta.fv > DocumentReference.fileFormatVersion) {
      DEV_MODE && this.logger__.accident('migrateContext__', 'store_version_incompatible', this.context__.meta);
      throw new Error('store_version_incompatible', {cause: this.context__.meta});
    }

    if (this.context__.meta.fv === 1) {
      // migrate from v1 to v2
      // this.context__.meta.schemaVer = 0
      this.context__.meta.fv = 2;
    }

    if (this.context__.meta.fv === 2) {
      // migrate from v1 to v3
      if (this.context__.meta.schemaVer === undefined || this.context__.meta.schemaVer === 0) {
        this.context__.meta.schemaVer = 1;
      }
      delete (this.context__.meta as DictionaryOpt<any>)['ver'];
      this.context__.meta.extra ??= {};
      this.context__.meta.fv = 3;
    }

    this.updated__();
  }

  /**
   * The ID of the document nitrobase file.
   */
  public readonly id: string;

  /**
   * The location path of the document nitrobase file.
   */
  public readonly path: string;

  /**
   * Indicates whether the document has unsaved changes.
   */
  public hasUnprocessedChanges_ = false;

  /**
   * Logger instance for this document.
   */
  private logger__;

  /**
   * Create a new document reference.
   * Document reference have methods to get, set, update and save the AlwatrNitrobase Document.
   *
   * @param context__ Document's context filled from the Alwatr Nitrobase (parent).
   * @param updatedCallback__ updated callback to invoke when the document is updated from the Alwatr Nitrobase (parent).
   * @template TDoc The document data type.
   */
  constructor(
    private readonly context__: DocumentContext<TDoc>,
    private readonly updatedCallback__: (from: DocumentReference<TDoc>) => unknown,
    debugDomain?: string,
  ) {
    this.id = getStoreId(this.context__.meta);
    this.path = getStorePath(this.context__.meta);

    debugDomain ??= this.id.slice(0, 20);
    this.logger__ = createLogger(`doc:${debugDomain}`);

    this.logger__.logMethodArgs?.('new', {path: this.path});

    this.validateContext__();
  }

  /**
   * Get nitrobase schema version
   *
   * @returns nitrobase schema version
   */
  public get schemaVer(): number {
    return this.context__.meta.schemaVer ?? 1;
  }

  /**
   * Set nitrobase schema version for migrate
   */
  public set schemaVer(ver: number) {
    this.logger__.logMethodArgs?.('set schemaVer', {old: this.context__.meta.schemaVer, new: ver});
    this.context__.meta.schemaVer = ver;
    this.updated__();
  }

  /**
   * Indicates whether the document data is frozen and cannot be saved.
   */
  private _freeze = false;

  /**
   * Gets the freeze status of the document data.
   *
   * @returns `true` if the document data is frozen, `false` otherwise.
   *
   * @example
   * ```typescript
   * const isFrozen = documentRef.freeze;
   * console.log(isFrozen); // Output: false
   * ```
   */
  public get freeze(): boolean {
    return this._freeze;
  }

  /**
   * Sets the freeze status of the document data.
   *
   * @param value - The freeze status to set.
   *
   * @example
   * ```typescript
   * documentRef.freeze = true;
   * console.log(documentRef.freeze); // Output: true
   * ```
   */
  public set freeze(value: boolean) {
    this.logger__.logMethodArgs?.('freeze changed', {value});
    this._freeze = value;
  }

  /**
   * Retrieves the document's data.
   *
   * @returns The document's data.
   *
   * @example
   * ```typescript
   * const documentData = documentRef.getData();
   * ```
   */
  public getData(): TDoc {
    this.logger__.logMethod?.('getData');
    return this.context__.data;
  }

  /**
   * Retrieves the document's metadata.
   *
   * @returns The document's metadata.
   *
   * @example
   * ```typescript
   * const documentMeta = documentRef.getStoreMeta();
   * ```
   */
  public getStoreMeta(): Readonly<StoreFileMeta> {
    this.logger__.logMethod?.('getStoreMeta');
    return this.context__.meta;
  }

  /**
   * Sets the document's data. replacing the existing data.
   *
   * @param data The new document data.
   *
   * @example
   * ```typescript
   * documentRef.replaceData({ a: 1, b: 2, c: 3 });
   * ```
   */
  public replaceData(data: TDoc): void {
    this.logger__.logMethodArgs?.('replaceData', data);
    (this.context__.data as unknown) = data;
    this.updated__();
  }

  /**
   * Updates document's data by merging a partial update into the document's data.
   *
   * @param data The part of data to merge into the document's data.
   *
   * @example
   * ```typescript
   * documentRef.mergeData({ c: 4 });
   * ```
   */
  public mergeData(data: Partial<TDoc>): void {
    this.logger__.logMethodArgs?.('mergeData', data);
    Object.assign(this.context__.data, data);
    this.updated__();
  }

  /**
   * Requests the Alwatr Nitrobase to save the document.
   * Saving may take some time in Alwatr Nitrobase due to the use of throttling.
   *
   * @example
   * ```typescript
   * documentRef.save();
   * ```
   */
  public save(): void {
    this.logger__.logMethod?.('save');
    this.updated__();
  }

  /**
   * Requests the Alwatr Nitrobase to save the document immediately.
   *
   * @example
   * ```typescript
   * documentRef.saveImmediate();
   * ```
   */
  public saveImmediate(): void {
    this.logger__.logMethod?.('saveImmediate');
    this.updated__(/* immediate: */ true);
  }

  /**
   * Retrieves the full context of the document.
   *
   * @returns The full context of the document.
   *
   * @example
   * ```typescript
   * const context = documentRef.getFullContext_();
   * ```
   */
  public getFullContext_(): Readonly<DocumentContext<TDoc>> {
    this.logger__.logMethod?.('getFullContext_');
    return this.context__;
  }

  public updateDelayed_ = false;

  /**
   * Update the document metadata and invoke the updated callback.
   * This method is throttled to prevent multiple updates in a short time.
   */
  private async updated__(immediate = false): Promise<void> {
    this.logger__.logMethodArgs?.('updated__', {immediate, delayed: this.updateDelayed_});

    this.hasUnprocessedChanges_ = true;

    if (immediate !== true && this.updateDelayed_ === true) return;
    // else

    this.updateDelayed_ = true;

    if (immediate === true || this.context__.meta.changeDebounce === undefined) {
      await delay.nextMacrotask();
    }
    else {
      await delay.by(this.context__.meta.changeDebounce);
    }

    if (this.updateDelayed_ !== true) return; // another parallel update finished!
    this.updateDelayed_ = false;

    this.refreshMetadata_();

    if (this._freeze === true) return; // prevent save if frozen
    this.updatedCallback__(this);
  }

  /**
   * Refresh/recalculate the document's metadata timestamp and revision.
   */
  protected refreshMetadata_(): void {
    this.logger__.logMethod?.('refreshMetadata_');
    this.context__.meta.updated = Date.now();
    this.context__.meta.rev++;
  }

  /**
   * Retrieves the document's extra metadata.
   *
   * @returns The document's extra metadata.
   *
   * @example
   * ```typescript
   * const colExtraMeta = documentRef.getExtraMeta();
   * ```
   */
  public getExtraMeta<T extends JsonObject>(): T {
    this.logger__.logMethod?.('getExtraMeta');
    return this.context__.meta.extra as T;
  }

  /**
   * Sets/replace the document's extra metadata.
   *
   * @param extraMeta The new document's extra metadata.
   *
   * @example
   * ```typescript
   * documentRef.replaceExtraMeta({ a: 1, b: 2, c: 3 });
   * ```
   */
  public replaceExtraMeta<T extends JsonObject>(extraMeta: T): void {
    this.logger__.logMethodArgs?.('replaceExtraMeta', extraMeta);
    this.context__.meta.extra = extraMeta;
    this.updated__();
  }

  /**
   * Updates document's extra metadata by merging a partial update.
   *
   * @param extraMeta The part of extra metadata to merge into the document's extra metadata.
   *
   * @example
   * ```typescript
   * documentRef.mergeExtraMeta({ c: 4 });
   * ```
   */
  public mergeExtraMeta<T extends JsonObject>(extraMeta: Partial<T>): void {
    this.logger__.logMethodArgs?.('mergeExtraMeta', extraMeta);
    Object.assign(this.context__.meta.extra, extraMeta);
    this.updated__();
  }
}
