import {AlwatrDummyElement, css, customElement, html, nothing, property} from '@alwatr/element';
import './chat-message.js';

import type {ChatMessage as _ChatMessage} from './chat-message.js';
import type {AlwatrDocumentObject, AlwatrDocumentStorage} from '@alwatr/fetch/type.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-list': AlwatrChatList;
  }
}

export type ChatMessage = AlwatrDocumentObject & _ChatMessage;
export type ChatStorage = AlwatrDocumentStorage<ChatMessage>;

export function* map<T>(
    items: Record<string, T> | undefined,
    func: (value: T, index: string) => unknown,
): Generator<unknown, void, unknown> {
  if (items !== undefined) {
    for (const key in items) {
      if (!Object.prototype.hasOwnProperty.call(items, key)) continue;
      yield func(items[key], key);
    }
  }
}

/**
 * Alwatr chat message box element.
 *
 * @attr end-side
 */
@customElement('alwatr-chat-list')
export class AlwatrChatList extends AlwatrDummyElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: var(--md-sys-spacing-track-3) var(--md-sys-spacing-track-2) var(--md-sys-spacing-track-2);
      gap: var(--md-sys-spacing-track-2);
      flex-grow: 1;
      overflow-y: auto;
    }

    :host(::-webkit-scrollbar) {
      width: var(--theme-scrollbar-size);
      height: var(--theme-scrollbar-size);
    }

    :host(::-webkit-scrollbar-corner),
    :host(::-webkit-scrollbar-track) {
      background-color: red;
    }

    :host(::-webkit-scrollbar-thumb) {
      background-color: var(--theme-scrollbar-color);
      border-radius: var(--theme-scrollbar-radius);
    }

    :host(::-webkit-scrollbar-thumb:hover) {
      background-color: var(--theme-scrollbar-color-hover);
    }
  `;

  @property({type: Object, attribute: false})
    storage?: ChatStorage;

  @property({type: Object, attribute: false})
    currentUser?: string;

  override render(): unknown {
    super.render();
    if (this.storage == null) return nothing;
    return html`${map(
        this.storage.data,
        (message) => html`
        <alwatr-chat-message
          .message=${message}
          ?self=${message.from === this.currentUser}
        ></alwatr-chat-message>
      `,
    )}`;
  }
}
