import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

import {chatDocumentStorageSignal} from './director/chat-storage.js';

import type {ChatStorage} from '@alwatr/type';

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
  protected _chatStorage: ChatStorage | null = null;

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

  override connectedCallback(): void {
    super.connectedCallback();
    this._signalListenerList.push(
        chatDocumentStorageSignal.addListener((chatStorage) => {
          this._logger.logProperty('chatStorage', chatStorage);
          this._chatStorage = chatStorage;
          this.requestUpdate();
        }));
  }

  override render(): unknown {
    super.render();
    return html`
      <alwatr-chat .storage=${this._chatStorage}></alwatr-chat>
    `;
  }
}
