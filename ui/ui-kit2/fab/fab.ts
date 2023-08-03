import {AlwatrDirective, classMap, directive, html, type PartInfo} from '@alwatr/fract';

import {icon, IconContent} from '../icon/icon.js';

export interface AlwatrFabContent {
  icon: IconContent

  /**
   * @defaultValue 'medium'
   */
  type?: 'small' | 'medium' | 'large';
}

export class AlwatrFabDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-fab>');
  }

  override render(content: AlwatrFabContent): unknown {
    this._logger.logMethod?.('render');
    content.type ??= 'medium';

    return html`<button
      class="flex h-10 w-10 cursor-pointer items-center justify-center bg-primaryContainer
      elevation-3 state-onPrimaryContainer hover:elevation-4 focus:elevation-3 active:elevation-3
      [&>.alwatr-icon]:w-6 [&>.alwatr-icon]:h-6
      ${classMap({
    'rounded-xl': content.type === 'small',
    'h-14 w-14 rounded-2xl': content.type === 'medium',
    'h-24 w-24 rounded-[1.75rem] [&>.alwatr-icon]:w-9 [&>.alwatr-icon]:h-9': content.type === 'large'})}"
    >
      ${icon(content.icon)}
    </button> `;
  }
}

export const alwatrFab = directive(AlwatrFabDirective);
