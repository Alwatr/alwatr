import {AlwatrDirective, directive, html, map, noChange, type PartInfo} from '@alwatr/fract';

import type {TabBarContent} from './type.js';

export class AlwatrCategoryTabBarDirective extends AlwatrDirective {
  activeTabIndex: number;

  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-category-tab-bar>');
    this.activeTabIndex = 0;
  }

  render(content?: TabBarContent | null): unknown {
    this._logger.logMethodArgs?.('render', content);

    if (content == null) {
      this._logger.incident?.('render', 'invalid_content', 'content not defined');
      return noChange;
    }

    return html` <div class="alwatr-tab-bar">${map(content.itemList, this._renderItem)}</div> `;
  }

  protected _renderItem(_item: Record<string, unknown>): unknown {
    return html` <div>${_item}...</div>`;
  }
}

export const alwatrCategoryTabBar = directive(AlwatrCategoryTabBarDirective);
