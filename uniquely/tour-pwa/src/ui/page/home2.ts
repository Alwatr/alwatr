import {AlwatrDynamicDirective, directive, html, type PartInfo} from '@alwatr/fract';
import {renderState} from '@alwatr/util';

import {tourStorageRequest} from '../../manager/tour-storage.js';

type PageName = typeof tourStorageRequest.state;

class AlwatrHome extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-home>');

    tourStorageRequest.subscribe(() => {
      this.setValue(renderState(<PageName>tourStorageRequest.state, {
        _default: 'initial',
        initial: 'loading',
        failed: () => this._render_failed(),
        loading: () => this._render_loading(),
        complete: () => this._render_complete(),
      }));
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
    return html`The list of tours is ready`;
  }
}

export const alwatrHome = directive(AlwatrHome);
