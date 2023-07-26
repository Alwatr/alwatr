import {AlwatrDynamicDirective, directive, html, mapObject, type PartInfo} from '@alwatr/fract';
import {router} from '@alwatr/router2';

import {tourContext} from '../../manager/tour-storage.js';

class AlwatrHome extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-home>');
  }

  override render(): unknown {
    return this._render_loading();
  }

  protected _render_loading(): unknown {
    this._logger.logMethod?.('_render_loading');
    return html`<p>Loading tour list...</p>`;
  }

  protected _render_failed(): unknown {
    this._logger.logMethod?.('_render_failed');
    return html`Getting the list of tours is failed`;
  }

  protected _render_complete(): unknown {
    const tourList = tourContext.context?.data;
    this._logger.logMethodArgs?.('_render_complete', {tourList});
    return mapObject(
        tourList,
        (tour) => html`<a href=${router.url({sectionList: ['tour', tour.id]})}>${tour.title}</a><br>`,
        this,
    );
  }
}

export const alwatrHome = directive(AlwatrHome);
