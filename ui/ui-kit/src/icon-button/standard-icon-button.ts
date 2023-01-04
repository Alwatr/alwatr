import {AlwatrDummyElement, css, customElement, html, property} from '@alwatr/element';

import '@alwatr/icon';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-standard-icon-button': AlwatrStandardIconButton;
  }
}

/**
 * Alwatr standard icon button element.
 *
 * @attr {boolean} flip-rtl
 */
@customElement('alwatr-standard-icon-button')
export class AlwatrStandardIconButton extends AlwatrDummyElement {
  static override styles = css`
    :host {
      position: relative;
      display: inline-flex;
      user-select: none;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      flex-grow: 0;
      flex-shrink: 0;

      cursor: pointer;
      /* color: var(--alwatr-sys-color-on-surface-variant); */
      background-color: transparent;
      width: calc(5 * var(--alwatr-sys-spacing-track));
      height: calc(5 * var(--alwatr-sys-spacing-track));
      border-radius: 50%;
      outline: 0;
      overflow: hidden;
      overflow: clip;
      z-index: var(--alwatr-sys-zindex-default);
      -webkit-tap-highlight-color: transparent;
    }

    :host::before {
      content: '';
      position: absolute;
      z-index: var(--alwatr-sys-zindex-below);
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      inset: 0;
      opacity: 0;
      transition: opacity var(--alwatr-sys-motion-duration-small-out) var(--alwatr-sys-motion-easing-linear);
      background-color: var(--alwatr-sys-color-on-surface-variant);
    }

    :host(:hover)::before {
      opacity: var(--alwatr-sys-state-hover-state-layer-opacity);
      transition-duration: var(--alwatr-sys-motion-duration-small-in);
    }

    :host(:active)::before {
      opacity: var(--alwatr-sys-state-pressed-state-layer-opacity);
      transition-duration: 0ms;
    }

    :host(:focus)::before {
      opacity: var(--alwatr-sys-state-focus-state-layer-opacity);
      transition-duration: var(--alwatr-sys-motion-duration-small-in);
    }

    alwatr-icon {
      width: calc(3 * var(--alwatr-sys-spacing-track));
      height: calc(3 * var(--alwatr-sys-spacing-track));
    }
  `;

  @property()
    icon?: string;

  @property({type: Boolean, attribute: 'flip-rtl'})
    flipRtl = false;

  override render(): unknown {
    return html`<alwatr-icon ?flip-rtl=${this.flipRtl} .name=${this.icon}></alwatr-icon>`;
  }
}
