import {css, customElement, type PropertyValues} from '@alwatr/element';

import {AlwatrButton} from './button.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-fab': AlwatrFab;
  }
}

@customElement('alwatr-fab')
export class AlwatrFab extends AlwatrButton {
  static override styles = [
    AlwatrButton.styles,
    css`
      :host {
        --_surface-color-on: var(--sys-color-on-primary-hsl);
        --_surface-color: var(--sys-color-primary-hsl);
        background-color: hsl(var(--_surface-color));
        position: fixed;
        bottom: calc(2 * var(--sys-spacing-track));
        z-index: var(--sys-zindex-fixed);
        padding: calc(1 * var(--sys-spacing-track)) calc(2 * var(--sys-spacing-track));
      }
    `,
  ];

  protected override firstUpdated(_changedProperties: PropertyValues<this>): void {
    super.firstUpdated(_changedProperties);
    this.setAttribute('elevated', '3');
  }
}
