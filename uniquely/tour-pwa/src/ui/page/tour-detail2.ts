import {AlwatrDynamicDirective, directive, html, type PartInfo} from '@alwatr/fract';

import {tourDetailContext, type Tour} from '../../manager/tour-storage.js';

import type {PriceDetailItem} from '../../manager/price-storage.js';

class AlwatrTourDetail extends AlwatrDynamicDirective {
  protected _content?: Tour & {priceRecord: Record<string, Array<PriceDetailItem>>};
  protected _selectedCategory?: string;

  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-tour-detail>');

    tourDetailContext.subscribe((tour) => {
      this._selectedCategory = Object.keys(tour.priceRecord)[0];
      this._content = tour;

      this.setValue([
        this._renderCategoryList(),
        this._renderTourSummary(),
      ]);
    });
  }

  override render(): unknown {
    return this._render_loading();
  }

  protected _render_loading(): unknown {
    this._logger.logMethod?.('_render_loading');
    return html`<p>Loading tour detail...</p>`;
  }

  protected _renderCategoryList(): unknown {
    return this._content?.categories.map((category) => html`${category}`);
  }

  protected _renderTourSummary(): unknown {
    return html`
      <div>
        ${this._content?.title}
        <img src=${this._content?.indexImage.url} alt=${this._content?.indexImage.alt ?? ''} />
        <div>
          ${this._content?.priceRecord[this._selectedCategory!][0].amount}
          ${this._content?.priceRecord[this._selectedCategory!][0].date}
        </div>
      </div>
    `;
  }
}

export const alwatrTourDetail = directive(AlwatrTourDetail);
