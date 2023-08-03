import {AlwatrDirective, classMap, directive, html, mapObject, noChange, when, type PartInfo} from '@alwatr/fract';
import {l10n} from '@alwatr/i18n2';

import {icon, type IconContent} from '../icon/icon.js';

export interface AlwatrNavigationRailContent {
  selected: string;
  itemList: Record<string, {
      label?: string;
      labelKey?: string;
      icon: IconContent;
      badge?: string;
    }
  >;
}

export class AlwatrNavigationRailDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-navigation-rail>');
  }

  render(content?: AlwatrNavigationRailContent): unknown {
    this._logger.logMethodArgs?.('render', content);
    if (content === undefined) return noChange;

    return html`<aside
      id="navigationRail"
      class="fixed bottom-0 left-0 top-0 z-modal w-20 translate-x-full transform-gpu overflow-clip
      rounded-e-2xl bg-surfaceContainerLow transition-transform duration-300 ease-in will-change-transform
      elevation-1 rtl:left-auto rtl:right-0 medium:translate-x-0 medium:rounded-none medium:transition-none
      medium:will-change-auto medium:elevation-0 extended:hidden [&.opened]:translate-x-0 [&.opened]:ease-out"
      ><nav class="flex h-full flex-col justify-around bg-surfaceContainerLow elevation-1">
        ${this._renderNavItemList(content)}</nav></aside>`;
  }

  protected _renderNavItemList(content: AlwatrNavigationRailContent): unknown {
    const itemList = mapObject(content.itemList, (item, key) => {
      const _label = item.label ?? l10n.message(item.labelKey);
      return html`<li class="w-84 group mx-3 flex h-14 cursor-pointer select-none flex-col flex-nowrap items-center">
          <div
            class="flex h-8 w-14 flex-col items-center justify-around rounded-2xl
            group-hover:bg-secondaryContainer group-hover:stateHover-onSecondaryContainer
            [&>.alwatr-icon]:mx-1 [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6
            [&>.alwatr-icon]:group-hover:text-onSecondaryContainer
            ${classMap({'[&>.alwatr-icon]:text-onSecondaryContainer': key === content.selected,
    'stateActive-onSecondaryContainer': key === content.selected})}"
            >${icon(item.icon)}</div>
          ${when(_label, () => html`<div class="mx-2 grow group-hover:text-onSecondaryContainer
            ${classMap({'text-onSecondaryContainer': key === content.selected})}"
          >${_label}</div>`)}</li>`;
    });

    return html`
      <ul class="flex flex-col gap-3 text-labelLarge text-onSurfaceVariant">
        ${itemList}
      </ul>
    `;
  }
}

export const alwatrNavigationRail = directive(AlwatrNavigationRailDirective);
