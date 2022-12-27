import {AlwatrDummyElement, css, html, TemplateResult} from '@alwatr/element';

import {hostElevation} from '../elavation/style.js';

export class AlwatrCard extends AlwatrDummyElement {
  static override styles = [
    hostElevation,
    css`
      :host {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border-radius: var(--md-sys-shape-corner-small-default-size);
      }
    `,
  ];

  override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
