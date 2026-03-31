import {createLogger, definePackage} from '@alwatr/logger';

import {Directive, PartType, type PartInfo, type Part} from './lit-html.js';

definePackage('@alwatr/fract', '1.x');

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
