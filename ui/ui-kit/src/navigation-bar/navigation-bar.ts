import {AlwatrDummyElement, customElement, html, css} from '@alwatr/element';

import './navigation-bar-item.js';

/**
 * @slot - alwatr-navigation-bar-item list
 */
@customElement('alwatr-navigation-bar')
export class AlwatrNavigationBar extends AlwatrDummyElement {
  static override styles = [
    css`
      :host {
        display: flex;

        z-index: var(--sys-zindex-above);
        background-color: var(--sys-color-surface);

        width: 100%;
        height: calc(10 * var(--sys-spacing-track));

        box-shadow: var(--elevation-5);
      }
    `,
  ];

  override render(): unknown {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-navigation-bar': AlwatrNavigationBar;
  }
}
