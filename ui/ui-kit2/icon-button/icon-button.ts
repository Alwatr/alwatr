import {AlwatrDirective, directive, html, noChange, type PartInfo} from '@alwatr/fract';

import {alwatrIcon} from '../icon/icon.js';

import type {Stringifyable, StringifyableRecord} from '@alwatr/type';

export interface AlwatrIconButtonContent extends StringifyableRecord {
  icon: string;
  flipRtl?: true;
  clickSignalId?: string;
  clickDetail?: Stringifyable;
  disabled?: boolean;
}

export class AlwatrIconButtonDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-icon-button>');
  }

  render(options?: AlwatrIconButtonContent): unknown {
    if (options == null) return noChange;
    return html`<button ?disabled=${options.disabled}>
      ${alwatrIcon({svg: options.icon, flipIconInRtl: options.flipRtl})}
    </button>
    `;
  }
}

export const alwatrIconButton = directive(AlwatrIconButtonDirective);
