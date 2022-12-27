import {AlwatrDummyElement, css, html, customElement, property, PropertyValues} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-bubble': AlwatrChatBubble;
  }
}

/**
 * Alwatr chat message bubble box element.
 *
 * @attr end-side
 *
 */
@customElement('alwatr-chat-bubble')
export class AlwatrChatBubble extends AlwatrDummyElement {
  static override styles = css`
    :host {
      display: inline-block;
      padding: 0.8rem 1.4rem;
      color: var(--md-sys-color-on-surface);
      background-color: var(--md-sys-color-surface);
      white-space: pre-line;
    }

    :host,
    :host([dir='rtl'][end-side]) {
      border-radius: var(--md-sys-shape-large);
      border-bottom-left-radius: var(--md-sys-shape-corner-extra-small-default-size);
    }

    :host([dir='rtl']),
    :host([end-side]) {
      border-bottom-left-radius: var(--md-sys-shape-large);
      border-bottom-right-radius: var(--md-sys-shape-corner-extra-small-default-size);
    }
  `;

  @property()
    text?: string;

  @property({type: Boolean, attribute: 'end-side', reflect: true})
    endSide = false;

  protected override shouldUpdate(_changedProperties: PropertyValues): boolean {
    return super.shouldUpdate(_changedProperties) &&
      !(_changedProperties.size === 1 && _changedProperties.has('endSide'));
  }

  override render(): unknown {
    super.render();
    return html`${this.text ?? '...'}`;
  }
}
