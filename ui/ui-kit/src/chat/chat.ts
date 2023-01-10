import {customElement, AlwatrSmartElement, css, html, property, nothing, query} from '@alwatr/element';
import {SignalInterface} from '@alwatr/signal';

import type {AlwatrChatFooter} from './chat-footer.js';
import type {ChatStorage} from '@alwatr/type';

import './chat-footer.js';
import './chat-list.js';

declare global {
  interface AlwatrSignals {
    'chat-storage': ChatStorage;
    'chat-send-text-message': ChatStorage;
  }

  interface AlwatrRequestSignals {
    'chat-send-text-message': {text: string};
  }

  interface HTMLElementTagNameMap {
    'alwatr-chat': AlwatrChat;
  }
}

const currentUser = 'user-1';

export const chatSendMessageSignal = new SignalInterface('chat-send-text-message');

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-chat')
export class AlwatrChat extends AlwatrSmartElement {
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

  @property({type: Object, attribute: false})
    storage?: ChatStorage | null;

  @query('alwatr-chat-footer')
    footer?: AlwatrChatFooter;

  override render(): unknown {
    super.render();
    return html`
      ${this.storage !== null
        ? html`
            <alwatr-chat-list .storage=${this.storage} .currentUser=${currentUser}></alwatr-chat-list>
            <alwatr-chat-footer @send=${this._sendMessage}></alwatr-chat-footer>
          `
        : nothing}
    `;
  }

  protected _sendMessage(): void {
    const message = this.footer?.chatTextInput?.inputElement?.value;
    if (this.footer?.chatTextInput?.inputElement?.rows == null) return;
    this.footer.chatTextInput.inputElement.rows = 1;
    this.footer.chatTextInput.inputElement.value = '';
    if (message == null) return;
    chatSendMessageSignal.request({text: message});
  }
}
