import {AlwatrDummyElement, css, customElement, html, property} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-avatar': AlwatrChatAvatar;
  }
}

/**
 * Alwatr chat message avatar element.
 */
@customElement('alwatr-chat-avatar')
export class AlwatrChatAvatar extends AlwatrDummyElement {
  static override styles = css`
    :host {
      display: inline-block;
      width: calc(5 * var(--sys-spacing-track));
      height: calc(5 * var(--sys-spacing-track));
      border-radius: 50%;
      overflow: hidden;
      overflow: clip;
      overflow-clip-margin: content-box;
      box-sizing: content-box;
      flex-grow: 0;
      flex-shrink: 0;
    }

    img {
      display: block;
      width: inherit;
      height: inherit;
    }
  `;

  @property()
    user?: string;

  override render(): unknown {
    super.render();
    return html`<img src="https://i.pravatar.cc/40?u=${this.user}" alt="User ${this.user} profile image" />`;
  }
}
