import {AlwatrDirective, directive, html, map, noChange, type PartInfo} from '@alwatr/fract';
import {alwatrIcon} from '@alwatr/ui-kit2/icon/icon.js';

import './tour-card.scss';

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
          ${}
        </div>
      </div>
    `;
  }

  protected _render_() {
    return map(
      descriptionList,
      (description) => html`<div class="description__item">${
        alwatrIcon({svg: description.icon})
      }${description.text}</div>`)
  }
}

export const alwatrTourCard = directive(AlwatrTourCardDirective);
