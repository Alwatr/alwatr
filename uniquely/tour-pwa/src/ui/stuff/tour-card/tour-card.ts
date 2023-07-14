import {AlwatrDirective, directive, html, map, noChange, type PartInfo} from '@alwatr/fract';

import './tour-card.scss';
import {alwatrIcon} from '../icon/icon.js';

import type {TourCardContent} from './type.js';

export class AlwatrTourCardDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-tour-card>');
  }

  render(content?: TourCardContent | null): unknown {
    this._logger.logMethodArgs?.('render', content);

    if (content == null) {
      this._logger.incident?.('render', 'invalid_content', 'content not defined');
      return noChange;
    }

    return html`
      <div class="alwatr-tour-card">
        <img src=${content.image.id} />
        <div class="description">
          <h3>${content.title}</h3>
          ${map(
      content.descriptionList,
      (description) => html`<div class="description__item">${alwatrIcon(description.icon)}${description.text}</div>`,
  )}
        </div>
      </div>
    `;
  }
}

export const alwatrTourCard = directive(AlwatrTourCardDirective);
