import {dirname, resolve} from 'node:path';

import {createLogger} from '@alwatr/logger';
import {Region, type AlwatrAuth, type StoreFileId, type StoreFileMeta} from '@alwatr/nitrobase-types';
import {existsSync, makeEmptyFile} from '@alwatr/node-fs';

import {logger} from './logger.js';

import type {AlwatrNitrobase} from '@alwatr/nitrobase-engine';
import type {DocumentReference} from '@alwatr/nitrobase-reference';
import type { JsonObject } from '@alwatr/type-helper';

/**
 * New user data type.
 */
export type NewUser<TUser extends JsonObject> = AlwatrAuth & {
  data: TUser;
  isManager?: true;
};

/**
 * Nitrobase User Management Interface.
 */
interface NitrobaseUserManagementInterface<TUser extends JsonObject> {
  /**
   * Create a new user.
   * @param user The new user data.
   */
  newUser(user: NewUser<TUser>): Promise<void>;

  /**
   * Check if a user exists.
   * @param userId The user ID.
   * @returns True if the user exists, false otherwise.
   */
  hasUser(userId: string): Promise<boolean>;

  /**
   * Get user data.
   * @param userId The user ID.
   * @returns The user data.
   */
  getUserData(userId: string): Promise<TUser>;

  /**
   * Get user meta data.
   * @param userId The user ID.
   * @returns The user meta data.
   */
  getUserMeta(userId: string): Promise<Readonly<StoreFileMeta>>;

  /**
   * Verify user token.
   * @param userId The user ID.
   * @param token The user token.
   * @returns True if the token is valid, false otherwise.
   */
  verifyUserToken(userId: string, token: string): Promise<boolean>;

  /**
   * Save user data to storage.
   * @param userId The user ID.
   */
  save(userId: string): void;

  /**
   * Immediately save user data to storage.
   * @param userId The user ID.
   */
  saveImmediate(userId: string): void;

  /**
   * Get all user IDs.
   * @returns An async generator of user IDs.
   */
  userIds(): Promise<Generator<string, void, void>>;

  /**
   * Get the user directory path.
   * @param userId The user ID.
   * @returns The user directory path.
   */
  getUserDirectory(userId: string): Promise<string>;
}

/**
 * Nitrobase User Management Class.
 * Manages user data and authentication.
 */
export class NitrobaseUserManagement<TUser extends JsonObject> implements NitrobaseUserManagementInterface<TUser> {
  /**
   * Default Nitrobase store IDs used by this class.
   */
  public static readonly nitrobaseIds = {
    userList: {
      name: 'user-list',
      region: Region.Managers,
      schemaVer: 1,
    } as Readonly<StoreFileId>,

    userInfo: {
      name: 'user-info',
      region: Region.PerUser,
    } as Readonly<StoreFileId>,
  } as const;

  /**
   * Initialize the user management module.
   * @param nitrobase The Nitrobase instance.
   */
  public static async initialize(nitrobase: AlwatrNitrobase): Promise<void> {
    logger.logMethod?.('NitrobaseUserManagement.initialize');
    nitrobase.newCollection(this.nitrobaseIds.userList);
  }

  protected logger_ = createLogger('user-management');

  protected userListCollection_;

  /**
   * Create a new instance of NitrobaseUserManagement.
   * @param nitrobase_ The Nitrobase instance.
   */
  constructor(protected readonly nitrobase_: AlwatrNitrobase) {
    this.logger_.logMethod?.('constructor');
    this.userListCollection_ = this.nitrobase_.openCollection(NitrobaseUserManagement.nitrobaseIds.userList);
  }

  // Implementation of NitrobaseUserManagementInterface methods with JSDoc comments

  public async newUser(user: NewUser<TUser>): Promise<void> {
    this.logger_.logMethodArgs?.('newUser', user);

    (await this.userListCollection_).addItem(user.userId, {});

    this.newUserInfoDocument_(user.userId, user.data);

    await this.makeTokenFile_(user.userId, user.userToken, user.isManager);
  }

  public async hasUser(userId: string): Promise<boolean> {
    const userExists = (await this.userListCollection_).hasItem(userId);
    this.logger_.logMethodFull?.('hasUser', {userId}, userExists);
    return userExists;
  }

  public async getUserData(userId: string): Promise<TUser> {
    this.logger_.logMethodArgs?.('getUserData', userId);
    const userInfoDocument = await this.openUserInfoDocument_(userId);
    return userInfoDocument.getData();
  }

  public async getUserMeta(userId: string): Promise<Readonly<StoreFileMeta>> {
    this.logger_.logMethodArgs?.('getUserMeta', userId);
    const document = await this.openUserInfoDocument_(userId);
    return document.getStoreMeta();
  }

  public save(userId: string): void {
    this.logger_.logMethodArgs?.('save', userId);
    this.openUserInfoDocument_(userId).then((document) => {
      document.save();
    });
  }

  public saveImmediate(userId: string): void {
    this.logger_.logMethodArgs?.('saveImmediate', userId);
    this.openUserInfoDocument_(userId).then((document) => {
      document.saveImmediate();
    });
  }

  public async userIds(): Promise<Generator<string, void, void>> {
    return (await this.userListCollection_).ids();
  }

  public async verifyUserToken(userId: string, token: string): Promise<boolean> {
    const tokenFileExist = existsSync(await this.getUserTokenFilePath_(userId, token));
    this.logger_.logMethodFull?.('verifyUserToken', {userId, token: token.slice(0, 12) + '...'}, tokenFileExist);
    return tokenFileExist;
  }

  public async getUserDirectory(userId: string): Promise<string> {
    const userInfoDocument = await this.openUserInfoDocument_(userId);
    const userDirectoryPath = dirname(resolve(this.nitrobase_.config.rootPath, userInfoDocument.path));
    this.logger_.logMethodFull?.('getUserDirectory', {userId}, userDirectoryPath);
    return userDirectoryPath;
  }

  /**
   * Create a new user info document.
   * @param userId The user ID.
   * @param userInfo The user info data.
   */
  protected newUserInfoDocument_(userId: string, userInfo: TUser): void {
    this.logger_.logMethodArgs?.('newUserInfoDocument', {userId, userInfo});
    const storeId: StoreFileId = {
      ...NitrobaseUserManagement.nitrobaseIds.userInfo,
      ownerId: userId,
    };
    if (this.nitrobase_.hasStore(storeId)) {
      DEV_MODE && this.logger_.accident('newUserInfoDocument_', 'store_already_exists', storeId);
      return;
    }
    this.nitrobase_.newDocument<TUser>(storeId, userInfo);
  }

  /**
   * Open the user info document.
   * @param userId The user ID.
   * @returns A promise resolving to the user info document.
   */
  protected openUserInfoDocument_(userId: string): Promise<DocumentReference<TUser>> {
    this.logger_.logMethodArgs?.('openUserInfoDocument_', userId);
    return this.nitrobase_.openDocument<TUser>({
      ...NitrobaseUserManagement.nitrobaseIds.userInfo,
      ownerId: userId,
    });
  }

  /**
   * Create a token file for the user.
   * @param userId The user ID.
   * @param token The user token.
   * @param isManager Whether the user is a manager.
   */
  protected async makeTokenFile_(userId: string, token: string, isManager?: true): Promise<void> {
    this.logger_.logMethodArgs?.('makeTokenFile', {userId, token: token.slice(0, 12) + '...', isManager});
    const userDirectory = await this.getUserDirectory(userId);

    await makeEmptyFile(resolve(userDirectory, `.token/${token}.asn`));

    if (isManager === true) {
      await makeEmptyFile(resolve(userDirectory, '.auth/manager.asn'));
    }
  }

  /**
   * Get the path to the user token file.
   * @param userId The user ID.
   * @param token The user token.
   * @returns The path to the user token file.
   */
  protected async getUserTokenFilePath_(userId: string, token: string): Promise<string> {
    const userTokenFilePath = resolve(await this.getUserDirectory(userId), `.token/${token}.asn`);
    this.logger_.logMethodFull?.('getTokenFilePath', {userId, token: token.slice(0, 12) + '...'}, userTokenFilePath);
    return userTokenFilePath;
  }
}
