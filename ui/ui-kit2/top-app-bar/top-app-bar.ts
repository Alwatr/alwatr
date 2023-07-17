import {AlwatrDirective, directive, html, noChange, nothing, map, type PartInfo} from '@alwatr/fract';
import {l10n} from '@alwatr/i18n2';
import {defaultExport} from '@alwatr/util';

import {alwatrIconButton, type AlwatrIconButtonContent} from '../icon-button/icon-button.js';

const arrowBackOutlineIcon = defaultExport(import('@alwatr/icon/svg/arrow-back-outline.svg'));

export interface AlwatrTopAppBarOptions {
  /**
   * @default small
   */
  type?: 'center' | 'small' | 'medium' | 'large';

  headline?: string;

  /**
   * @default loading
   */
  headlineKey?: string;

  /**
   * @default {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'}
   */
  startIcon?: AlwatrIconButtonContent;

  /**
   * @default []
   */
  endIconList?: Array<AlwatrIconButtonContent>;

  /**
   * @default 2
   */
  tinted?: number;

  /**
   * @default 0
   */
  elevated?: number;
}

export class AlwatrTopAppBarDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-top-app-bar>');
  }

  render(options?: AlwatrTopAppBarOptions): unknown {
    this._logger.logMethodArgs?.('render', options);

    if (options == null) return noChange;
    options.type ??= 'small';
    options.headlineKey ??= 'loading';
    options.startIcon ??= {icon: arrowBackOutlineIcon, flipRtl: true, clickSignalId: 'back-click-event'};
    options.endIconList ??= [];
    options.tinted ??= 2;
    options.elevated ??= 0;

    const headline = options.headline || l10n.message(options.headlineKey);
    const headlineTemplate = options.type === 'medium' || options.type === 'large' ? headline : nothing;
    const titleTemplate = options.type === 'center' || options.type === 'small' ? headline : nothing;

    return html`
      <div class="alwatr-top-app-bar" type=${options.type}>
        <div class="row">
          ${alwatrIconButton({icon: options.startIcon.icon, flipRtl: options.startIcon.flipRtl})}
          <div class="title">${titleTemplate}</div>
          ${this._render_end_icon_list(options.endIconList)}
        </div>
        <div class="headline">${headlineTemplate}</div>
      </div>
    `;
  }

  protected _render_end_icon_list(endIconList: Array<AlwatrIconButtonContent>): unknown {
    return map(endIconList, (iconOptions) => {
      return alwatrIconButton({icon: iconOptions.icon, flipRtl: iconOptions.flipRtl});
    });
  }
}

export const alwatrTopAppBar = directive(AlwatrTopAppBarDirective);
