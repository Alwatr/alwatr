import {css, customElement} from '@alwatr/element';

import {hostElevation} from '../elavation/style.js';
import {AlwatrCard} from './card.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-elevated-card': AlwatrElevatedCard;
  }
}

/**
 * Alwatr elevated card element.
 */
@customElement('alwatr-elevated-card')
export class AlwatrElevatedCard extends AlwatrCard {
  static override styles = [
    hostElevation,
    ...AlwatrCard.styles,
    css`
      :host {
        color: var(--md-sys-color-on-surface);
        background-color: var(--md-sys-color-surface);

        --_elevation-level: 1;
      }
    `,
  ];
}
