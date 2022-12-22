import {AlwatrElement} from '@alwatr/element';
import {css, html, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';

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

  @property() src?: string;
  @property() alt?: string;

  override render(): TemplateResult | typeof nothing {
    if (this.src == null) return nothing;

    return html` <img src=${this.src} alt=${ifDefined(this.alt)} /> `;
  }
}
