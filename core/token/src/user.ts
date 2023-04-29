import {AlwatrHashGenerator} from './hash.js';
import {AlwatrTokenGenerator} from './token.js';

import type {TokenStatus, UserFactoryConfig} from './type.js';

/**
 * Secure User ID/Token Factory (generate and validate authentication process).
 */
export class AlwatrUserFactory {
  constructor(public config: UserFactoryConfig) {}

  protected _hashGenerator = new AlwatrHashGenerator(this.config.hashConfig);
  protected _tokenGenerator = new AlwatrTokenGenerator(this.config.tokenConfig);

  /**
   * Generate new self-verifiable user-id.
   *
   * Example:
   *
   * ```ts
   * const newUser = {
   *   id: userFactory.generateId(),
   *   ...
   * }
   * ```
   */
  generateId(): string {
    return this._hashGenerator.randomSelfValidate();
  }

  /**
   * Validate user-id without token.
   *
   * Example:
   *
   * ```ts
   * const newUser = {
   *   id: userFactory.generateId(),
   *   ...
   * }
   * ```
   */
  verifyId(id: string): boolean {
    return this._hashGenerator.verifySelfValidate(id);
  }

  /**
   * Generate user auth token.
   *
   * Example:
   *
   * ```ts
   * ```
   */
  generateToken(uniquelyList: Array<string | number | boolean>): string {
    return this._tokenGenerator.generate(uniquelyList.join());
  }

  /**
   * Verify user auth token.
   *
   * Example:
   *
   * ```ts
   * ```
   */
  verifyToken(uniquelyList: Array<string | number | boolean>, token: string): TokenStatus {
    return this._tokenGenerator.verify(uniquelyList.join(), token);
  }
}
