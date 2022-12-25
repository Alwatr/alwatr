import {AlwatrDummyElement, customElement, property} from '@alwatr/element';
import {css, html} from 'lit';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-avatar': AlwatrChatAvatar;
  }
}

@customElement('alwatr-chat-avatar')
export class AlwatrChatAvatar extends AlwatrDummyElement {
  static override styles = [
    css`
      :host {
        display: inline-block;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        overflow: hidden;
        overflow: clip;
        overflow-clip-margin: content-box;
        box-sizing: content-box;
      }

      img {
        display: block;
        width: inherit;
        height: inherit;
      }
    `,
  ];

  @property()
    user = '';

  override render(): TemplateResult {
    return html`<img src="https://i.pravatar.cc/40?u=${this.user}" alt="User ${this.user} profile image" />`;
  }
}
