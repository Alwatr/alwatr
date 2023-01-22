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
        vertical-align: middle;
        padding: var(--sys-spacing-track) calc(3 * var(--sys-spacing-track));
        font-family: var(--sys-typescale-label-large-font-family-name);
        font-weight: var(--sys-typescale-label-large-font-weight);
        font-size: var(--sys-typescale-label-large-font-size);
        letter-spacing: var(--sys-typescale-label-large-letter-spacing);
        line-height: calc(3 * var(--sys-spacing-track));
        border-radius: var(--sys-radius-xsmall);
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
