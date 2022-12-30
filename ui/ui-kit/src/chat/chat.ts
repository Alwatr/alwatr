import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

import './chat-footer.js';
import './chat-list.js';
import './director/index.js';

import {chatDocumentStorageSignal} from './director/chat-document-storage.js';

import type {ChatStorage} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat': AlwatrChat;
  }
}

const currentUser = 'user-1';

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-chat')
export class AlwatrChat extends AlwatrSmartElement {
  protected _chatStorage: ChatStorage = {
    ok: true,
    meta: {
      formatVersion: 4,
      lastAutoId: 0,
      lastUpdated: 0,
      reversion: 0,
    },
    data: {},
  };

  static override styles = css`
    :host {
      display: block;
      padding-top: var(--sys-spacing-track);
      box-sizing: border-box;
      position: relative;
    }

    alwatr-chat-list {
      height: 100%;
      color: var(--sys-color-on-secondary-container);
      background-color: var(--sys-color-secondary-container);
      padding-bottom: calc(12 * var(--sys-spacing-track));
    }

    alwatr-chat-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  `;

  protected override firstUpdated(): void {
    this._logger.logMethod('firstUpdated');
    chatDocumentStorageSignal.addListener((chatStorage) => {
      this._logger.logProperty('chatStorage', chatStorage);
      this._chatStorage = chatStorage;
      this.requestUpdate();
    });
  }

  override render(): unknown {
    super.render();
    return html`
      <alwatr-chat-list .storage=${this._chatStorage} .currentUser=${currentUser}></alwatr-chat-list>
      <alwatr-chat-footer></alwatr-chat-footer>
    `;
  }
}
