import {createHmac} from 'node:crypto';

import {parseDuration} from '@alwatr/math';

import type {TokenGeneratorConfig, TokenStatus} from './type.js';

/**
 * Secure authentication HOTP token generator (HMAC-based One-Time Password algorithm).
 */
export class AlwatrTokenGenerator {
  protected _duration: number | null;

  get epoch(): number {
    return this._duration == null ? 0 : Math.floor(Date.now() / this._duration);
  }

  constructor(public config: TokenGeneratorConfig) {
    this._duration = config.duration == null ? null : parseDuration(config.duration);
  }

  protected _generate(data: string, epoch: number): string {
    return createHmac(this.config.algorithm, data)
        .update(data + epoch)
        .digest(this.config.encoding);
  }

  /**
   * Generate HOTP token from data base on special duration.
   *
   * ```ts
   * user.auth = tokenGenerator.generate(`${user.id}-${user.role}`);
   * ```
   */
  generate(data: string): string {
    return this._generate(data, this.epoch);
  }

  /**
   * Token verification.
   *
   * ```ts
   * const validateStatus = tokenGenerator.verify(`${user.id}-${user.role}`, user.auth);
   * ```
   */
  verify(data: string, token: string): TokenStatus {
    const epoch = this.epoch;
    if (token === this._generate(data, epoch)) {
      return 'valid';
    }
    else if (this._duration == null) {
      return 'invalid';
    }
    else if (token === this._generate(data, epoch - 1)) {
      return 'expired';
    }
    else {
      return 'invalid';
    }
  }
}
