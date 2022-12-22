import {AlwatrElement} from '@alwatr/element';
import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-avatar': AlwatrAvatar;
  }
}

@customElement('alwatr-avatar')
export class AlwatrAvatar extends AlwatrElement {
  static override styles = [
    css`
      :host {
        display: flex;
        flex-shrink: 0;
        width: 35px;
        height: 35px;
        overflow: hidden;
        border-radius: 50%;
      }
      img {
        width: 100%;
        height: 100%;
      }
    `,
  ];

  override render(): TemplateResult {
    return html` <img src="https://picsum.photos/200/200?random=3" /> `;
  }
}
