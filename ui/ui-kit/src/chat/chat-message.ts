import {
  AlwatrDummyElement,
  css,
  customElement,
  html,
  nothing,
  property,
  DirectionMixin,
  SignalMixin,
} from '@alwatr/element';

import type {ChatMessage} from '@alwatr/type';

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
 * @attr self
 */
@customElement('alwatr-chat-message')
export class AlwatrChatMessage extends DirectionMixin(SignalMixin(AlwatrDummyElement)) {
  static override styles = css`
    :host {
      display: flex;
      align-items: flex-end;
      gap: var(--sys-spacing-track);
      flex-direction: row;
      justify-content: flex-start;
      align-self: flex-start;
      padding-left: 0;
      padding-right: calc(6 * var(--sys-spacing-track));
    }

    :host([self]) {
      justify-content: flex-end;
      align-self: flex-end;
      padding-right: 0;
      padding-left: calc(9 * var(--sys-spacing-track));
    }

    :host([dir='rtl']) {
      padding-right: 0;
      padding-left: calc(6 * var(--sys-spacing-track));
    }

    :host([dir='rtl'][self]) {
      padding-left: 0;
      padding-right: calc(9 * var(--sys-spacing-track));
    }

    :host([self]) alwatr-chat-bubble {
      color: var(--sys-color-on-secondary);
      background-color: var(--sys-color-secondary);
    }

    alwatr-chat-bubble {
      max-width: var(--sys-spacing-column-3);
    }
  `;

  @property({type: Object, attribute: false})
    message?: ChatMessage;

  @property({type: Boolean, attribute: 'self', reflect: true})
    self = false;

  override render(): unknown {
    super.render();
    if (this.message == null || this.message.type !== 'text') return nothing;

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
