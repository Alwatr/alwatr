import {createLogger, globalAlwatr} from '@alwatr/logger';

import {Directive, PartType, type PartInfo, type Part} from './lit.js';

globalAlwatr.registeredList.push({
  name: '@alwatr/fract',
  version: _ALWATR_VERSION_,
});

export class AlwatrDirective extends Directive {
  protected _logger = createLogger(this.constructor.name);

  constructor(_partInfo: PartInfo) {
    super(_partInfo);
    this._logger.logMethodArgs?.('constructor', Object.keys(PartType)[_partInfo.type - 1]);
  }

  override update(_part: Part, props: Array<unknown>): unknown {
    this._logger.logMethodArgs?.('update', props);
    return this.render(...props);
  }

  render(...props: unknown[]): unknown {
    return this._logger.logMethodArgs?.('render', props);
  }
}
