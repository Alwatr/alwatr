import {css, customElement, html, property, nothing, ifDefined} from '@alwatr/element';

import '@alwatr/icon';

import {AlwatrCard} from './card.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-icon-box': AlwatrIconBox;
  }
}

export type IconBoxContent = {
  icon: string;
  headline: string;
  description: string;
  href?: string;
  flipRtl?: boolean;
}

/**
 * Alwatr standard icon button element.
 */
@customElement('alwatr-icon-box')
export class AlwatrIconBox extends AlwatrCard {
  static override styles = [
    AlwatrCard.styles,
    css`
      :host {
        display: block;
        padding: 0;
        transition-property: color, background-color;
        transition-duration: var(--sys-motion-duration-small);
        transition-timing-function: var(--sys-motion-easing-linear);
      }
      :host(:hover) {
        --_surface-color-on: var(--sys-color-on-primary-hsl);
        --_surface-color-bg: var(--sys-color-primary-hsl);
      }

      a {
        display: block;
        padding: calc(2 * var(--sys-spacing-track));
        border-radius: inherit;
        color: inherit;
        text-decoration: none;
      }

      .headline {
        font-family: var(--sys-typescale-display-small-font-family-name);
        font-weight: var(--sys-typescale-display-small-font-weight);
        font-size: var(--sys-typescale-display-small-font-size);
        letter-spacing: var(--sys-typescale-display-small-letter-spacing);
        line-height: var(--sys-typescale-display-small-line-height);
        margin-bottom: calc(2 * var(--sys-spacing-track));
      }

      .headline alwatr-icon {
        display: block;
        margin-bottom: var(--sys-spacing-track);
        font-size: 2em;
        color: var(--sys-color-primary);
        transition: color var(--sys-motion-duration-small) var(--sys-motion-easing-linear);
      }
      :host(:hover) .headline alwatr-icon {
        color: var(--sys-color-on-primary);
      }

      .description {
        font-family: var(--sys-typescale-body-medium-font-family-name);
        font-weight: var(--sys-typescale-body-medium-font-weight);
        font-size: var(--sys-typescale-body-medium-font-size);
        letter-spacing: var(--sys-typescale-body-medium-letter-spacing);
        line-height: var(--sys-typescale-body-medium-line-height);
      }

      .headline:empty,
      .description:empty {
        display: none;
      }
    `,
  ];

  @property({type: Object})
    content?: IconBoxContent;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('stated', '');
    this.setAttribute('elevated', '3');
  }

  override render(): unknown {
    this._logger.logMethod('render');
    if (this.content == null) return nothing;
    return html`
      <a href=${ifDefined(this.content?.href)}>
        <div class="headline">
          <alwatr-icon .name=${this.content.icon} ?flip-rtl=${this.content.flipRtl}></alwatr-icon>
          ${this.content.headline}
        </div>
        <div class="description">${this.content.description}</div>
      </a>
    `;
  }
}
