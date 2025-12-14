import type {} from '@alwatr/type-helper';

// *** Nitrobase File ***

/**
 * The subdirectory location for each nitrobase file.
 */
export enum Region {
  /**
   * Nitrobase file location that can be accessed by anyone. e.g. Product list.
   */
  Public = 'p',

  /**
   * Nitrobase file location that can be accessed by authenticated users. e.g. Special price list for dealers
   */
  Authenticated = 'a',

  /**
   * Nitrobase file location that can be accessed by admins and managers only. e.g. User list.
   */
  Managers = 'm',

  /**
   * Nitrobase file location specific to each user id. Can be accessed using the user token. e.g. User profile and User orders.
   */
  PerUser = 'u',

  /**
   * Nitrobase file location specific to each owner id. e.g. user token or device id.
   */
  PerOwner = 'o',

  /**
   * Private nitrobase file location. Cannot be accessed publicly and must be directly accessed by the admin API only.
   * e.g. User secret data.
   */
  Secret = '.s',
}

/**
 * The different types of nitrobase file formats.
 */
export enum StoreFileType {
  /**
   * Type used for `single document` storage.
   */
  Document = 'doc',

  /**
   * Type used for storing a `collection` of simpler documents, referred to as collection items.
   */
  Collection = 'col',

  /**
   * Type used for storing a collection of items that are `append-only`.
   */
  AppendOnlyCollection = 'aoc',
}

/**
 * Nitrobase file extension (encode).
 */
export enum StoreFileExtension {
  /**
   * AlwatrNitrobase JSON format.
   */
  Json = 'asj',
}

/**
 * Unique identifier of the nitrobase file.
 *
 * Get from user for select nitrobase file.
 */
export type StoreFileId = {
  /**
   * The nitrobase filename.
   */
  readonly name: string;

  /**
   * The region where the nitrobase file is located.
   * @see {@link Region}
   */
  readonly region: Region;

  /**
   * The owner of the nitrobase file.
   * If the region is `Region.PerX` then this is the user id, device id, or token id etc.
   * @see {@link Region}
   *
   */
  readonly ownerId?: string;

  /**
   * The schema version for easy migration by user.
   * If not specified, the default value is `1`.
   */
  schemaVer?: number;
};

/**
 * Nitrobase the complete metadata of the file in the root database.
 */
export type StoreFileStat = StoreFileId & {
  /**
   * The type of the nitrobase file.
   *
   * @see {@link StoreFileType}
   */
  readonly type: StoreFileType;

  /**
   * The extension used for the nitrobase file.
   *
   * @see {@link StoreFileExtension}
   */
  readonly extension?: StoreFileExtension;

  /**
   * The save debounce timeout in milliseconds for minimal disk I/O usage.
   * This is used to limit the frequency of disk writes for performance reasons.
   * The recommended value is `40`.
   * If not specified, the default value get from AlwatrNitrobase `defaultChangeDebounce`.
   */
  readonly changeDebounce?: number;

  /**
   * The name of the migration process.
   * This is used to migrate the nitrobase file to a new schema version.
   */
  readonly migrateName?: string;

  /**
   * The time-to-live (TTL) of the nitrobase file in memory.
   */
  // readonly ttl?: number;
};

/**
 * Represents the metadata of a nitrobase file.
 */
export type StoreFileMeta = StoreFileStat & {
  /**
   * Nitrobase file format version.
   */
  fv: number;

  /**
   * The revision number of the nitrobase file.
   *
   * This number is incremented every time the nitrobase file is updated.
   */
  rev: number;

  /**
   * The Unix timestamp (in milliseconds since the epoch) for when the nitrobase file was created.
   */
  readonly created: number;

  /**
   * The Unix timestamp (in milliseconds since the epoch) for when the nitrobase file was updated.
   */
  updated: number;

  /**
   * Last auto increment id.
   */
  lastAutoId?: number;

  /**
   * The extra metadata for the nitrobase file.
   */
  extra: JsonObject;
};

export type StoreFileData<T extends JsonObject = JsonObject> = T;

/**
 * Represents the context of a nitrobase file.
 * @template TData The type of the data content in the nitrobase file.
 */
export type StoreFileContext<TData extends JsonObject = JsonObject> = {
  /**
   * The status of the nitrobase file.
   *
   * if false, the Alwatr nitrobase throws an error.
   */
  readonly ok: true;

  /**
   * The metadata of the nitrobase file.
   * @see {@link StoreFileMeta}
   */
  readonly meta: StoreFileMeta;

  /**
   * The data content of the nitrobase file.
   */
  readonly data: TData;
};

/**
 * Nitrobase file meta only content type.
 */
export type StoreFileMetaOnlyContext = Omit<StoreFileContext<never>, 'data'>;

// *** Documents ***

/**
 * StoreFileContext for document type.
 */
export type DocumentContext<T extends JsonObject = JsonObject> = StoreFileContext<T>;

// *** Collections ***

/**
 * The metadata of an item in a collection.
 */
export type CollectionItemMeta = {
  /**
   * The unique identifier for the collection item.
   */
  readonly id: string | number;

  /**
   * The Unix timestamp (in milliseconds since the epoch) for when the collection item was created.
   */
  readonly created: number;

  /**
   * The Unix timestamp (in milliseconds since the epoch) for when the collection item was updated.
   */
  updated: number;

  /**
   * The revision number for the collection item.
   *
   * This number is incremented each time the item is updated.
   */
  rev: number;
};

/**
 * Collection item context type.
 */
export type CollectionItem<TData extends JsonObject = JsonObject> = {
  /**
   * Collection item's metadata.
   */
  readonly meta: CollectionItemMeta;

  /**
   * Collection item data.
   */
  readonly data: TData;
};

/**
 * Collection item context type.
 */
export type CollectionContext<T extends JsonObject = JsonObject> = StoreFileContext<DictionaryReq<CollectionItem<T>>>;

export type AlwatrAuth = {
  userId: string;
  userToken: string;
};
