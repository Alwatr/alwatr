import {AlwatrElement} from '@alwatr/element';
import {css, html, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import '@alwatr/icon';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-icon-button': AlwatrIconButton;
  }
}

@customElement('alwatr-icon-button')
export class AlwatrIconButton extends AlwatrElement {
  static override styles = [
    css`
      :host {
        display: flex;
      }
      button {
        display: inline-flex;

        justify-content: center;
        align-items: center;
        flex-shrink: 0;

        width: 3em;
        height: 3em;

        min-width: 48px;
        min-height: 48px;

        border: none;
        color: var(--text-secondary-color);
        background-color: #0000;
        border-radius: 27px;
      }
      button:hover {
        background-color: #6661;
      }
      button:active {
        background-color: #6663;
      }
      button alwatr-icon {
        font-size: 26px;
      }
    `,
  ];

  @property() name?: string;

  override render(): TemplateResult | typeof nothing {
    if (this.name == null) return nothing;

    return html`
      <button>
        <alwatr-icon .name="${this.name}"></alwatr-icon>
      </button>
    `;
  }
}
