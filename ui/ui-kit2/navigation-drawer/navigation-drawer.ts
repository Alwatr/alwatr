/* eslint-disable lit/attribute-value-entities */
import {AlwatrDirective, directive, html, mapObject, when, type PartInfo, classMap} from '@alwatr/fract';

import {alwatrIcon, AlwatrIconOptions} from '../icon/icon.js';

export interface NavigationBarContent {
  selected: string;
  title: string;
  itemList: Record<
    string,
    {
      label: string;
      icon: AlwatrIconOptions;
      badge?: string;
    }
  >;
}

export class AlwatrNavigationDrawerDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-navigation-drawer>');
  }

  render(content: NavigationBarContent): unknown {
    this._logger.logMethod?.('render');

    return html`
      <aside
        id="navigationDrawer"
        class="fixed bottom-0 left-0 top-0 z-modal w-[22.5rem] translate-x-full transform-gpu overflow-clip
        rounded-e-2xl bg-surfaceContainerLow transition-transform duration-300 ease-in will-change-transform elevation-1
        rtl:left-auto rtl:right-0 extended:translate-x-0 extended:rounded-none extended:transition-none
        extended:will-change-auto extended:elevation-0 [&.opened]:translate-x-0 [&.opened]:ease-out"
      >
        <nav class="flex h-full flex-col bg-surfaceContainerLow px-3 py-3 elevation-1">
          <h2 class="mx-6 py-7 text-titleSmall text-onSurfaceVariant">${content.title}</h2>
          ${this._renderNavItems(content)}
        </nav>
      </aside>
    `;
  }

  protected _renderNavItems(content: NavigationBarContent): unknown {
    return html`<ul class="text-labelLarge text-onSurfaceVariant">${this._renderNavItem(content)}</ul>
    `;
  }

  protected _renderNavItem(content: NavigationBarContent): unknown {
    return mapObject(content.itemList, (item, key) => html`<li
      class="flex h-14 cursor-pointer select-none flex-nowrap items-center rounded-full
      bg-secondaryContainer px-3 text-onSecondaryContainer
      [&>.alwatr-icon]:mx-1 [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6
      ${classMap({'stateActive-secondaryContainer': content.selected === key})}"
      >${alwatrIcon(item.icon)}<div class="mx-2 grow">${item.label}</div>
      ${when(item.badge != null, () => html`<div class="ml-3">${item.badge}</div>`)}</li>`);
  }
}

export const alwatrNavigationDrawer = directive(AlwatrNavigationDrawerDirective);
