import {AlwatrDummyElement, css, customElement, html, property} from '@alwatr/element';

import '@alwatr/icon';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-standard-icon-button': AlwatrStandardIconButton;
  }
}

/**
 * Alwatr standard icon button element.
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
      flex-basis: auto;

      cursor: pointer;
      color: var(--md-sys-color-on-surface-variant);
      background-color: transparent;
      width: var(--md-sys-spacing-track-5);
      height: var(--md-sys-spacing-track-5);
      border-radius: 50%;
      outline: 0;
      overflow: hidden;
      overflow: clip;
      z-index: var(--md-sys-zindex-default);
      -webkit-tap-highlight-color: transparent;
    }

    :host::before {
      content: '';
      position: absolute;
      z-index: var(--md-sys-zindex-below);
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      inset: 0;
      opacity: 0;
      transition: opacity var(--md-sys-motion-duration-small-out) var(--md-sys-motion-easing-linear);
      background-color: var(--md-sys-color-on-surface-variant);
    }

    :host(:hover)::before {
      opacity: var(--md-sys-state-hover-state-layer-opacity);
      transition-duration: var(--md-sys-motion-duration-small-in);
    }

    :host(:active)::before {
      opacity: var(--md-sys-state-pressed-state-layer-opacity);
      transition-duration: 0ms;
    }

    :host(:focus)::before {
      opacity: var(--md-sys-state-focus-state-layer-opacity);
      transition-duration: var(--md-sys-motion-duration-small-in);
    }

    alwatr-icon {
      width: var(--md-sys-spacing-track-3);
      height: var(--md-sys-spacing-track-3);
    }
  `;

  @property() icon?: string;

  override render(): unknown {
    return html`<alwatr-icon flip-rtl .name=${this.icon}></alwatr-icon>`;
  }
}
