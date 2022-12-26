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
      background-color: lightgrey;
      padding: 0.6rem 1.2rem;
    }

    :host,
    :host([dir='rtl'][end-side]) {
      border-radius: 1.5rem 1.5rem 1.5rem 0.5rem;
    }

    :host([dir='rtl']),
    :host([end-side]) {
      border-radius: 1.5rem 1.5rem 0.5rem 1.5rem;
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
