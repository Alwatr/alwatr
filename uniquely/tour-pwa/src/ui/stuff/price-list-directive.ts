import {css, html} from '@alwatr/element';

import type {PriceDetailItem} from '../../manager/tour-storage.js';

export const alwatrIconStyle = css``;

export const alwatrTourPriceListDirective = (priceItem: PriceDetailItem): unknown => html`
  <div class="tour-item-container">
    <span>${priceItem.date}</span>
    <span>${priceItem.price}</span>
  </div>
`;
