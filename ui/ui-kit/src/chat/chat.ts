import {customElement, css, html, AlwatrBaseElement, SignalMixin, property} from '@alwatr/element';

import './chat-footer.js';
import './chat-list.js';

import type {AlwatrDocumentStorage, ChatMessage, StringifyableRecord} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat': AlwatrChat;
  }
}

export interface ChatContent extends StringifyableRecord {
  chatStorage: AlwatrDocumentStorage<ChatMessage>;
  currentUserId: string;
  sendButtonClickSignalId?: string;
}

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-chat')
export class AlwatrChat extends SignalMixin(AlwatrBaseElement) {
  static override styles = css`
    :host {
      display: block;
      padding-top: var(--sys-spacing-track);
      box-sizing: border-box;
      position: relative;
    }

    alwatr-chat-list {
      height: 100%;
      color: var(--sys-color-on-surface-variant);
      background-color: var(--sys-color-surface-variant);
      padding-bottom: calc(12 * var(--sys-spacing-track));
    }

    alwatr-chat-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  `;

  @property()
    content?: ChatContent;

  override render(): unknown {
    this._logger.logMethod?.('render');

    return html`
      <alwatr-chat-list
        .chatStorage=${this.content?.chatStorage}
        .currentUserId=${this.content?.currentUserId}
      ></alwatr-chat-list>
      <alwatr-chat-footer .sendButtonClickSignalId=${this.content?.sendButtonClickSignalId}></alwatr-chat-footer>
    `;
  }
}
