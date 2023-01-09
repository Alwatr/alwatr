import {customElement, AlwatrDummyElement, css, html, DirectionMixin, property} from '@alwatr/element';

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
      padding: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track));
      user-select: none;

      color: var(--sys-color-on-surface);
      background-color: var(--sys-color-surface);
    }

    :host([dir='ltr']) {
      padding-right: calc(3 * var(--sys-spacing-track));
    }

    :host([dir='rtl']) {
      padding-left: calc(3 * var(--sys-spacing-track));
    }
  `;

  @property()
    headline?: string;

  @property()
    description?: string;

  @property()
    icon?: string;

  @property()
    actionIcon?: string;

  @property({type: Boolean})
    checkmark = false;

  @property({type: Boolean, reflect: true})
    chips = false;

  @property({type: Boolean, reflect: true})
    selected = false;

  @property({type: Boolean, reflect: true})
    disabled = false;

  @property({type: Boolean, reflect: true})
    selectable = false;

  @property({type: Boolean, reflect: true})
    highlighted = false;

  override render(): unknown {
    super.render();
    return html``;
  }
}
