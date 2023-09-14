import {AlwatrDirective, directive, html, noChange, nothing, map, type PartInfo} from '@alwatr/fract';
import {l10n} from '@alwatr/i18n2';

import './top-app-bar.scss';
import '../button/icon-button.js';

import type {TopAppBarContent} from './type.js';

export class AlwatrTopAppBarDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-top-app-bar>');
  }

  render(content?: TopAppBarContent | null): unknown {
    this._logger.logMethodArgs?.('render', content);

    if (content == null) {
      this._logger.incident?.('render', 'invalid_content', 'content not defined');
      return noChange;
    }
    content.type ??= 'small';
    const headline = content.headline || l10n.message(content.headlineKey);
    const headlineTemplate = content.type === 'medium' || content.type === 'large' ? headline : nothing;
    const titleTemplate = content.type === 'center' || content.type === 'small' ? headline : nothing;

    return html`
      <div class="alwatr-top-app-bar" type=${content.type}>
        <div class="row">
          <alwatr-icon-button class="leading-icon" .content=${content.startIcon}></alwatr-icon-button>
          <div class="title">${titleTemplate}</div>
          ${map(content.endIconList, (iconContent) => html`<alwatr-icon-button
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
