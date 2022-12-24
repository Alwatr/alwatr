import {AlwatrElement} from '@alwatr/element';
import {css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-message': AlwatrChatMessage;
  }
}

@customElement('alwatr-chat-message')
export class AlwatrChatMessage extends AlwatrElement {
  static override styles = [
    css`
      :host {
        display: flex;
        align-items: end;
        gap: 0.75em;
        justify-content: start;
      }
      alwatr-avatar {
        order: 1;
      }
      alwatr-message-bubble {
        order: 2;
      }

      :host([endSide]) {
        justify-content: end;
      }
      :host([endSide]) alwatr-avatar {
        order: 2;
      }
      :host([endSide]) alwatr-message-bubble {
        order: 1;
      }
    `,
  ];

  @property({attribute: false}) message?: string;
  @property({reflect: true, type: Boolean}) endSide = false;

  override render(): TemplateResult {
    return html`
      <alwatr-avatar></alwatr-avatar>
      <alwatr-message-bubble .message=${this.message} ?endSide=${this.endSide}></alwatr-message-bubble>
    `;
  }
}
