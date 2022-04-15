import {LitElement, html, css} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {when} from 'lit/directives/when.js';

import {logger} from './core';
import {getSvgContent} from './requests';
import {getUrl} from './utils';

import type {TemplateResult, PropertyValues} from 'lit';

@customElement('alwatr-icon')
export class AlWatrIcon extends LitElement {
  @state() private svgContent?: string;
  @state() private isVisible = false;

  @property({reflect: true}) name!: string;
  @property() size!: string;

  @query('div.icon-inner') private _iconInner!: HTMLDivElement;

  private _logger = logger;

  static override styles = [
    css`
      :host {
        display: inline-block;

        width: 1em;
        height: 1em;

        contain: strict;

        fill: currentColor;

        box-sizing: content-box !important;
      }

      .icon-inner,
      svg {
        display: block;

        height: 100%;
        width: 100%;
      }
    `,
  ];

  protected override render(): TemplateResult {
    return html`
      ${when(this.isVisible, () => html`<div class="icon-inner"></div>`)}
    `;
  }

  protected override willUpdate(
      changedProperties: PropertyValues,
  ): void {
    if (changedProperties.has('name')) {
      this._logger.logProperty('name', this.name);
      this.loadIcon();
    }
  }

  protected override updated(): void {
    if (this.isVisible) {
      this._iconInner.innerHTML = this.svgContent ?? '';
    }
  }

  protected loadIcon(): void {
    const url = getUrl(this);

    getSvgContent(url).then((svgContent) => {
      this.svgContent = svgContent;
    });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.isVisible = true;
    this.loadIcon();
  }
}
