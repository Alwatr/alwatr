import {AlwatrDummyElement, css, html, customElement, property, ifDefined, PropertyValues} from '@alwatr/element';

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
    }

    :host,
    :host([dir='rtl'][end-side]) {
      border-radius: 1.8rem;
      border-bottom-left-radius: 0.5rem;
    }

    :host([dir='rtl']),
    :host([end-side]) {
      border-bottom-left-radius: 1.8rem;
      border-bottom-right-radius: 0.5rem;
    }
  `;

  @property()
    message?: string;

  @property({type: Boolean, attribute: 'end-side', reflect: true})
    endSide = false;

  protected override shouldUpdate(_changedProperties: PropertyValues): boolean {
    return super.shouldUpdate(_changedProperties) &&
      !(_changedProperties.size === 1 && _changedProperties.has('endSide'));
  }

  override render(): unknown {
    return html`${ifDefined(this.message)}`;
  }
}
