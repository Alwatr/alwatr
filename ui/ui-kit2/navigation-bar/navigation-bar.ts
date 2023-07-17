import {AlwatrDirective, html, noChange, map, nothing, type PartInfo, directive} from '@alwatr/fract';
import {l10n} from '@alwatr/i18n2';

import {alwatrIcon} from '../icon/icon.js';

import type {MaybePromise} from '@alwatr/type';

export interface AlwatrNavigationBarItem {
  icon: MaybePromise<string>;
  label?: string;
  labelKey?: string;
  href?: string;
  flipIconInRtl?: boolean;
}

export interface AlwatrNavigationBarOptions {
  itemList: Array<AlwatrNavigationBarItem>;
}

export class AlwatrNavigationBarDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-navigation-bar>');
  }

  render(options?: AlwatrNavigationBarOptions): unknown {
    this._logger.logMethodArgs?.('render', options);
    if (options == null) return noChange;

    return html`<div class="sticky bottom-0 left-0 z-50 w-full h-16 bg-white
          border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div class="grid h-full max-w-lg grid-cols-3 mx-auto">
        ${this._render_navigation_item_list(options.itemList)}
      </div>
    </div>`;
  }

  protected _render_navigation_item_list(itemList: Array<AlwatrNavigationBarItem>): unknown {
    return map(itemList, (item) => this._render_navigation_item(item), this);
  }

  protected _render_navigation_item(item: AlwatrNavigationBarItem): unknown {
    return html`<button type="button" class="inline-flex flex-col items-center justify-center font-medium px-54
    hover:bg-gray-50 dark:hover:bg-gray-800 group">
      ${alwatrIcon({svg: item.icon, flipIconInRtl: item.flipIconInRtl})}${this._render_label(item)}
    </button>`;
  }

  protected _render_label(item: AlwatrNavigationBarItem): unknown {
    if (item.label == null && item.labelKey == null) return nothing;
    const label = item.label || l10n.message(item.labelKey);
    return html`<span
      class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
      ${label}
    </span>`;
  }
}

export const alwatrNavigationBar = directive(AlwatrNavigationBarDirective);
