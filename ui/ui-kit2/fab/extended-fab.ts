import {AlwatrDirective, directive, html, nothing, type PartInfo} from '@alwatr/fract';

import {icon, IconContent} from '../icon/icon.js';

export interface ExtendedFabContent {
  label: string;
  icon?: IconContent;
}

export class AlwatrFabExtendedDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-extended-fab>');
  }

  override render(content: ExtendedFabContent): unknown {
    this._logger.logMethod?.('render');

    return html`<button
      class="flex h-14 min-w-[5rem] cursor-pointer select-none items-center justify-center
      gap-2 rounded-2xl bg-primaryContainer px-4 text-labelLarge elevation-3
      state-onPrimaryContainer hover:elevation-4 focus:elevation-3 active:elevation-3
      [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6"
    >${content.label}${content.icon ? icon(content.icon) : nothing}</button> `;
  }
}

export const alwatrFabExtended = directive(AlwatrFabExtendedDirective);
