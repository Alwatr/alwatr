import {AlwatrDummyElement, css, html, nothing, customElement, property} from '@alwatr/element';

import type {TemplateResult} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-bubble': AlwatrChatBubble;
  }
}

@customElement('alwatr-chat-bubble')
export class AlwatrChatBubble extends AlwatrDummyElement {
  static override styles = [
    css`
      :host {
        display: flex;
        background-color: #fff;
        font-size: 14px;
        color: var(--text-primary-color);
        padding: 1em 0.85em;
        border-radius: 1.5em 1.5em 0.5em 1.5em;
      }

      :host([endSide]) {
        border-radius: 1.5em 1.5em 1.5em 0.5em;
      }
    `,
  ];

  @property({attribute: false}) message?: string;
  @property({reflect: true, state: false, type: Boolean}) endSide = false;

  override render(): TemplateResult | typeof nothing {
    return html` ${this.message?.trim()} `;
  }
}
