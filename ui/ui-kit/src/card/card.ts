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
 * @attr {boolean} disabled
 */
@customElement('alwatr-card')
export class AlwatrCard extends AlwatrDummyElement {
  static override styles: CSSResultGroup = [
    focusRingStyle,
    css`
      :host /* filled */ {
        --_color-hsl: var(--sys-color-on-surface-variant-hsl);
        display: block;
        padding: calc(2 * var(--sys-spacing-track));
        border-radius: var(--sys-radius-medium);
        box-shadow: var(--elevation-0);
        background-color: var(--sys-color-surface-variant);
        transition: box-shadow var(--sys-motion-duration-small-out) var(--sys-motion-easing-linear);
      }

      :host([disabled]) {
        opacity: 0.38;
        pointer-events: none;
      }

      :host(:hover) {
        box-shadow: var(--elevation-1);
      }

      :host(:active) {
        box-shadow: var(--elevation-0);
      }

      :host([type='elevated']) {
        --_color-hsl: var(--sys-color-on-surface-hsl);
        box-shadow: var(--elevation-1);
        background-color: var(--sys-color-surface);
      }

      :host([type='elevated']:hover) {
        box-shadow: var(--elevation-2);
      }

      :host([type='elevated']:active) {
        box-shadow: var(--elevation-1);
      }

      :host([type='outlined']) {
        --_color-hsl: var(--sys-color-on-surface-hsl);
        background-color: var(--sys-color-surface);
        border: 1px solid var(--sys-color-outline);
      }

      :host([type='outlined'][disabled]) {
        box-shadow: var(--elevation-0);
        opacity: 0.12;
      }
    `,
  ];

  override render(): unknown {
    super.render();
    return html`<slot></slot>`;
  }
}
