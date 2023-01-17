import {createHmac} from 'node:crypto';

import {createLogger, globalAlwatr} from '@alwatr/logger';
import {parseDuration} from '@alwatr/math';

import type {TokenGeneratorConfig, TokenStatus, DigestAlgorithm} from './type.js';

export type {TokenGeneratorConfig, TokenStatus, DigestAlgorithm};

globalAlwatr.registeredList.push({
  name: '@alwatr/token',
  version: '{{ALWATR_VERSION}}',
});

export class AlwatrTokenGenerator {
  protected _logger = createLogger('alwatr-token-generator');
  private _duration: number | null;

  get epoch(): number {
    return this._duration == null
      ? 0
      : Math.floor(Date.now() / this._duration);
  }

  constructor(public config: TokenGeneratorConfig) {
    this._logger.logMethodArgs('constructor', config);
    this._duration = config.duration == null ? null : parseDuration(config.duration);
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
