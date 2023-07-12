import {AlwatrDirective, directive, html, map, noChange, type PartInfo} from '@alwatr/fract';

import './category-tab-bar.scss';

import type {TabBarContent} from './type.js';

export class AlwatrCategoryTabBarDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-category-tab-bar>');
  }

  render(content?: TabBarContent | null): unknown {
    this._logger.logMethodArgs?.('render', content);

    if (content == null) {
      this._logger.incident?.('render', 'invalid_content', 'content not defined');
      return noChange;
    }

    return html`
      <div class="alwatr-tab-bar">
        ${map(content.itemList, (item) => html`<div class="tab">${item.title}</div>`)}
      </div>
    `;
  }
}

export const alwatrCategoryTabBar = directive(AlwatrCategoryTabBarDirective);
