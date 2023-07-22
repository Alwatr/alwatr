/* eslint-disable lit/attribute-value-entities */
import {contextConsumer} from '@alwatr/context';
import {
  AlwatrDynamicDirective,
  classMap,
  directive,
  html,
  map,
  noChange,
  nothing,
  type Part,
  type PartInfo,
} from '@alwatr/fract';
import {l10n} from '@alwatr/i18n2';

import {alwatrIcon} from '../icon/icon.js';

import type {NavigationContext} from '../navigation-bar/navigation-bar.js';
import type {MaybePromise} from '@alwatr/type';

export interface AlwatrNavigationDrawerContext {
  mainItems: AlwatrNavigationDrawerItem[];
  headline?: string;
}

export interface AlwatrNavigationDrawerItem {
  id: string;
  icon: MaybePromise<string>;
  selectedIcon: MaybePromise<string>;
  label?: string;
  labelKey?: string;
  href?: string;
  flipIconInRtl?: boolean;
  badge: unknown;
}

export interface AlwatrNavigationDrawerOptions {
  contextSignalName: string;
}

export class AlwatrNavigationDrawerDirective extends AlwatrDynamicDirective {
  contextSignalName = 'navigation-context';
  navigationContext?: NavigationContext;

  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-navigation-drawer>');
  }


  override update(_part: Part, props: unknown[]): void {
    super.update(_part, props);
    contextConsumer(this.contextSignalName).subscribe((detail) => {
      this.navigationContext = detail as unknown as NavigationContext;
      this.setValue(this.render(this.navigationContext.navigationDrawer));
    });
  }

  // override disconnected() {
  //   super.disconnected();
  //   contextConsumer(this.contextSignalName).unsubscribe();
  // }

  render(options?: AlwatrNavigationDrawerContext): unknown {
    this._logger.logMethod?.('render');
    if (options == null) return noChange;

    return html`
      <div class="fixed inset-0 bg-scrim opacity-50"></div>
      <nav class="w-[360px] h-full flex flex-col bg-surfaceContainerLow gap-3
      elevation-1 rounded-e-3xl box-border px-7 z-fixed absolute">
      <h2 class="text-onSurfaceVariant text-titleSmall mt-5">${options.headline}</h2>
      ${this._render_primary_item_list(options.mainItems)}
    </nav>
    `;
  }

  protected _render_primary_item_list(items: AlwatrNavigationDrawerItem[]): unknown {
    this._logger.logMethodArgs?.('why', items);
    return map(items, (item) => {
      return this._render_primary_item(item, item.id === this.navigationContext?.currentActive);
    });
  }

  protected _render_primary_item(options: AlwatrNavigationDrawerItem, selected?: boolean): unknown {
    return html`
      <button
        class="group rounded-full w-84 h-[56px] flex flex-nowrap ps-4 pe-6
          items-center gap-3 cursor-pointer select-none
          hover:bg-onSecondaryContainer hover:bg-opacity-10
          [&>.alwatr-icon]:group-hover:text-onSecondaryContainer
          [&>.alwatr-icon]:w-6 [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:text-onSurfaceVariant
          ${classMap({'bg-secondaryContainer [&>.alwatr-icon]:text-onSecondaryContainer': selected === true})}">
        ${alwatrIcon({svg: selected ? options.selectedIcon : options.icon, flipIconInRtl: options.flipIconInRtl})}
        <span class="grow text-labelLarge group-hover:text-onSecondaryContainer
          ${classMap({'text-onSecondaryContainer': selected === true})}">
          ${this._render_label(options)}
        </span>
        <span>${options.badge}</span>
      </button>
    `;
  }

  protected _render_label(item: AlwatrNavigationDrawerItem): unknown {
    if (item.label == null && item.labelKey == null) return nothing;
    return item.label || l10n.message(item.labelKey);
  }
}

export const alwatrNavigationDrawer = directive(AlwatrNavigationDrawerDirective);
