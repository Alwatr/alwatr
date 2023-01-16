import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

import '@alwatr/ui-kit/card/card.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-home': AlwatrPageHome;
  }
}

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-home')
export class AlwatrPageHome extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `;

  override render(): unknown {
    super.render();
    return html``;
  }
}
