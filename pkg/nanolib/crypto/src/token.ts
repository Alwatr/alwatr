import {createHmac, type BinaryToTextEncoding} from 'node:crypto';

import {parseDuration, type Duration} from '@alwatr/parse-duration';

import type {CryptoAlgorithm} from './type.js';

export type TokenValidity = 'valid' | 'invalid' | 'expired';

/**
 * Represents the configuration for a token generator.
 */
export interface TokenGeneratorConfig {
  /**
   * The prefix to be added to the generated hash.
   */
  prefix: string;

  /**
   * The algorithm used for hashing.
   */
  algorithm: CryptoAlgorithm;

  /**
   * The encoding used for the generated hash.
   */
  encoding: BinaryToTextEncoding;

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
 * Secure authentication HOTP token generator (HMAC-based One-Time Password algorithm).
 */
export class AlwatrTokenGenerator {
  private _duration: number;

  /**
   * The current epoch based on the configured duration.
   */
  protected get _epoch(): number {
    return this._duration == 0 ? 0 : Math.floor(Date.now() / this._duration);
  }

  /**
   * Creates a new instance of AlwatrTokenGenerator.
   * @param config The configuration for the token generator.
   */
  constructor(public config: TokenGeneratorConfig) {
    this._duration = config.duration == 'infinite' ? 0 : parseDuration(config.duration);
  }

  /**
   * Generates a HOTP token based on the provided data for special duration.
   * @param data The data to generate the token from.
   * @returns The generated token.
   * @example
   * ```typescript
   * user.auth = tokenGenerator.generate(`${user.id}-${user.role}`);
   * ```
   */
  public generate(data: string): string {
    return this._generate(data, this._epoch);
  }

  /**
   * Verifies if a token is valid.
   * @param data The data used to generate the token.
   * @param token The token to verify.
   * @returns The validity of the token.
   * @example
   * ```typescript
   * const validateStatus = tokenGenerator.verify([user.id,user.role].join(), user.auth);
   * ```
   */
  public verify(data: string, token: string): TokenValidity {
    const epoch = this._epoch;
    if (token === this._generate(data, epoch)) return 'valid';
    if (this._duration == 0) return 'invalid';
    if (token === this._generate(data, epoch - 1)) return 'expired';
    return 'invalid';
  }

  /**
   * Generates a cryptographic token based on the provided data and epoch.
   * @param data - The data to be used in the token generation.
   * @param epoch - The epoch value to be used in the token generation.
   * @returns The generated cryptographic token.
   */
  protected _generate(data: string, epoch: number): string {
    return (
      this.config.prefix
      + createHmac(this.config.algorithm, data)
        .update(data + epoch)
        .digest(this.config.encoding)
    );
  }
}
