import {AlwatrSurfaceElement, css, customElement, html, property} from '@alwatr/element';

import '@alwatr/icon';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-standard-icon-button': AlwatrStandardIconButton;
  }
}

/**
 * Alwatr standard icon button element.
 *
 * @prop {String} icon
 * @prop {String} urlPrefix
 * @prop {Boolean} flipRtl
 *
 * @attr {String} icon
 * @attr {String} url-prefix
 * @attr {Boolean} flip-rtl
 */
@customElement('alwatr-standard-icon-button')
export class AlwatrStandardIconButton extends AlwatrSurfaceElement {
  static override styles = [
    AlwatrSurfaceElement.styles,
    css`
      :host {
        --_surface-color-on: var(--sys-color-on-surface-variant-hsl);
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
        box-shadow: none;
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

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('stated', '');
  }

  override render(): unknown {
    return html`<alwatr-icon ?flip-rtl=${this.flipRtl} .name=${this.icon} .urlPrefix=${this.urlPrefix}></alwatr-icon>`;
  }
}
