import {customElement, property, html, css, ifDefined} from '@alwatr/element';
import {AlwatrSurface} from '@alwatr/ui-kit/card/surface.js';

import '@alwatr/icon';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-text-button': AlwatrTextButton;
  }
}

@customElement('alwatr-text-button')
export class AlwatrTextButton extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        --_surface-color-bg: transparent;
        --_surface-elevation: var(--sys-surface-elevation-0) !important;

        display: flex;
        flex-grow: 1;

        overflow: hidden;
        overflow: clip;

        font-family: var(--sys-typescale-label-medium-font-family-name);
        font-weight: var(--sys-typescale-label-medium-font-weight);
        font-size: var(--sys-typescale-label-medium-font-size);
        letter-spacing: var(--sys-typescale-label-medium-letter-spacing);
        line-height: var(--sys-typescale-label-medium-line-height);
      }

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        color: inherit;
        text-decoration: none;
        gap: var(--sys-spacing-track);
        padding: var(--sys-spacing-track);
        -webkit-tap-highlight-color: transparent;
      }

      alwatr-icon {
        font-size: calc(3.5 * var(--sys-spacing-track));
      }
    `,
  ];

  @property()
    href?: string;

  @property()
    label = '';

  @property()
    icon = '';

  @property({attribute: 'url-prefix'})
    urlPrefix?: string;

  override render(): unknown {
    return html`
      <a href=${ifDefined(this.href)}>
        <alwatr-icon class="icon" .urlPrefix=${this.urlPrefix} name=${this.icon}></alwatr-icon>
        <span class="label">${this.label}</span>
      </a>
    `;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this.setAttribute('stated', '');
  }
}
