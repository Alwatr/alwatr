import {customElement, css, html, SignalMixin, AlwatrBaseElement} from '@alwatr/element';
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
export class AlwatrPageHome extends SignalMixin(AlwatrBaseElement) {
  static override styles = css`
    :host {
      display: block;
      padding: 0 var(--sys-spacing-side-padding);
      box-sizing: border-box;
    }
    :host,
    alwatr-chat {
      height: 100%;
    }
  `;

  override render(): unknown {
    this._logger.logMethod('render');
    return html`<alwatr-chat></alwatr-chat>`;
  }
}
