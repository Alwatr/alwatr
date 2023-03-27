import {AlwatrBaseElement, css, customElement, html, mapObject, property} from '@alwatr/element';

import './chat-message.js';

import type {ChatContent} from './chat.js';

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
    content?: ChatContent;

  override render(): unknown {
    this._logger.logMethod?.('render');
    const content = this.content ?? {
      chatStorage: {
        ok: true,
        meta: {
          id: '',
          formatVersion: 0,
          reversion: 0,
          lastAutoId: 1,
          lastUpdated: 0,
        },
        data: {},
      },
      currentUserId: '',
    };

    return html`${mapObject(this, content.chatStorage.data, (message) => html`
      <alwatr-chat-message
        .message=${message}
        ?self=${message.from === content.currentUserId}
      ></alwatr-chat-message>
    `)}`;
  }
}
