import {customElement, AlwatrDummyElement, css, html, property} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-list': AlwatrList;
  }
}

/**
 * Alwatr List Item
 */
@customElement('alwatr-list')
export class AlwatrList extends AlwatrDummyElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }
  `;

  @property({type: Array<unknown>})
    list?: Array<unknown>;

  @property()
    headlineKey = 'headline';

  @property()
    descriptionKey = 'description';

  @property({type: Boolean})
    removable = false;

  @property({type: Boolean})
    selectable = false;

  @property({type: Boolean})
    multiselect = false;

  @property({type: Boolean})
    checkmark = false;

  @property({type: Boolean})
    chips = false;

  @property({type: Boolean})
    disabled = false;

  override render(): unknown {
    super.render();
    return html``;
  }
}
