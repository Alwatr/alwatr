import {AlwatrDirective, directive, html, mapObject, when, type PartInfo, classMap, noChange} from '@alwatr/fract';
import {l10n} from '@alwatr/i18n2';

import {icon, IconContent} from '../icon/icon.js';

export interface NavigationDrawerContent {
  selected: string;
  title: string;
  itemList: Record<string, {
      label?: string;
      labelKey?: string;
      icon: IconContent;
      badge?: string;
    }
  >;
}

export class AlwatrNavigationDrawerDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-navigation-drawer>');
  }

  render(content?: NavigationDrawerContent): unknown {
    this._logger.logMethod?.('render');

    if (content === undefined) return noChange;

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

  protected _renderNavItems(content: NavigationDrawerContent): unknown {
    const navItemList = mapObject(content.itemList, (item, key) => {
      const _label = item.label ?? l10n.message(item.labelKey);
      return html`<li
        class="flex h-14 cursor-pointer select-none flex-nowrap items-center rounded-full
        hover:bg-secondaryContainer hover:text-onSecondaryContainer px-3 hover:stateHover-onSecondaryContainer
        [&>.alwatr-icon]:mx-1 [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6
        ${classMap({'stateActive-onSecondaryContainer text-onSecondaryContainer': content.selected === key})}"
        >${icon(item.icon)}${when(_label, () => html`<div class="mx-2 grow">${_label}</div>`)}
        ${when(item.badge != null, () => html`<div class="ml-3">${item.badge}</div>`)}</li>`;
    });

    return html`<ul class="text-labelLarge text-onSurfaceVariant">${navItemList}</ul>`;
  }
}

export const alwatrNavigationDrawer = directive(AlwatrNavigationDrawerDirective);
