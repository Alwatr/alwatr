import {css, html} from '@alwatr/element';

import type {PriceDetailItem} from '../../manager/price-storage.js';

export const alwatrIconStyle = css``;

export const alwatrTourPriceListDirective = (priceItem: PriceDetailItem): unknown => html`
  <div class="tour-item-container">
    <span>${priceItem.date}</span>
    <span>${priceItem.amount}</span>
  </div>
`;
