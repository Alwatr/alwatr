import {AlwatrBaseElement, css, html, customElement, property, DirectionMixin, SignalMixin} from '@alwatr/element';

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
export class AlwatrChatBubble extends DirectionMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: inline-block;
      padding:
        var(--sys-spacing-track)
        calc(2 * var(--sys-spacing-track))
        calc(1.5 * var(--sys-spacing-track))
      ;
      color: var(--sys-color-on-surface);
      background-color: var(--sys-color-surface);
      white-space: pre-line;
      /* max-width: var(--sys-spacing-column-3); */
      border-radius: var(--sys-radius-large);
    }

    :host([side='start']),
    :host([side='end'][dir='rtl']) {
      border-bottom-left-radius: var(--sys-radius-xsmall);
      border-bottom-right-radius: var(--sys-radius-large);
    }

    :host([side='end']),
    :host([side='start'][dir='rtl']) {
      border-bottom-left-radius: var(--sys-radius-large);
      border-bottom-right-radius: var(--sys-radius-xsmall);
    }
  `;

  @property()
    text?: string;

  override render(): unknown {
    this._logger.logMethod('render');
    return html`${this.text ?? '...'}`;
  }
}
