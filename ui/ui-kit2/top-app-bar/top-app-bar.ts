import {AlwatrDirective, directive, html, noChange, nothing, map, type PartInfo} from '@alwatr/fract';
import {l10n} from '@alwatr/i18n2';

import './top-app-bar.css';

import type {Stringifyable, StringifyableRecord} from '@alwatr/type';

export interface IconButtonContent extends StringifyableRecord {
  /**
   * Icon name.
   */
  icon: string;

  /**
   * Flip icon on rtl
   */
  flipRtl?: true;

  /**
   * Unique name for identify click event over signal.
   */
  clickSignalId?: string;

  /**
   * Dispatched signal with ClickSignalType and this detail.
   */
  clickDetail?: Stringifyable;

  disabled?: boolean;
}

export interface AlwatrTopAppBarOptions extends StringifyableRecord {
  /**
   * @default 'small'
   */
  type?: 'center' | 'small' | 'medium' | 'large';

  headline?: string;

  /**
   * @default 'loading'
   */
  headlineKey?: string;

  /**
   * @default {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'}
   */
  startIcon?: IconButtonContent;

  /**
   * @default []
   */
  endIconList?: Array<IconButtonContent>;

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
    options.startIcon ??= {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'};
    options.endIconList ??= [];
    options.tinted ??= 2;
    options.elevated ??= 0;

    const headline = options.headline || l10n.message(options.headlineKey);
    const headlineTemplate = options.type === 'medium' || options.type === 'large' ? headline : nothing;
    const titleTemplate = options.type === 'center' || options.type === 'small' ? headline : nothing;

    return html`
      <div class="alwatr-top-app-bar" type=${options.type}>
        <div class="row">
          <alwatr-icon-button class="leading-icon" .content=${options.startIcon}></alwatr-icon-button>
          <div class="title">${titleTemplate}</div>
          ${map(options.endIconList, (iconContent) => html`<alwatr-icon-button
            class="trailing-icons"
            .content=${iconContent}
          ></alwatr-icon-button>`)}
        </div>
        <div class="headline">${headlineTemplate}</div>
      </div>
    `;
  }
}

export const alwatrTopAppBar = directive(AlwatrTopAppBarDirective);
