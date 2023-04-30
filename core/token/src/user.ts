import {AlwatrHashGenerator} from './hash.js';
import {AlwatrTokenGenerator} from './token.js';

import type {HashGeneratorConfig, TokenGeneratorConfig, TokenStatus} from './type.js';

/**
 * Secure User ID/Token Factory (generate and validate authentication process).
 */
export class AlwatrUserFactory {
  protected _tokenGenerator;
  protected _hashGenerator;

  constructor(
      tokenConfig: TokenGeneratorConfig,
      hashConfig?: HashGeneratorConfig,
  ) {
    this._tokenGenerator = new AlwatrTokenGenerator(tokenConfig);
    this._hashGenerator = new AlwatrHashGenerator(hashConfig);
  }

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
   * const newId = userFactory.generateId();
   * ...
   * if (userFactory.verifyId(newId)) {
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
   * const userToken = userFactory.generateToken(['userId', 1])
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
   * const userToken = userFactory.generateToken(['userId', 1]);
   * ...
   * if (userFactory.verifyToken(userToken)) {
   *   ...
   * }
   * ```
   */
  verifyToken(uniquelyList: Array<string | number | boolean>, token: string): TokenStatus {
    return this._tokenGenerator.verify(uniquelyList.join(), token);
  }
}
