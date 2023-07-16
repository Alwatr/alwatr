import {AlwatrDynamicDirective, directive, html, type PartInfo} from '@alwatr/fract';
import {alwatrNavigationBar} from '@alwatr/ui-kit2/navigation-bar/navigation-bar.js';
import {alwatrTopAppBar} from '@alwatr/ui-kit2/top-app-bar/top-app-bar.js';

import {alwatrTourCard} from '../stuff/tour-card/tour-card.js';

class AlwatrDestCardList extends AlwatrDynamicDirective {
  protected _content?: unknown;
  protected _selectedCategory?: string;

  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-tour-dest-card-list>');
  }

  override render(): unknown {
    return html`${alwatrTopAppBar()}${alwatrTourCard()}${alwatrNavigationBar()}`;
  }
}

export const alwatrDestCardList = directive(AlwatrDestCardList);
