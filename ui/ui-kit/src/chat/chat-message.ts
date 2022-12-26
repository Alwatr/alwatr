import {AlwatrDummyElement, css, customElement, html, property} from '@alwatr/element';
import './chat-avatar.js';
import './chat-bubble.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-message': AlwatrChatMessage;
  }
}

/**
 * Alwatr chat message box element.
 *
 * @attr end-side
 *
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

  @property()
    user?: string;

  @property()
    message?: string;

  @property({type: Boolean, attribute: 'end-side', reflect: true})
    endSide = false;

  override render(): unknown {
    return html`
      <alwatr-chat-avatar .user=${this.user}></alwatr-chat-avatar>
      <alwatr-chat-bubble .message=${this.message} .endSide=${this.endSide}></alwatr-chat-bubble>
    `;
  }
}
