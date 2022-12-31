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
        background-color: var(--alwatr-sys-color-surface);
        border: 1px solid var(--alwatr-sys-color-outline);

        --_elevation-level: 0;
      }
    `,
  ];
}
