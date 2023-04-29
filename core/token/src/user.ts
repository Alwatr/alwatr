import {createLogger} from '@alwatr/logger';

import {AlwatrHashGenerator} from './hash.js';
import {AlwatrTokenGenerator} from './token.js';

import type {UserFactoryConfig} from './type.js';
import type {User} from '@alwatr/type';

export class AlwatrUserFactory {
  protected _logger = createLogger('alwatr-user-factory');

  private _$hashGenerator = new AlwatrHashGenerator(this.config.hashConfig);
  private _$tokenGenerator = new AlwatrTokenGenerator(this.config.tokenConfig);

  constructor(public config: UserFactoryConfig) {
    this._logger.logMethodArgs?.('constructor', config);
  }

  generateId(): string {
    return this._$hashGenerator.random2();
  }

  verifyId(id: string): boolean {
    return this._$hashGenerator.verify2(id);
  }

  generateToken(user: User): string {
    return this._$tokenGenerator.generate(user.id + '-' + user.lpe);
  }

  verifyToken(user: User, token: string): boolean {
    return this.generateToken(user) === token;
  }
}
