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
      gap: var(--md-sys-spacing-track-1);
      flex-direction: row;
    }

    :host([end-side]) {
      flex-direction: row-reverse;
    }

    :host,
    :host([dir='rtl'][end-side]) {
      padding-left: 0;
      padding-right: var(--md-sys-spacing-track-9);
    }

    :host([dir='rtl']),
    :host([end-side]) {
      padding-left: var(--md-sys-spacing-track-9);
      padding-right: 0;
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
      <alwatr-chat-bubble dir="rtl" .text=${this.message.text} .endSide=${this.endSide}></alwatr-chat-bubble>
    `;
  }
}
