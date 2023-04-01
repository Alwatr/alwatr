import {AlwatrBaseElement, css, customElement, html, mapObject, property} from '@alwatr/element';

import './chat-message.js';

import type {ChatMessageContent} from './chat-message.js';
import type {AlwatrDocumentStorage, ChatMessage} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-list': AlwatrChatList;
  }
}

/**
 * Alwatr chat message box element.
 *
 * @attr end-side
 */
@customElement('alwatr-chat-list')
export class AlwatrChatList extends AlwatrBaseElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: calc(2 * var(--sys-spacing-track));
      border-top-left-radius: var(--sys-radius-large);
      border-top-right-radius: var(--sys-radius-large);
      padding: calc(2 * var(--sys-spacing-track));
      flex-grow: 1;
      overflow-y: auto;
      box-sizing: border-box;
    }

    :host::-webkit-scrollbar {
      width: var(--sys-scrollbar-size);
      height: var(--sys-scrollbar-size);
    }

    :host::-webkit-scrollbar-corner,
    :host::-webkit-scrollbar-track {
      background-color: var(--sys-scrollbar-background);
    }

    :host::-webkit-scrollbar-track {
      margin: var(--sys-spacing-track);
    }

    :host::-webkit-scrollbar-thumb {
      background-color: var(--sys-scrollbar-color);
      border-radius: var(--sys-scrollbar-radius);
    }

    :host(:hover)::-webkit-scrollbar-thumb {
      background-color: var(--sys-scrollbar-color-hover);
    }
  `;

  @property()
    chatStorage?: AlwatrDocumentStorage<ChatMessage>;

  @property()
    currentUserId?: string;


  override render(): unknown {
    this._logger.logMethod?.('render');

    return html`${mapObject(this, this.chatStorage?.data, (message) => {
      const messageContent: ChatMessageContent = {
        message,
        self: message.from === this.currentUserId,
      };
      return html`
      <alwatr-chat-message
        .content=${messageContent}
      ></alwatr-chat-message>
    `;
    })}`;
  }
}
