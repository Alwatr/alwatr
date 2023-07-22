/* eslint-disable lit/attribute-value-entities */
import {contextConsumer} from '@alwatr/context';
import {
  AlwatrDynamicDirective,
  html,
  nothing,
  directive,
  noChange,
  classMap,
  map,
  type Part,
  type PartInfo,
} from '@alwatr/fract';
import {l10n} from '@alwatr/i18n2';

import {alwatrIcon} from '../icon/icon.js';

import type {AlwatrNavigationDrawerContext} from '../navigation-drawer/navigation-drawer.js';
import type {MaybePromise} from '@alwatr/type';

export interface NavigationContext {
  currentActive: string;
  navigationBar: AlwatrNavigationBarItem[];
  navigationDrawer: AlwatrNavigationDrawerContext;
}

export interface AlwatrNavigationBarItem {
  id: string;
  icon: MaybePromise<string>;
  selectedIcon: MaybePromise<string>;
  label?: string;
  labelKey?: string;
  href?: string;
  flipIconInRtl?: boolean;
}

export interface AlwatrNavigationBarOptions {
  contextSignalName: string;
}

export class AlwatrNavigationBarDirective extends AlwatrDynamicDirective {
  contextSignalName = 'navigation-context';
  navigationContext?: NavigationContext;

  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-navigation-bar>');
  }

  override update(_part: Part, props: unknown[]): void {
    super.update(_part, props);
    contextConsumer(this.contextSignalName).subscribe((detail) => {
      this.navigationContext = detail as unknown as NavigationContext;
      this.setValue(this.render(this.navigationContext.navigationBar));
    });
  }

  // override disconnected() {
  //   super.disconnected();
  //   contextConsumer(this.contextSignalName).unsubscribe();
  // }

  render(options?: AlwatrNavigationBarItem[]): unknown {
    this._logger.logMethodArgs?.('render', options);
    if (options == null) return noChange;

    return html` <footer class="grow-0 shrink-0 bg-surfaceContainer elevation-2">
      <nav class="flex max-w-screen-medium mx-auto select-none bg-surfaceContainer h-20 items-stretch [&>*]:grow">
        ${this._render_navigation_item_list(options)}
      </nav>
    </footer>`;
  }

  protected _render_navigation_item_list(items: AlwatrNavigationBarItem[]): unknown {
    return map(items, (item) => {
      return this._render_navigation_item(item, item.id === this.navigationContext?.currentActive);
    });
  }

  protected _render_navigation_item(item: AlwatrNavigationBarItem, selected?: boolean): unknown {
    return html` <button class="group flex flex-col pt-3 items-center justify-start">
      <div class="px-5 py-1 rounded-2xl text-onSurfaceVariant group-hover:bg-onSurface group-hover:bg-opacity-30
        [&>.alwatr-icon]:block [&>.alwatr-icon]:w-6 [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:text-onSurfaceVariant
        [&>.alwatr-icon]:group-hover:text-onSecondaryContainer [&>.alwatr-icon]:group-focus:text-onSecondaryContainer
        ${classMap({'bg-opacity-20 bg-onSurface': selected === true})}">
        ${alwatrIcon({svg: selected ? item.selectedIcon : item.icon, flipIconInRtl: item.flipIconInRtl})}
      </div>

      <div class="py-1 text-labelMedium text-onSurfaceVariant group-hover:text-onSurface
      ${classMap({'text-onSurface': selected === true})}">
        ${this._render_label(item)}
      </div>
    </button>`;
  }

  protected _render_label(item: AlwatrNavigationBarItem): unknown {
    if (item.label == null && item.labelKey == null) return nothing;
    return item.label || l10n.message(item.labelKey);
  }
}

export const alwatrNavigationBar = directive(AlwatrNavigationBarDirective);
