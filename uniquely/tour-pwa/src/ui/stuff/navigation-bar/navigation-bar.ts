import {AlwatrDirective, directive, html, noChange, map, nothing, type PartInfo} from '@alwatr/fract';
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

    return html`<div class="sticky bottom-0 left-0 z-50 w-full h-16 bg-white
          border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div class="grid h-full max-w-lg grid-cols-3 mx-auto">
        ${map(content.itemList, (item) => this._render_nav_item(item), this)}
      </div>
    </div>`;
  }

  protected _render_nav_item(item: NavigationBarItem): unknown {
    return html`<button type="button" class="inline-flex flex-col items-center justify-center font-medium px-54
         hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >${alwatrIcon(item.icon, item.flipIconInRtl)}${this._render_label(item)}</button>`;
  }

  protected _render_label(item: NavigationBarItem): unknown {
    if (item.label === undefined && item.labelKey === undefined) return nothing;
    const label = item.label || l10n.message(item.labelKey);
    return html`<span class="text-sm text-gray-500 dark:text-gray-400
    group-hover:text-blue-600 dark:group-hover:text-blue-500"
      >${label}</span>`;
  }
}

export const alwatrNavigationBar = directive(AlwatrNavigationBarDirective);
