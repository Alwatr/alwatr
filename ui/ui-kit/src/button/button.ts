import {css, customElement, html} from '@alwatr/element';
import '@alwatr/icon';

import {AlwatrSurface} from '../card/surface.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-button': AlwatrButton;
  }
}

/**
 * Alwatr outlined text field.
 */
@customElement('alwatr-button')
export class AlwatrButton extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        --_surface-color-on: var(--sys-color-primary-hsl);
        background-color: transparent;
        display: inline-block;
        min-width: calc(6 * var(--sys-spacing-track));
        text-align: center;
        vertical-align: middle;
        padding: 0 calc(1.5 * var(--sys-spacing-track));
        font-family: var(--sys-typescale-label-large-font-family-name);
        font-weight: var(--sys-typescale-label-large-font-weight);
        font-size: var(--sys-typescale-label-large-font-size);
        letter-spacing: var(--sys-typescale-label-large-letter-spacing);
        line-height: var(--sys-typescale-label-large-line-height);
        line-height: calc(5 * var(--sys-spacing-track));
        box-shadow: none;
        border-radius: var(--sys-radius-xlarge);
        white-space: nowrap;
        user-select: none;
        cursor: pointer;
      }
    `,
  ];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('stated', '');
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return html`<slot>button</slot>`;
  }
}
