import {AlwatrElement} from '@alwatr/element';
import {html, css} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';

import type {TemplateResult} from 'lit';

@customElement('alwatr-icon')
export class AlwatrIcon extends AlwatrElement {
  static override styles = [
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  override render(): TemplateResult {
    return html`<h1>AlWatr Icon Component</h1>`;
  }
}
