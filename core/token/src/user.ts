import {createLogger} from '@alwatr/logger';

import type {UserFactoryConfig} from './type.js';
import { AlwatrTokenGenerator } from './token.js';

export class AlwatrUserFactory {
  protected _logger = createLogger('alwatr-user-factory');

  private _$passwordTokengenerator = new AlwatrTokenGenerator(this.config)
  private _$userTokengenerator = new AlwatrTokenGenerator({
    algorithm: 'sha224',
    duration: '6m',
    encoding: 'base64url',
    secret: ''
  })

  constructor(public config: UserFactoryConfig) {
    this._logger.logMethodArgs?.('constructor', config);
  }

  generateId(): string {

  }
  verifyId(): boolean {

  }

  generateToken(): string {

  }
  verifyToken(): boolean {

  }


}
