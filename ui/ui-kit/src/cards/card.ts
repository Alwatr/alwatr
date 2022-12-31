import {AlwatrDummyElement, css, html, TemplateResult} from '@alwatr/element';

import {hostElevation} from '../elavation/style.js';

export class AlwatrCard extends AlwatrDummyElement {
  static override styles = [
    hostElevation,
    css`
      :host {
        display: flex;
        flex-direction: column;
        border-radius: var(--alwatr-sys-shape-corner-medium-default-size);
        color: var(--alwatr-sys-color-on-surface);
      }
    `,
  ];

  override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
