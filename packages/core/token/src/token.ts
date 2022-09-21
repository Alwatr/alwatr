import {createHmac} from 'node:crypto';

import {alwatrRegisteredList, createLogger} from '@alwatr/logger';
import {parseDuration} from '@alwatr/math';

import type {TokenGeneratorConfig, TokenStatus} from './type.js';

export * from './type.js';

alwatrRegisteredList.push({
  name: '@alwatr/token',
  version: '{{ALWATR_VERSION}}',
});

export class AlwatrTokenGenerator {
  protected _logger = createLogger('alwatr-token-generator');
  private _duration: number;

  get epoch(): number {
    return Math.floor(Date.now() / this._duration);
  }

  constructor(public config: TokenGeneratorConfig) {
    this._logger.logMethodArgs('constructor', config);
    this._duration = parseDuration(config.duration);
  }

  protected _generate(data: string, epoch: number): string {
    return createHmac(this.config.algorithm, data)
        .update(data + epoch)
        .digest(this.config.encoding);
  }

  generate(data: string): string {
    return this._generate(data, this.epoch);
  }

  verify(data: string, token: string): TokenStatus {
    const epoch = this.epoch;
    if (token === this._generate(data, epoch)) {
      return 'valid';
    }
    else if (token === this._generate(data, epoch - 1)) {
      return 'expired';
    }
    else {
      return 'invalid';
    }
  }
}
