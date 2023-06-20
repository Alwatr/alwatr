import {
  customElement,
  css,
  html,
  AlwatrBaseElement,
  property,
  state,
} from '@alwatr/element';
import '@alwatr/ui-kit/card/icon-box.js';

import {PriceDetailItem} from '../../manager/price-storage.js';
import {tourDetailContext, type Tour} from '../../manager/tour-storage.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-tour': AlwatrPageTour;
  }
}

/**
 * Alwatr tour page
 */
@customElement('alwatr-page-tour')
export class AlwatrPageTour extends AlwatrBaseElement {
  static override styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      justify-content: center;
      gap: var(--sys-spacing-track);
      overflow-y: auto;
    }
  `;

  @property({type: Object}) content?: Tour & {priceRecord: Record<string, Array<PriceDetailItem>>};

  @state() selectedCategory?: string;

  override connectedCallback(): void {
    super.connectedCallback();
    tourDetailContext.subscribe((tour) => {
      this.content = tour;
      this.selectedCategory = tour.categories[0];
    });
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    return [this._renderCategoryList(), this._renderTourSummary()];
    // return [this._renderCategoryList(), this._renderTourSummary(), priceListDirective()];
  }

  protected _renderCategoryList(): unknown {
    return this.content?.categories.map((category) => html`${category}`);
  }

  protected _renderTourSummary(): unknown {
    return html`
      <div>
        ${this.content?.title}
        <img src=${this.content?.indexImage.url} alt=${this.content?.indexImage.alt ?? ''} />
        <div>
          ${this.content?.priceRecord[this.selectedCategory!][0].amount}
          ${this.content?.priceRecord[this.selectedCategory!][0].date}
        </div>
      </div>
    `;
  }
}
