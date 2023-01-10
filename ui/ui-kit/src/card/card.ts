import {AlwatrDummyElement, css, html} from '@alwatr/element';

import type {CSSResultGroup} from '@alwatr/element';

/**
 * Alwatr Card Base Element
 */
export class AlwatrCard extends AlwatrDummyElement {
  static override styles: CSSResultGroup = css`
    :host {
      --elevation-level: 0;
      border-radius: var(--sys-shape-corner-medium-default-size);
      color: var(--sys-color-on-surface);
      background-color: var(--sys-color-surface);
    }
  `;

  override render(): unknown {
    super.render();
    return html`<slot></slot>`;
  }
}
