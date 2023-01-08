import {customElement, AlwatrDummyElement, css, html, DirectionMixin} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-list-item': AlwatrListItem;
  }
}

/**
 * Alwatr List Item
 */
@customElement('alwatr-list-item')
export class AlwatrListItem extends DirectionMixin(AlwatrDummyElement) {
  static override styles = css`
    :host {
      display: block;
      padding: var(--sys-spacing-track);
      user-select: none;
    }
  `;

  override render(): unknown {
    super.render();
    return html`
    `;
  }
}
