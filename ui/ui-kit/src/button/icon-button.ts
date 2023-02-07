import {css, customElement, html, property} from '@alwatr/element';

import '@alwatr/icon';
import {AlwatrSurface} from '../card/surface.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-icon-button': AlwatrStandardIconButton;
  }
}

/**
 * Alwatr standard icon button element.
 *
 * @attr {Boolean} flip-rtl
 */
@customElement('alwatr-icon-button')
export class AlwatrStandardIconButton extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        --_surface-color-on: var(--sys-color-on-surface-variant-hsl);
        --_surface-state-color: var(--sys-color-on-surface-variant-hsl);

        display: inline-block;
        padding: calc(0.5 * var(--sys-spacing-track));
        font-size: calc(3 * var(--sys-spacing-track)); /* icon size */
        background-image: none;
        background-color: hsla(var(--_surface-state-color), var(--_surface-state-opacity));
        background-clip: content-box;
        border-radius: 50%;
        box-shadow: none;

        user-select: none;
        cursor: pointer;
        align-self: center;
        vertical-align: middle;
        flex-grow: 0;
        flex-shrink: 0;
      }

      alwatr-icon {
        display: block;
        padding: var(--sys-spacing-track);
      }
    `,
  ];

  @property()
    icon?: string;

  @property({type: Boolean, attribute: 'flip-rtl'})
    flipRtl = false;

  override connectedCallback(): void {
    this.setAttribute('stated', '');
    super.connectedCallback();
  }

  override render(): unknown {
    super.render();
    return html`<alwatr-icon
      .name=${this.icon}
      ?flip-rtl=${this.flipRtl}
    ></alwatr-icon>`;
  }
}

/*
  TODO:
    1. Filled icon button
    2. Filled tonal icon button
    3. Outlined icon button
    4. toggle/selected mode
    https://m3.material.io/components/icon-buttons/specs
*/
