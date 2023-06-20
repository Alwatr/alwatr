import {customElement, AlwatrBaseElement, property, css, html, PropertyValues} from '@alwatr/element';
import {l10n} from '@alwatr/i18n2';
import {alwatrIconDirective} from '@alwatr/icon2';

import type{Image} from '../../manager/tour-storage.js';
import type{MaybePromise} from '@alwatr/type';


declare global {
  interface HTMLElementTagNameMap {
    'alwatr-tour-card': AlwatrTourCard;
  }
}

export interface PriceDetailItem {
  icon?: MaybePromise<string>;
  price: number;
  date: number
}

export interface TourCardContent {
  id: string;
  title: string;
  image: Image;
  priceDetailList: Array<PriceDetailItem>;
}

/**
 * Alwatr tour card
 */
@customElement('alwatr-tour-card')
export class AlwatrTourCard extends AlwatrBaseElement {
  static override styles = css`
    :host {
      display: block;
    }
  `;

  @property() content?: TourCardContent;

  protected override render(): unknown {
    return html`
      <h4>${this.content!.title}</h4>
      <div>
        ${this.content!.priceDetailList.map((priceDetail) => this._getPriceDetailTemplate(priceDetail))}
      </div>
    `;
  }

  protected override firstUpdated(_changedProperties: PropertyValues<this>): void {
    super.firstUpdated(_changedProperties);
    this.style.backgroundImage = `url(${this.content!.image.url})`;
  }

  protected _getPriceDetailTemplate(priceDetail: PriceDetailItem): unknown {
    return html`
      <div>
        <span>${alwatrIconDirective(priceDetail.icon!)}</span>
        ${l10n.message('from')}
        ${priceDetail.price}
        ${l10n.message('in')}
        ${priceDetail.date}
      </div>
    `;
  }
}
