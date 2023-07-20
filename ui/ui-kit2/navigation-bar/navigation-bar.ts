/* eslint-disable lit/attribute-value-entities */
import {contextConsumer} from '@alwatr/context';
import {
  AlwatrDynamicDirective,
  html,
  nothing,
  directive,
  noChange,
  mapObject,
  type Part,
  type PartInfo,
} from '@alwatr/fract';
import {l10n} from '@alwatr/i18n2';

import {alwatrIcon} from '../icon/icon.js';

import type {MaybePromise, StringifyableRecord} from '@alwatr/type';

export interface NavigationContext {
  currentActive: string;
  navigationBar: Record<string, AlwatrNavigationBarItem>
}

export interface AlwatrNavigationBarItem {
  icon: MaybePromise<string>;
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
  navigationContext?: Record<string, AlwatrNavigationBarItem>;

  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-navigation-bar>');
    // this.contextSignalName = options.contextSignalName;
  }

  override update(_part: Part, props: unknown[]): void {
    super.update(_part, props);
    contextConsumer<StringifyableRecord>(this.contextSignalName).subscribe((detail) => {
      this.navigationContext = detail.navigationBar as unknown as Record<string, AlwatrNavigationBarItem>;
      this.setValue(this.render(this.navigationContext));
    });
  }

  // render(options?: AlwatrNavigationBarOptions): unknown {
  render(options?: Record<string, AlwatrNavigationBarItem>): unknown {
    this._logger.logMethodArgs?.('render', options);
    if (options == null) return noChange;

    return html` <footer class="grow-0 shrink-0 bg-surfaceContainer elevation-2">
      <nav class="flex max-w-screen-medium mx-auto select-none bg-surfaceContainer h-20 items-stretch [&>*]:grow">
        ${mapObject(options, (item) => this._render_navigation_item(item), this)}
      </nav>
    </footer>`;
  }

  protected _render_navigation_item(item: AlwatrNavigationBarItem): unknown {
    return html` <button aria-selected="false" class="group flex flex-col pt-3 items-center justify-start">
      <div class="px-5 py-1 rounded-2xl w-6 h-6 text-onSurfaceVariant group-hover:bg-onSurface group-hover:bg-opacity-30
            group-focus:bg-onSurface group-focus:bg-opacity-20 [[aria-selected=true]_&]:bg-onSurface">
        ${alwatrIcon({svg: item.icon, flipIconInRtl: item.flipIconInRtl})}
      </div>

      <div class="py-1 text-labelMedium text-onSurfaceVariant group-hover:text-onSurface group-focus:text-onSurface">
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
