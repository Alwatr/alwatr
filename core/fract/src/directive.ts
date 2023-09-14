import {createLogger, globalAlwatr} from '@alwatr/logger';

import {Directive, PartType, type PartInfo, type Part} from './lit-html.js';

globalAlwatr.registeredList.push({
  name: '@alwatr/fract',
  version: _ALWATR_VERSION_,
});

export abstract class AlwatrDirective extends Directive {
  protected _logger;

  constructor(partInfo: PartInfo, debugName: string) {
    super(partInfo);
    this._logger = createLogger(debugName);
    this._logger.logMethodArgs?.('constructor', Object.keys(PartType)[partInfo.type - 1]);
  }

  override update(_part: Part, props: unknown[]): unknown {
    this._logger.logMethodArgs?.('update', props);
    return this.render(...props);
  }
}
