import {createHash, type BinaryLike} from 'node:crypto';

import {createLogger} from '@alwatr/logger';

import type {HashGeneratorConfig, HashStatus} from './type.js';

export type {HashGeneratorConfig, HashStatus};

export class AlwatrHashGenerator {
  protected _logger = createLogger('alwatr-hash-generator');

  constructor(public config: HashGeneratorConfig) {
    this._logger.logMethodArgs?.('constructor', config);
  }

  /**
   * Generate random bytes in nodejs
   */


  // random1(): string {
  //   return this.generate1();
  // }

  /**
   * Generate hash from data.
   *
   * Example:
   *
   * ```js
   * const username = 'test';
   * const hash = generate(username);
   * ```
   */
  generate1(data: BinaryLike): string {
    return createHash(this.config.algorithm, {outputLength: this.config.outputLength})
        .update(data)
        .digest(this.config.encoding);
  }

  /**
   * Verify hash with data and token
   *
   * Example:
   *
   * ```js
   * const username = 'test';
   * const hash = generate(username);
   *
   * if (verify(username, hash)) {
   *   console.log(username, 'is valid');
   * }
   * ```
   */
  verify1(data: BinaryLike, hash: string): boolean {
    return hash === this.generate1(data);
  }

  /**
   * Generate hash from data.
   *
   * Example:
   *
   * ```js
   * const username = 'test';
   * const hash = generate(username);
   * ```
   */
  generate2(data: BinaryLike): string {
    const part1 = this.generate1(data);
    const part2 = this.generate1(part1);
    return part1 + part2;
  }

  /**
   * Verify hash with data.
   *
   * Example:
   *
   * ```js
   * const username = 'test';
   * const hash = generate(username);
   *
   * if (verify(username, hash) === 'valid') {
   *   console.log(username, 'is valid');
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
