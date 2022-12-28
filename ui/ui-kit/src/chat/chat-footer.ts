import {AlwatrDummyElement, css, customElement, html} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-footer': AlwatrChatFooter;
  }
}

/**
 * Alwatr chat footer element.
 */
@customElement('alwatr-chat-footer')
export class AlwatrChatFooter extends AlwatrDummyElement {
  static override styles = css`
    :host {
      display: flex;
    }
    footer {
      border-top-left-radius: var(--md-sys-shape-corner-large-top-top-left);
      border-top-right-radius: var(--md-sys-shape-corner-large-top-top-right);
      color: var(--md-sys-color-on-surface);
      background-color: var(--md-sys-color-surface);
    }
  `;

  override render(): unknown {
    return html` <footer></footer> `;
  }
}
