import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

import '@alwatr/ui-kit/chat/chat.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-chat': AlwatrPageHome;
  }
}

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-chat')
export class AlwatrPageHome extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: block;
    }
    :host,
    alwatr-chat {
      height: 100%;
    }
  `;

  override render(): unknown {
    super.render();
    return html`
      <alwatr-chat></alwatr-chat>
    `;
  }
}
