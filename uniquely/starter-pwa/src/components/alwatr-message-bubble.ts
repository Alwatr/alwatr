import {AlwatrElement} from '@alwatr/element';
import {css, html, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-message-bubble': AlwatrMessageBubble;
  }
}

/**
 * @attr {'start' | 'end'} side
 * @prop {string} message
 */
@customElement('alwatr-message-bubble')
export class AlwatrMessageBubble extends AlwatrElement {
  static override styles = [
    css`
      :host {
        display: flex;
        background-color: #fff;
        font-size: 14px;
        color: var(--text-primary-color);
        padding: 1em 0.85em;
      }
      :host([side='start']) {
        border-radius: 1.5em 1.5em 0.5em 1.5em;
      }
      :host([side='end']) {
        border-radius: 1.5em 1.5em 1.5em 0.5em;
      }
    `,
  ];

  @property({attribute: false}) message?: string;

  override render(): TemplateResult | typeof nothing {
    return html` ${this.message?.trim()} `;
  }
}
