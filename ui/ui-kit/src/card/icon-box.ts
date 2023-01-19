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
  description?: string;
  href?: string;
  flipRtl?: boolean;
  target?: 'download' | '_blank';
};

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
        user-select: none;
        -webkit-user-select: none;
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
        font-family: var(--sys-typescale-headline-small-font-family-name);
        font-weight: var(--sys-typescale-headline-small-font-weight);
        font-size: var(--sys-typescale-headline-small-font-size);
        letter-spacing: var(--sys-typescale-headline-small-letter-spacing);
        line-height: var(--sys-typescale-headline-small-line-height);
      }

      .headline alwatr-icon {
        display: block;
        margin-bottom: var(--sys-spacing-track);
        font-size: 1.5em;
        color: var(--sys-color-primary);
        transition: color var(--sys-motion-duration-small) var(--sys-motion-easing-linear);
      }
      :host(:hover) .headline alwatr-icon {
        color: var(--sys-color-on-primary);
      }

      .description {
        font-family: var(--sys-typescale-body-small-font-family-name);
        font-weight: var(--sys-typescale-body-small-font-weight);
        font-size: var(--sys-typescale-body-small-font-size);
        letter-spacing: var(--sys-typescale-body-small-letter-spacing);
        line-height: var(--sys-typescale-body-small-line-height);
        margin-top: calc(2 * var(--sys-spacing-track));
        white-space: pre-line;
      }

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
    const target = this.content.target !== 'download' ? this.content.target : undefined;

    return html`
      <a
        href=${ifDefined(this.content.href)}
        target=${ifDefined(target)}
        ?download=${this.content.target === 'download'}
      >
        <div class="headline">
          <alwatr-icon .name=${this.content.icon} ?flip-rtl=${this.content.flipRtl}></alwatr-icon>
          <span>${this.content.headline}</span>
        </div>
        <div class="description">${this.content.description}</div>
      </a>
    `;
  }
}
