import { home } from '@one/svg-icon/ion-icon.js';
import { LitElement, html, css, TemplateResult } from 'lit';

export class Typography extends LitElement
{
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render(): TemplateResult<1>
  {
    return html`${home}`;
  }
}

window.customElements.define('app-typography', Typography);
