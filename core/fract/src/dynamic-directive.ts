import {createLogger} from '@alwatr/logger';

import {PartType, type PartInfo, AsyncDirective} from './lit.js';

export class AlwatrDynamicDirective extends AsyncDirective {
  protected _logger = createLogger(this.constructor.name);

  constructor(_partInfo: PartInfo) {
    super(_partInfo);
    this._logger.logMethodArgs?.('constructor', Object.keys(PartType)[_partInfo.type - 1]);
  }

  override update(_part: Part, props: Array<unknown>): unknown {
    this._logger.logMethodArgs?.('update', props);
    return this.render(...props);
  }
}
