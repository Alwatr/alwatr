import {
  AlwatrBaseElement,
  css,
  customElement,
  html,
  property,
  DirectionMixin,
  SignalMixin,
  type PropertyValues,
} from '@alwatr/element';

import './chat-avatar.js';
import './chat-bubble.js';

import type {ChatMessage, StringifyableRecord} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-message': AlwatrChatMessage;
  }
}

export interface ChatMessageContent extends StringifyableRecord {
  message: ChatMessage;
  self: boolean;
}

/**
 * Alwatr chat message box element.
 *
 * @attr self
 */
@customElement('alwatr-chat-message')
export class AlwatrChatMessage extends DirectionMixin(SignalMixin(AlwatrBaseElement)) {
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

  protected override update(_changedProperties: PropertyValues<this>): void {
    super.update(_changedProperties);

    const self = this.content?.self ?? false;
    if (this.hasAttribute('self') !== self) {
      this.toggleAttribute('self', self);
    }
  }

  @property()
    content?: ChatMessageContent;

  override render(): unknown {
    this._logger.logMethod?.('render');
    const content: ChatMessageContent = this.content ?? {
      message: {type: 'text', id: '', from: '', text: ''},
      self: false,
    };

    const bubble = html`<alwatr-chat-bubble
      .text=${content.message.text}
      side=${content.self ? 'end' : 'start'}
    ></alwatr-chat-bubble>`;

    // prettier-ignore
    return content.self
      ? bubble
      : [html`<alwatr-chat-avatar .user=${content.message.from}></alwatr-chat-avatar>`, bubble];
  }
}
