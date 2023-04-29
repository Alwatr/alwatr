import {createLogger} from '@alwatr/logger';
import {random} from '@alwatr/math';
import {generateHash} from '@alwatr/math/crypto.js';
import {User} from '@alwatr/type';

import {AlwatrTokenGenerator} from './token.js';

import type {UserFactoryConfig} from './type.js';

export class AlwatrUserFactory {
  protected _logger = createLogger('alwatr-user-factory');

  private _$tokenGenerator = new AlwatrTokenGenerator(this.config);

  constructor(public config: UserFactoryConfig) {
    this._logger.logMethodArgs?.('constructor', config);
  }

  generateId(): string {
    const options = {
      algorithm: 'sha1',
      encoding: 'hex',
      outputLength: 10,
    } as const;
    const part1 = generateHash(random.uuid, options);
    const part2 = generateHash(part1, options);
    return part1 + part2;
  }

  verifyId(id: string): boolean {
    const options = {
      algorithm: 'sha1',
      encoding: 'hex',
      outputLength: 10,
    } as const;
    const part1 = id.substring(0, options.outputLength);
    const part2 = id.substring(options.outputLength, options.outputLength * 2);
    return part2 === generateHash(part1, options);
  }

  generateToken(user: User): string {
    return this._$tokenGenerator.generate(user.id + '-' + user.lpe);
  }

  verifyToken(user: User, token: string): boolean {
    return this.generateToken(user) === token;
  }
}
