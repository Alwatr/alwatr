import {createLogger} from '@alwatr/logger';

import {PartType, type PartInfo, AsyncDirective, Part} from './lit-html.js';

export abstract class AlwatrDynamicDirective extends AsyncDirective {
  protected _logger;

  constructor(partInfo: PartInfo, debugName: string) {
    super(partInfo);
    this._logger = createLogger(debugName);
    this._logger.logMethodArgs?.('constructor', Object.keys(PartType)[partInfo.type - 1]);
  }

  override setValue(value: unknown): void {
    this._logger.logMethodArgs?.('setValue', value);
    super.setValue(value);
  }

  override update(_part: Part, props: unknown[]): unknown {
    this._logger.logMethodArgs?.('update', props);
    return this.render(...props);
  }

  protected override reconnected(): void {
    this._logger.logMethod?.('reconnected');
    super.reconnected();
  }

  protected override disconnected(): void {
    this._logger.logMethod?.('disconnected');
    super.disconnected();
  }
}
