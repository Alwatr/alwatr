import {AlwatrDirective, directive, html, noChange, map, type PartInfo, nothing} from '@alwatr/fract';
import {l10n} from '@alwatr/i18n2';

import './navigation-bar.scss';
import {alwatrIcon} from '../icon/icon.js';

import type {NavigationBarContent, NavigationBarItem} from './type.js';

export class AlwatrNavigationBarDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-navigation-bar>');
  }

  render(content?: NavigationBarContent | null): unknown {
    this._logger.logMethodArgs?.('render', content);

    if (content == null) {
      this._logger.incident?.('render', 'invalid_content', 'content not defined');
      return noChange;
    }

    return html`<div class="navigation-bar">${map(content.itemList, this._render_nav_item), this}</div>`;
  }

  protected _render_nav_item(item: NavigationBarItem): unknown {
    return html`<a href="/">
      ${alwatrIcon(item.icon, item.flipIconInRtl)}
      ${this._render_label(item)}
    </a>`;
  }

  protected _render_label(item: NavigationBarItem): unknown {
    if (item.label === undefined && item.labelKey === undefined) return nothing;
    const label = item.label || l10n.message(item.labelKey);
    return html`<div class="label">${label}</div>`;
  }
}

export const alwatrNavigationBar = directive(AlwatrNavigationBarDirective);
