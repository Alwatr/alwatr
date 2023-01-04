import {AlwatrDummyElement, css, html, customElement, property, DirectionMixin} from '@alwatr/element';

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
export class AlwatrChatBubble extends DirectionMixin(AlwatrDummyElement) {
  static override styles = css`
    :host {
      display: inline-block;
      padding:
        var(--alwatr-sys-spacing-track)
        calc(2 * var(--alwatr-sys-spacing-track))
        calc(1.5 * var(--alwatr-sys-spacing-track))
      ;
      color: var(--alwatr-sys-color-on-surface);
      background-color: var(--alwatr-sys-color-surface);
      white-space: pre-line;
      /* max-width: var(--alwatr-sys-spacing-column-3); */
      border-radius: var(--alwatr-sys-shape-large);
    }

    :host([side='start']),
    :host([side='end'][dir='rtl']) {
      border-bottom-left-radius: var(--alwatr-sys-shape-corner-extra-small-default-size);
      border-bottom-right-radius: var(--alwatr-sys-shape-large);
    }

    :host([side='end']),
    :host([side='start'][dir='rtl']) {
      border-bottom-left-radius: var(--alwatr-sys-shape-large);
      border-bottom-right-radius: var(--alwatr-sys-shape-corner-extra-small-default-size);
    }
  `;

  @property()
    text?: string;

  override render(): unknown {
    super.render();
    return html`${this.text ?? '...'}`;
  }
}
