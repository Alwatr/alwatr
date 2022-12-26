import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

import '@alwatr/ui-kit/chat/chat-avatar.js';
import '@alwatr/ui-kit/chat/chat-bubble.js';
import '@alwatr/ui-kit/chat/chat-message.js';

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
  static override styles = [
    css`
      :host {
        display: block;
        box-sizing: border-box;
        height: 100%;
        overflow-y: auto;
      }
    `,
  ];

  override render(): unknown {
    return html`
      <p>
        <alwatr-chat-avatar .user=${'1'}></alwatr-chat-avatar>
        <alwatr-chat-avatar .user=${'2'}></alwatr-chat-avatar>
        <alwatr-chat-avatar .user=${'3'}></alwatr-chat-avatar>
      </p>
      <p>
        <alwatr-chat-bubble .message=${'سلام'}></alwatr-chat-bubble>
        <alwatr-chat-bubble .message=${'چطوری؟'} end-side></alwatr-chat-bubble>
        <alwatr-chat-bubble
          .message=${'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
          ' Veritatis quia nemo eaque laboriosam unde consequatur!'}
        ></alwatr-chat-bubble>
      </p>
      <p>
        <alwatr-chat-message .user=${'1'} .message=${'سلام'}></alwatr-chat-message>
        <alwatr-chat-message .user=${'2'} .message=${'چطوری؟'} end-side></alwatr-chat-message>
        <alwatr-chat-message
          .user=${'3'}
          .message=${'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
          ' Veritatis quia nemo eaque laboriosam unde consequatur!'}
        ></alwatr-chat-message>
      </p>
    `;
  }
}
