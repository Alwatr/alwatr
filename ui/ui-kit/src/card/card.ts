import {AlwatrDummyElement, css, html, TemplateResult} from '@alwatr/element';

export class AlwatrCard extends AlwatrDummyElement {
  static override styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        border-radius: var(--sys-shape-corner-medium-default-size);
        color: var(--sys-color-on-surface);

        --elevation-level: 0;
      }
    `,
  ];

  override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
