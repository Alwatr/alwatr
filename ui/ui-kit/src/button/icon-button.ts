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
 *
 * @cssprop {String} [--comp-icon-button-color-hsl=var(--sys-color-on-surface-variant-hsl)]
 */
@customElement('alwatr-icon-button')
export class AlwatrStandardIconButton extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        display: inline-block;
        padding: calc(0.5 * var(--sys-spacing-track));
        font-size: calc(3 * var(--sys-spacing-track)); // icon size

        align-self: center;
        vertical-align: middle;
        flex-grow: 0;
        flex-shrink: 0;

        user-select: none;
        cursor: pointer;
      }

      alwatr-surface {
        --_surface-color-on: var(--comp-icon-button-color-hsl, var(--sys-color-on-surface-variant-hsl));
        --_surface-state-color: var(--comp-icon-button-color-hsl, var(--sys-color-on-surface-variant-hsl));
        background-color: transparent;
        border-radius: 50%;
        box-shadow: none;
        padding: var(--sys-spacing-track);
        font-size: inherit;
      }

      alwatr-icon {
        display: block;
      }
    `,
  ];

  @property()
    icon?: string;

  @property({type: Boolean, attribute: 'flip-rtl'})
    flipRtl = false;

  override render(): unknown {
    this._logger.logMethod('render');
    return html`<alwatr-surface stated>
      <alwatr-icon
        .name=${this.icon}
        ?flip-rtl=${this.flipRtl}
      ></alwatr-icon>
    </alwatr-surface>`;
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
