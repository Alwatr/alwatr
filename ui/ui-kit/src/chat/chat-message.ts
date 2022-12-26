import {AlwatrDummyElement, css, customElement, html, nothing, property} from '@alwatr/element';
import './chat-avatar.js';
import './chat-bubble.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-message': AlwatrChatMessage;
  }
}

export type ChatTextMessage = {
  from: string,
  type: 'text',
  text: string,
};

export type ChatMessage = ChatTextMessage; // TODO: ChatPhotoMessage

/**
 * Alwatr chat message box element.
 *
 * @attr end-side
 */
@customElement('alwatr-chat-message')
export class AlwatrChatMessage extends AlwatrDummyElement {
  static override styles = css`
    :host {
      display: flex;
      align-items: flex-end;
      gap: 1rem;
    }

    :host,
    :host([dir='rtl'][end-side]) {
      flex-direction: row;
    }

    :host([dir='rtl']),
    :host([end-side]) {
      flex-direction: row-reverse
    }
  `;

  @property({type: Object, attribute: false})
    message?: ChatTextMessage;

  @property({type: Boolean, attribute: 'end-side', reflect: true})
    endSide = false;

  override render(): unknown {
    super.render();
    if (this.message == null) return nothing;
    return html`
      <alwatr-chat-avatar .user=${this.message.from}></alwatr-chat-avatar>
      <alwatr-chat-bubble .text=${this.message.text} .endSide=${this.endSide}></alwatr-chat-bubble>
    `;
  }
}
