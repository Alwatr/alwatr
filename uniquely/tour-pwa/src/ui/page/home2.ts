import {AlwatrDynamicDirective, directive, html, mapObject, type PartInfo} from '@alwatr/fract';
import {router} from '@alwatr/router2';
import {renderState} from '@alwatr/util';

import {tourStorageRequest} from '../../manager/tour-storage.js';

type PageName = typeof tourStorageRequest.state;

class AlwatrHome extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-home>');

    tourStorageRequest.subscribe(() => {
      this.setValue(
          renderState(
          <PageName>tourStorageRequest.state,
          {
            _default: 'initial',
            initial: 'loading',
            failed: this._render_failed,
            loading: this._render_loading,
            complete: this._render_complete,
          },
          this,
          ),
      );
    });
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
    const tourList = tourStorageRequest.response?.data;
    this._logger.logMethodArgs?.('_render_complete', {tourList});
    return mapObject(
        tourList,
        (tour) => html`<a href=${router.url({sectionList: ['tour', tour.id]})}>${tour.title}</a><br>`,
        this,
    );
  }
}

export const alwatrHome = directive(AlwatrHome);
