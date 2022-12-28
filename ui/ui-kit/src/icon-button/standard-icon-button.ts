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
      display: inline-flex;
      user-select: none;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      flex: 0 0 auto;

      position: relative;

      cursor: pointer;
      color: var(--md-sys-color-on-surface-variant);
      font-size: var(--md-sys-spacing-track-3);
      width: var(--md-sys-spacing-track-6);
      height: var(--md-sys-spacing-track-6);
      border-radius: 50%;
      outline: none;
      overflow: hidden;
      z-index: 1;

      -webkit-tap-highlight-color: transparent;
    }
    :host::before {
      content: '';
      position: absolute;
      z-index: -1;
      inset: 0;
      opacity: 0;

      transition: opacity 150ms linear;

      background-color: var(--md-sys-color-on-surface-variant);
    }
    :host(:hover)::before {
      opacity: var(--md-sys-state-hover-state-layer-opacity);
    }
    :host(:focus)::before {
      opacity: var(--md-sys-state-focus-state-layer-opacity);
    }
    :host(:active)::before {
      transition: opacity 50ms linear;
      opacity: var(--md-sys-state-pressed-state-layer-opacity);
    }

    /* :host(:hover) alwatr-icon {
      color: var(--md-sys-color-surface-variant);
    }
    :host(:focus) alwatr-icon {
      color: var(--md-sys-color-primary);
    } */
  `;

  @property() icon?: string;

  override render(): unknown {
    return html` <alwatr-icon .name=${this.icon}></alwatr-icon> `;
  }
}
