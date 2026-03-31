import {AlwatrHashGenerator} from './hash.js';
import {
  deviceIdGeneratorRecommendedConfig,
  secretGeneratorRecommendedConfig,
  userIdGeneratorRecommendedConfig,
  userTokenGeneratorRecommendedConfig,
} from './pre-config.js';
import {AlwatrTokenGenerator, type TokenValidity} from './token.js';

import type {Duration} from '@alwatr/parse-duration';

/**
 * Configuration options for the CryptoFactory.
 */
export interface CryptoFactoryConfig {
  /**
   * The secret used for encryption and decryption tokens.
   */
  secret: string;

  /**
   * The duration for which the token is valid.
   */
  duration: Duration | 'infinite';
}

/**
 * Crypto factory for generating self-validate user-id, user-token, secret, device-id.
 */
export class AlwatrCryptoFactory {
  protected _generators;

  /**
   * Creates a new instance of crypto factory.
   * @param config The configuration used to create the crypto factory.
   */
  constructor(config: CryptoFactoryConfig) {
    this._generators = {
      secret: new AlwatrHashGenerator(secretGeneratorRecommendedConfig),
      deviceId: new AlwatrHashGenerator(deviceIdGeneratorRecommendedConfig),
      userId: new AlwatrHashGenerator(userIdGeneratorRecommendedConfig),
      token: new AlwatrTokenGenerator({
        ...userTokenGeneratorRecommendedConfig,
        ...config,
      }),
    } as const;
  }

  /**
   * Generate self-verifiable user ID.
   * @returns The generated user ID.
   * @example
   * ```typescript
   * const newUser = {
   *   id: cryptoFactory.generateUserId(),
   *   ...
   * }
   * ```
   */
  public generateUserId(): string {
    return this._generators.userId.generateRandomSelfValidate();
  }

  /**
   * Verify a user ID without token.
   * @param userId The user ID to verify.
   * @returns A boolean indicating whether the user ID is valid.
   * @example
   * ```typescript
   * if (!cryptoFactory.verifyUserId(user.id)) {
   *   throw new Error('invalid_user');
   * }
   * ```
   */
  public verifyUserId(userId: string): boolean {
    return this._generators.userId.verifySelfValidate(userId);
  }

  /**
   * Generate authentication token.
   * @param uniquelyList The list of uniq values to generate the token from.
   * @returns The generated user token.
   * @example
   * ```typescript
   * const userToken = cryptoFactory.generateToken([user.id, user.lpe]);
   * ```
   */
  public generateToken(uniquelyList: (string | number)[]): string {
    return this._generators.token.generate(uniquelyList.join());
  }

  /**
   * Verify a authentication token.
   * @param uniquelyList The list of uniq values used to generate the token.
   * @param token The user token to verify.
   * @returns The validity of the token.
   * @example
   * ```typescript
   * if (!cryptoFactory.verifyToken([user.id, user.lpe], userToken)) {
   *   throw new Error('invalid_token');
   * }
   * ```
   */
  public verifyToken(uniquelyList: (string | number)[], token: string): TokenValidity {
    return this._generators.token.verify(uniquelyList.join(), token);
  }

  /**
   * Generate self-verifiable secret.
   * @returns The generated secret.
   * @example
   * ```typescript
   * const config = {
   *   storageToken: cryptoFactory.generateSecret(),
   *   ...
   * }
   * ```
   */
  public generateSecret(): string {
    return this._generators.secret.generateRandomSelfValidate();
  }

  /**
   * Verify a secret.
   * @param secret The secret to verify.
   * @returns A boolean indicating whether the secret is valid.
   * @example
   * ```typescript
   * if (!cryptoFactory.verifySecret(config.storageToken)) {
   *   throw new Error('invalid_secret');
   * }
   * ```
   */
  public verifySecret(secret: string): boolean {
    return this._generators.secret.verifySelfValidate(secret);
  }

  /**
   * Generate self-verifiable device ID.
   * @returns The generated device ID.
   * @example
   * ```typescript
   * const deviceId = deviceFactory.generateDeviceId();
   * ```
   */
  public generateDeviceId(): string {
    return this._generators.deviceId.generateRandomSelfValidate();
  }

  /**
   * Verify a device ID.
   * @param deviceId The device ID to verify.
   * @returns A boolean indicating whether the device ID is valid.
   * @example
   * ```typescript
   * if (!deviceFactory.verifyDeviceId(bodyJson.deviceId)) {
   *   throw {
   *    ok: false,
   *    status: 400,
   *    error: 'invalid_device_id',
   *   }
   * }
   * ```
   */
  public verifyDeviceId(deviceId: string): boolean {
    return this._generators.deviceId.verifySelfValidate(deviceId);
  }
}
