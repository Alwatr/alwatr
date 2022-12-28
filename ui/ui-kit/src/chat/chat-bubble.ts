import {AlwatrDummyElement, css, html, customElement, property} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-bubble': AlwatrChatBubble;
  }
}

/**
 * Alwatr chat message bubble box element.
 *
 * @attr {start|end} side
 *
 */
@customElement('alwatr-chat-bubble')
export class AlwatrChatBubble extends AlwatrDummyElement {
  static override styles = css`
    :host {
      display: inline-block;
      padding: var(--md-sys-spacing-track-1) var(--md-sys-spacing-track-2) var(--md-sys-spacing-halftrack-3);
      color: var(--md-sys-color-on-surface);
      background-color: var(--md-sys-color-surface);
      white-space: pre-line;
      /* max-width: var(--md-sys-spacing-column-3); */
      border-radius: var(--md-sys-shape-large);
    }

    :host([side='start']),
    :host([side='end'][dir='rtl']) {
      border-bottom-left-radius: var(--md-sys-shape-corner-extra-small-default-size);
      border-bottom-right-radius: var(--md-sys-shape-large);
    }

    :host([side='end']),
    :host([side='start'][dir='rtl']) {
      border-bottom-left-radius: var(--md-sys-shape-large);
      border-bottom-right-radius: var(--md-sys-shape-corner-extra-small-default-size);
    }
  `;

  @property()
    text?: string;

  override render(): unknown {
    super.render();
    return html`${this.text ?? '...'}`;
  }
}
