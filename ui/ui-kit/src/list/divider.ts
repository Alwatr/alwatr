import {customElement, AlwatrDummyElement, css} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-divider': AlwatrListItem;
  }
}

/**
 * Alwatr List Divider
 *
 * @attr {Boolean} boxed
 */
@customElement('alwatr-divider')
export class AlwatrListItem extends AlwatrDummyElement {
  static override styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      background-color: var(--sys-color-outline-variant);
    }

    :host([boxed]) {
      margin-left: calc(2 * var(--sys-spacing-track));
      margin-right: calc(2 * var(--sys-spacing-track));
    }
  `;
}
