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

    return html`<div
        class="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200
          dark:bg-gray-800 dark:border-gray-700"
      >
      <ul class="space-y-2">${map(content, (item) => html`<div class="menu-item">${item.label}</div>`)}</ul>
    </div>`;
  }

  renderSingleMenuItem(item: Record<string, unknown>): unknown {
    this._logger.logMethodArgs?.('renderMenuItem', item);
    return html`<li>
      <a
        href="#"
        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg
          dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">...</a>
    </li>`;
  }

  renderMenuItemWithChildren(item: Record<string, unknown>): unknown {
    this._logger.logMethodArgs?.('renderMenuItem', item);
    return html`<li>
      <button
        type="button"
        class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition
          duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        aria-controls="dropdown-pages"
        data-collapse-toggle="dropdown-pages">
        <!--icon of item-->
        <span class="flex-1 ml-3 text-left whitespace-nowrap">...</span>
        <!--arrow icon-->
      </button>
      <ul id="dropdown-pages" class="hidden py-2 space-y-2">
        ${map(item.children, (_child) => html`<li>
          <a
            href="#"
            class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg
              transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            ...
          </a>
        </li>`, this)}
      </ul>
    </li>`;
  }

  renderFooter(footerData: Record<string, unknown>): unknown {
    this._logger.logMethodArgs?.('renderMenuItem', footerData);
    return html`<div class="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white
        dark:bg-gray-800 z-20 border-r border-gray-200 dark:border-gray-700"
      >
      ...
    </div>`;
  }
}

export const alwatrMenu = directive(AlwatrMenuDirective);
