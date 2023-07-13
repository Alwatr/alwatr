import {
  AlwatrDirective,
  directive,
  html,
  noChange,
  map,
  ifDefined,
  classMap,
  nothing,
  type PartInfo,
} from '@alwatr/fract';
import {l10n} from '@alwatr/i18n2';

import './navigation-bar.scss';
import {alwatrIcon} from '../icon/icon.js';

import type {NavigationBarContent, NavigationBarItem} from './type.js';

export class AlwatrNavigationBarDirective extends AlwatrDirective {
  activeItemIndex: number;

  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-navigation-bar>');
    this.activeItemIndex = 0;
  }

  render(content?: NavigationBarContent | null, activeItemIndex = 0): unknown {
    this._logger.logMethodArgs?.('render', content);

    if (content == null) {
      this._logger.incident?.('render', 'invalid_content', 'content not defined');
      return noChange;
    }

    this.activeItemIndex = activeItemIndex;
    return html`<div class="navigation-bar">
    ${map(content.itemList, (item, index) => this._render_nav_item(item, index), this)}</div>`;
  }

  protected _render_nav_item(item: NavigationBarItem, index: number): unknown {
    return html`<a
      class=${classMap({'nav-item': true, 'active': this.activeItemIndex === index})}
      href=${ifDefined(item.href)}
      @click=${(): void => {this.activeItemIndex = index;}}
    >
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
