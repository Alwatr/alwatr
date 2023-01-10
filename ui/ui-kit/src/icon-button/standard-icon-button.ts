import {AlwatrDummyElement, css, customElement, html, property} from '@alwatr/element';

import '@alwatr/icon';

import {focusRingStyle} from '../focus-ring/style.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-standard-icon-button': AlwatrStandardIconButton;
  }
}

@customElement('alwatr-standard-icon-button')
/**
 * Alwatr standard icon button element.
 *
 * @prop {String} icon
 * @prop {String} urlPrefix
 * @prop {Boolean} flipRtl
 *
 * @attr {string} icon
 * @attr {string} url-prefix
 * @attr {boolean} flip-rtl
 */
export class AlwatrStandardIconButton extends AlwatrDummyElement {
  static override styles = [
    focusRingStyle,
    css`
      :host {
        --_color-hsl: var(--sys-color-on-surface-variant-hsl);

        display: inline-flex;
        user-select: none;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        flex-grow: 0;
        flex-shrink: 0;

        cursor: pointer;
        background-color: transparent;
        width: calc(5 * var(--sys-spacing-track));
        height: calc(5 * var(--sys-spacing-track));
        border-radius: 50%;
        outline: 0;
        overflow: hidden;
        overflow: clip;
        z-index: var(--sys-zindex-default);
        -webkit-tap-highlight-color: transparent;
      }

      alwatr-icon {
        width: calc(3 * var(--sys-spacing-track));
        height: calc(3 * var(--sys-spacing-track));
      }
    `,
  ];

  @property()
    icon?: string;

  @property({attribute: 'url-prefix'})
    urlPrefix?: string;

  @property({type: Boolean, attribute: 'flip-rtl'})
    flipRtl = false;

  override render(): unknown {
    return html`<alwatr-icon ?flip-rtl=${this.flipRtl} .name=${this.icon} .urlPrefix=${this.urlPrefix}></alwatr-icon>`;
  }
}
