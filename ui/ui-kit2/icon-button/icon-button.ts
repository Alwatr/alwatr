import {AlwatrDirective, directive, html, noChange, nothing, type PartInfo} from '@alwatr/fract';
import {AlwatrSignal} from '@alwatr/signal2';

import {alwatrIcon} from '../icon/icon.js';

import type {MaybePromise, Stringifyable} from '@alwatr/type';

export interface AlwatrIconButtonContent {
  icon: MaybePromise<string>;
  flipRtl?: true;
  clickSignalId?: string;
  clickDetail?: Stringifyable;
  disabled?: boolean;
}

export class AlwatrIconButtonDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-icon-button>');
  }

  protected _dispatchSignal(signalName: string, signalDetail?: unknown): void {
    const signal = new AlwatrSignal({name: signalName});
    signal.notify(signalDetail);
  }

  render(options?: AlwatrIconButtonContent): unknown {
    if (options == null) return noChange;
    return html`<button
      ?disabled=${options.disabled}
      @click=${options.clickSignalId
        ? this._dispatchSignal.bind(this, options.clickSignalId, options.clickDetail)
        : nothing}>
      ${alwatrIcon({svg: options.icon, flipIconInRtl: options.flipRtl})}
    </button>`;
  }
}

export const alwatrIconButton = directive(AlwatrIconButtonDirective);
