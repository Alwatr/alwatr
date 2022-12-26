import {AlwatrDummyElement, customElement, property} from '@alwatr/element';
import {css, html} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-avatar': AlwatrChatAvatar;
  }
}

@customElement('alwatr-chat-avatar')
export class AlwatrChatAvatar extends AlwatrDummyElement {
  static override styles = css`
    :host {
      display: inline-block;
      width: 4rem;
      height: 4rem;
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
  `;

  @property()
    user = '';

  override render(): unknown {
    return html`<img src="https://i.pravatar.cc/40?u=${this.user}" alt="User ${this.user} profile image" />`;
  }
}
