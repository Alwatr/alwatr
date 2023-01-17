import {type CSSResultGroup, AlwatrSurfaceElement, css, customElement, html} from '@alwatr/element';

export type CardType = 'elevated' | 'filled' | 'outlined';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-card': AlwatrCard;
  }
}

/**
 * Alwatr Card Base Element
 */
@customElement('alwatr-card')
export class AlwatrCard extends AlwatrSurfaceElement {
  static override styles: CSSResultGroup = [
    AlwatrSurfaceElement.styles,
    css`
      :host {
        padding: calc(2 * var(--sys-spacing-track));
      }
    `,
  ];

  override render(): unknown {
    super.render();
    return html`<slot></slot>`;
  }
}
