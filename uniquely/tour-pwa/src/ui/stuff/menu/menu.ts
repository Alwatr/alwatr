import {AlwatrDirective, directive, html, map, noChange, type PartInfo} from '@alwatr/fract';

import './menu.scss';

import type {MenuItem} from './type.js';

export class AlwatrMenuDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-menu>');
  }

  render(content?: Array<MenuItem> | null): unknown {
    this._logger.logMethodArgs?.('render', content);

    if (content == null) {
      this._logger.incident?.('render', 'invalid_content', 'content not defined');
      return noChange;
    }

    return html`
      <div class="alwatr-menu">
        ${map(content, (item) => html`<div class="menu-item">${item.label}</div>`)}
      </div>
    `;
  }
}

export const alwatrMenu = directive(AlwatrMenuDirective);
