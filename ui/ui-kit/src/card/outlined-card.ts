import {css, customElement} from '@alwatr/element';

import {AlwatrCard} from './card.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-outlined-card': AlwatrOutlinedCard;
  }
}

/**
 * Alwatr outlined card element.
 */
@customElement('alwatr-outlined-card')
export class AlwatrOutlinedCard extends AlwatrCard {
  static override styles = [
    ...AlwatrCard.styles,
    css`
      :host {
        background-color: var(--sys-color-surface);
        border: 1px solid var(--sys-color-outline);
      }
    `,
  ];
}
