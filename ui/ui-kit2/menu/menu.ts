import {AlwatrDirective, directive, html, map, noChange, type PartInfo} from '@alwatr/fract';

import type {MaybePromise} from '@alwatr/type';

export interface MenuItem {
  id: string;
  label: string;
  icon?: MaybePromise<string>;
  children: MenuItem[];
}

export class AlwatrMenuDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-menu>');
  }

  render(content?: MenuItem[]): unknown {
    this._logger.logMethodArgs?.('render', content);

    if (content === undefined) {
      this._logger.incident?.('render', 'null_content', 'content not defined');
      return noChange;
    }

    return html`<div
      class="h-full overflow-y-auto border-r border-gray-200 bg-white px-3 py-5 dark:border-gray-700 dark:bg-gray-800"
    >
      <ul class="space-y-2">
        ${map(content, (item) => html`<li class="menu-item">${item.label}</li>`)}
      </ul>
    </div>`;
  }

  renderSingleMenuItem(item: MenuItem): unknown {
    this._logger.logMethodArgs?.('renderMenuItem', item);
    return html`<li>
      <a
        href="#"
        class="group flex items-center rounded-lg p-2 text-base font-normal
          text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >...</a
      >
    </li>`;
  }

  renderMenuItemWithChildren(item: MenuItem): unknown {
    this._logger.logMethodArgs?.('renderMenuItem', item);
    return html`<li>
      <button
        type="button"
        class="group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900
          transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        aria-controls="dropdown-pages"
        data-collapse-toggle="dropdown-pages"
      >
        <!--icon of item-->
        <span class="ml-3 flex-1 whitespace-nowrap text-left">...</span>
        <!--arrow icon-->
      </button>
      <ul id="dropdown-pages" class="hidden space-y-2 py-2">
        ${map(
      item.children,
      (_child) =>
        html`<li>
              <a
                href="#"
                class="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal
              text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                ${_child.label}
              </a>
            </li>`,
      this,
  )}
      </ul>
    </li>`;
  }

  renderFooter(footerData: Record<string, unknown>): unknown {
    this._logger.logMethodArgs?.('renderMenuItem', footerData);
    return html`<div
      class="absolute bottom-0 left-0 z-20 hidden w-full justify-center space-x-4 border-r border-gray-200
        bg-white p-4 dark:border-gray-700 dark:bg-gray-800 lg:flex"
    >
      ...
    </div>`;
  }
}

export const alwatrMenu = directive(AlwatrMenuDirective);
