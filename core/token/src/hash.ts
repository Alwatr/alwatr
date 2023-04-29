import {createHash, randomBytes, type BinaryLike} from 'node:crypto';

import {createLogger} from '@alwatr/logger';

import type {HashGeneratorConfig} from './type.js';

export class AlwatrHashGenerator {
  protected _logger = createLogger('alwatr-hash-generator');

  constructor(public config: HashGeneratorConfig) {
    this._logger.logMethodArgs?.('constructor', config);
  }

  random1(): string {
    return this.generate1(randomBytes(32));
  }

  random2(): string {
    return this.generate2(randomBytes(32));
  }

  /**
   * Generate hash from data.
   *
   * Example:
   *
   * ```js
   * const username = 'test';
   * const hash = generate1(username);
   * ```
   */
  generate1(data: BinaryLike): string {
    return createHash(this.config.algorithm, {outputLength: this.config.outputLength})
        .update(data)
        .digest(this.config.encoding);
  }

  /**
   * Verify hash with data and hash.
   *
   * Example:
   *
   * ```js
   * const username = 'test';
   * const userId = generate1(username);
   *
   * if (verify1(username, userId)) {
   *   console.log(userId, 'is valid');
   * }
   * ```
   */
  verify1(data: BinaryLike, hash: string): boolean {
    return hash === this.generate1(data);
  }

  /**
   * Generate `self-verified` hash from data.
   *
   * Example:
   *
   * ```js
   * const username = 'test';
   * const hash = generate2(username);
   * ```
   */
  generate2(data: BinaryLike): string {
    const part1 = this.generate1(data);
    const part2 = this.generate1(part1);
    return part1 + part2;
  }

  /**
   * Verify `self-verified` hash.
   *
   * Example:
   *
   * ```js
   * const username = 'test';
   * const userId = generate2(username);
   *
   * if (verify2(username, userId)) {
   *   console.log(userId, 'is valid');
   * }
   * ```
   */
  verify2(hash: string): boolean {
    const hashLen = hash.length;
    const part1 = hash.substring(0, hashLen / 2);
    const part2 = hash.substring(hashLen / 2, hashLen);
    return this.verify1(part1, part2);
  }
}
