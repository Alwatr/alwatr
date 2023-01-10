import {AlwatrDummyElement, css, customElement, html} from '@alwatr/element';

import {focusRingStyle} from '../style/helper/focus-ring.js';

import type {CSSResultGroup} from '@alwatr/element';

export type CardType = 'elevated' | 'filled' | 'outlined';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-card': AlwatrCard;
  }
}

/**
 * Alwatr Card Base Element
 *
 * @attr {elevated|filled|outlined} type
 */
@customElement('alwatr-card')
export class AlwatrCard extends AlwatrDummyElement {
  static override styles: CSSResultGroup = [
    focusRingStyle,
    css`
      :host,
      :host([type="filled"]) {
        --_color-hsl: var(--sys-color-on-surface-variant-hsl);
        background-color: var(--sys-color-surface-variant);
        border-radius: var(--sys-radius-medium);
      }

      :host([type="elevated"]) {
        --_color-hsl: var(--sys-color-on-surface-hsl);
        background-color: var(--sys-color-surface);
      }

      :host([type="outlined"]) {
        --_color-hsl: var(--sys-color-on-surface-hsl);
        background-color: var(--sys-color-surface);
        border: 1px solid var(--sys-color-outline);
      }
    `,
  ];

  override render(): unknown {
    super.render();
    return html`<slot></slot>`;
  }
}
