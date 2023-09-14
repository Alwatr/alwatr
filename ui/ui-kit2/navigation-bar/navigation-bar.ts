import {AlwatrDirective, html, noChange, directive, mapObject, when, type PartInfo} from '@alwatr/fract';
import {l10n} from '@alwatr/i18n2';

import {icon, type IconContent} from '../icon/icon.js';

export interface NavigationBarContent {
  selected: string;
  itemList: Record<string, {
      label?: string;
      labelKey?: string;
      icon: IconContent;
      badge?: string;
    }
  >;
}

export class AlwatrNavigationBarDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-navigation-bar>');
  }

  render(content?: NavigationBarContent): unknown {
    this._logger.logMethodArgs?.('render', content);
    if (content === undefined) return noChange;

    return html`
      <footer class="shrink-0 grow-0 bg-surfaceContainer elevation-2"><nav
          class="mx-auto flex h-20 max-w-screen-medium cursor-pointer select-none
          items-stretch text-labelMedium text-onSurfaceVariant">${this._renderNavItems(content)}</nav></footer>`;
  }

  protected _renderNavItems(content: NavigationBarContent): unknown {
    const navItemList = mapObject(content.itemList, (item, key) => {
      const _label = item.label ?? l10n.message(item.labelKey);
      return html`<a aria-selected="${content.selected === key}"
        class="group flex grow flex-col items-center justify-start pt-3
        hover:text-onSurface aria-selected:pointer-events-none"
      ><div
        class="rounded-2xl px-5 py-1 [&>.alwatr-icon]:block [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6
        group-hover:stateHover-onSurfaceVariant group-aria-selected:bg-secondaryContainer
        group-active:stateActive-onSurfaceVariant group-aria-selected:text-onSecondaryContainer"
        >${icon(item.icon)}</div>${when(_label, () => html`<div class="py-1 group-aria-selected:text-onSurface">
          ${_label}</div>`)}</a>`;
    });

    return navItemList;
  }
}

export const alwatrNavigationBar = directive(AlwatrNavigationBarDirective);
