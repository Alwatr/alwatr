import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

import '@alwatr/ui-kit/chat/chat-avatar.js';
import '@alwatr/ui-kit/chat/chat-bubble.js';
import '@alwatr/ui-kit/chat/chat-message.js';
import '@alwatr/ui-kit/chat/chat-text-input.js';

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
  static override styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      height: 100%;
      overflow-y: auto;
      padding: 1.5rem;
    }

    p {
      padding: 1.5rem;
      color: var(--md-sys-color-on-surface-variant);
      background-color: var(--md-sys-color-surface-variant);
    }
    p.on-primary {
      color: var(--md-sys-color-on-surface);
      background-color: var(--md-sys-color-surface);
      border: 1px solid var(--md-sys-color-on-surface);
    }

    .section-name {
      display: block;
      margin-bottom: 1rem;
    }
  `;

  override render(): unknown {
    return html`
      text on surface

      <p>
        text on surface-variant
      </p>

      <p>
        <span class="section-name">alwatr-chat-avatar</span>
        <alwatr-chat-avatar .user=${'1'}></alwatr-chat-avatar>
        <alwatr-chat-avatar .user=${'2'}></alwatr-chat-avatar>
        <alwatr-chat-avatar .user=${'3'}></alwatr-chat-avatar>
      </p>

      <p>
        <span class="section-name">alwatr-chat-bubble</span>
        <alwatr-chat-bubble .message=${'سلام'}></alwatr-chat-bubble>
        <alwatr-chat-bubble .message=${'چطوری؟'} end-side></alwatr-chat-bubble>
        <br /><br />
        <alwatr-chat-bubble
          .message=${'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
          ' Veritatis quia nemo eaque laboriosam unde consequatur!'}
        ></alwatr-chat-bubble>
      </p>

      <p>
        <span class="section-name">alwatr-chat-message</span>
        <alwatr-chat-message .user=${'1'} .message=${'سلام'}></alwatr-chat-message>
        <br />
        <alwatr-chat-message .user=${'2'} .message=${'چطوری؟'} end-side></alwatr-chat-message>
        <br />
        <alwatr-chat-message
          .user=${'3'}
          .message=${'Lorem ipsum dolor sit amet consectetur adipisicing elit.' +
          ' Veritatis quia nemo eaque laboriosam unde consequatur!'}
        ></alwatr-chat-message>
      </p>
      <p class="on-primary">
        <span class="section-name">alwatr-chat-text-input</span>
        <alwatr-chat-text-input></alwatr-chat-text-input>
      </p>
    `;
  }
}
