import {createLogger} from '@alwatr/logger';

import {PartType, type PartInfo, AsyncDirective, Part} from './lit.js';

export class AlwatrDynamicDirective extends AsyncDirective {
  protected _logger = createLogger(this.constructor.name);

  constructor(_partInfo: PartInfo) {
    super(_partInfo);
    this._logger.logMethodArgs?.('constructor', Object.keys(PartType)[_partInfo.type - 1]);
  }

  override setValue(value: unknown): void {
    super.setValue(value);
    this._logger.logMethodArgs?.('setValue', value);
  }

  override update(_part: Part, props: Array<unknown>): unknown {
    this._logger.logMethodArgs?.('update', props);
    return this.render(...props);
  }

  render(...props: unknown[]): unknown {
    return this._logger.logMethodArgs?.('render', props);
  }

  protected override reconnected(): void {
    super.reconnected();
    this._logger.logMethod?.('reconnected');
  }

  protected override disconnected(): void {
    super.disconnected();
    this._logger.logMethod?.('disconnected');
  }
}
