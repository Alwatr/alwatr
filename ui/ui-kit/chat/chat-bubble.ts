import {AlwatrDummyElement, css, html, customElement, property, ifDefined, PropertyValues} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-chat-bubble': AlwatrChatBubble;
  }
}

@customElement('alwatr-chat-bubble')
export class AlwatrChatBubble extends AlwatrDummyElement {
  static override styles = css`
    :host {
      display: inline-block;
      background-color: gray;
      padding: 1em 0.85em;
    }

    :host,
    :host([dir='rtl'][end-side]) {
      border-radius: 1.5em 1.5em 1.5em 0.5em;
    }

    :host([dir='rtl']),
    :host([end-side]) {
      border-radius: 1.5em 1.5em 0.5em 1.5em;
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
