import {AlwatrDummyElement, css, customElement, html, nothing, property, DirectionMixin} from '@alwatr/element';
import './chat-avatar.js';
import './chat-bubble.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-message': AlwatrChatMessage;
  }
}

// TODO: ChatPhotoMessage
export type ChatMessage = TextMessage & {
  from: string;
};

/**
 * Alwatr chat message box element.
 *
 * @attr self
 */
@customElement('alwatr-chat-message')
export class AlwatrChatMessage extends DirectionMixin(AlwatrDummyElement) {
  static override styles = css`
    :host {
      display: flex;
      align-items: flex-end;
      gap: var(--md-sys-spacing-track-1);
      flex-direction: row;
      justify-content: flex-start;
      align-self: flex-start;
      padding-left: 0;
      padding-right: var(--md-sys-spacing-track-6);
    }

    :host([self]) {
      justify-content: flex-end;
      align-self: flex-end;
      padding-right: 0;
      padding-left: var(--md-sys-spacing-track-9);
    }

    :host([dir='rtl']) {
      padding-right: 0;
      padding-left: var(--md-sys-spacing-track-6);
    }

    :host([dir='rtl'][self]) {
      padding-left: 0;
      padding-right: var(--md-sys-spacing-track-9);
    }

    :host([self]) alwatr-chat-bubble {
      color: var(--md-sys-color-on-secondary);
      background-color: var(--md-sys-color-secondary);
    }

    alwatr-chat-bubble {
      max-width: var(--md-sys-spacing-column-3);
    }
  `;

  @property({type: Object, attribute: false})
    message?: ChatMessage;

  @property({type: Boolean, attribute: 'self', reflect: true})
    self = false;

  override render(): unknown {
    super.render();
    if (this.message == null) return nothing;

    const bubble = html`<alwatr-chat-bubble
      .text=${this.message.text}
      side=${this.self ? 'end' : 'start'}
    ></alwatr-chat-bubble>`;

    // prettier-ignore
    return this.self
      ? bubble
      : [html`<alwatr-chat-avatar .user=${this.message.from}></alwatr-chat-avatar>`, bubble];
  }
}
