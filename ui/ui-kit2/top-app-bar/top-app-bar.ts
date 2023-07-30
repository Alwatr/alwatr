import {AlwatrDirective, directive, html, noChange, map, type PartInfo} from '@alwatr/fract';
import {l10n} from '@alwatr/i18n2';
import {defaultExport} from '@alwatr/util';

import {alwatrIcon} from '../icon/icon.js';
import {type AlwatrIconButtonContent} from '../icon-button/icon-button.js';

const arrowBackOutlineIcon = defaultExport(import('@alwatr/icon/svg/arrow-back-outline.svg'));

export interface AlwatrTopAppBarContent {
  /**
   * @defaultValue small
   */
  type?: 'center' | 'small' | 'medium' | 'large';

  headline?: string;

  /**
   * @defaultValue loading
   */
  headlineKey?: string;

  /**
   * @defaultValue {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'}
   */
  startIcon?: AlwatrIconButtonContent;

  flipIconInRtl?: AlwatrIconButtonContent;
  endIconList?: AlwatrIconButtonContent[];

  /**
   * @defaultValue 2
   */
  tinted?: number;

  /**
   * @defaultValue 0
   */
  elevated?: number;
}

export class AlwatrTopAppBarDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-top-app-bar>');
  }

  render(content?: AlwatrTopAppBarContent): unknown {
    this._logger.logMethodArgs?.('render', content);

    if (content === undefined) return noChange;
    content.type ??= 'small';
    content.headlineKey ??= 'loading';
    content.startIcon ??= {svg: arrowBackOutlineIcon, flipIconInRtl: true, clickSignalId: 'back-click-event'};
    content.endIconList ??= [];
    content.tinted ??= 2;
    content.elevated ??= 0;

    return html`<header>
      <div
        class="scroll z-sticky flex h-16 shrink-0 grow-0 select-none items-center
          bg-surface px-1 text-surface [&.scroll]:bg-surfaceContainer"
      >
        <button class="inline-block cursor-pointer rounded-full p-3 text-onSurface
          [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6">
          ${alwatrIcon(content.startIcon)}
        </button>
        ${this._renderTitle(content)}
        ${this._renderEndIconList(content.endIconList)}
        ${this._renderHeadline(content)}
      </div>
    </header> `;
  }

  protected _renderTitle(content: AlwatrTopAppBarContent): unknown {
    if (content.type === 'center' || content.type === 'small') {
      const headline = content.headline || l10n.message(content.headlineKey);
      return html` <div class="grow overflow-clip whitespace-nowrap px-1 text-center text-titleLarge text-onSurface">
          ${headline}
        </div>`;
    }
    return;
  }

  protected _renderHeadline(content: AlwatrTopAppBarContent): unknown {
    if (content.type === 'medium' || content.type === 'large') {
      const headline = content.headline || l10n.message(content.headlineKey);
      return html`<div class="scroll flex h-24 items-end overflow-clip whitespace-nowrap bg-surface px-4 pb-7
        text-right text-headlineMedium text-onSurface [&.scroll]:bg-surfaceContainer"
      >
        <div>${headline}</div>
      </div>`;
    }
    return;
  }

  protected _renderEndIconList(iconList: AlwatrIconButtonContent[]): unknown {
    return map(iconList, (iconOptions) => {
      return html`<button
        class="inline-block cursor-pointer rounded-full p-3 text-onSurfaceVariant
          [&>.alwatr-icon]:h-6 [&>.alwatr-icon]:w-6"
      >
        ${alwatrIcon({svg: iconOptions.svg})}
      </button> `;
    });
  }
}

export const alwatrTopAppBar = directive(AlwatrTopAppBarDirective);
