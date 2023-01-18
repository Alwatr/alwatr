import {AlwatrSurfaceElement, ifDefined, css, customElement, html, property} from '@alwatr/element';

import '@alwatr/icon';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-icon-box': AlwatrStandardIconButton;
  }
}

export type iconBoxProperties = {
  icon: string;
  headline: string;
  description: string;
  href?: string;
  flipRtl: boolean;
}

/**
 * Alwatr standard icon button element.
 *
 * @prop {String} icon
 * @prop {String} href
 * @prop {String} headline
 * @prop {String} description
 * @prop {String} urlPrefix
 * @prop {Boolean} flipRtl
 *
 * @attr {String} icon
 * @attr {String} href
 * @attr {String} headline
 * @attr {String} description
 * @attr {String} url-prefix
 * @attr {Boolean} flip-rtl
 */
@customElement('alwatr-icon-box')
export class AlwatrStandardIconButton extends AlwatrSurfaceElement {
  static override styles = [
    AlwatrSurfaceElement.styles,
    css`
      :host {
        display: flex;
        transition-property: background-color, color;
      }

      a {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: calc(3 * var(--sys-spacing-track));
        gap: calc(1.5 * var(--sys-spacing-track));
        color: inherit;
        text-decoration: none;
      }

      .headline {
        font-family: var(--sys-typescale-title-large-font-family-name);
        font-weight: var(--sys-typescale-title-large-font-weight);
        font-size: var(--sys-typescale-title-large-font-size);
        letter-spacing: var(--sys-typescale-title-large-letter-spacing);
        line-height: var(--sys-typescale-title-large-line-height);
      }

      .description {
        font-family: var(--sys-typescale-label-large-font-family-name);
        font-weight: var(--sys-typescale-label-large-font-weight);
        font-size: var(--sys-typescale-label-large-font-size);
        letter-spacing: var(--sys-typescale-label-large-letter-spacing);
        line-height: var(--sys-typescale-label-large-line-height);
      }

      .headline:empty,
      .description:empty {
        display: none;
      }

      alwatr-icon {
        color: var(--sys-color-primary);
        width: calc(5 * var(--sys-spacing-track));
        height: calc(5 * var(--sys-spacing-track));
        margin-bottom: var(--sys-spacing-track);
        transition-property: color;
      }

      :host,
      :host alwatr-icon {
        transition-duration: var(--sys-motion-duration-small-out);
        transition-timing-function: var(--sys-motion-easing-exiting);
      }
    `,
    css`
      :host(:hover) {
        --_surface-color-on: var(--sys-color-on-primary-hsl);
        --_surface-color-bg: var(--sys-color-primary-hsl);
      }
      :host(:hover) alwatr-icon {
        color: var(--sys-color-on-primary);
      }

      :host(:hover),
      :host(:hover) alwatr-icon {
        transition-duration: var(--sys-motion-duration-small-in);
        transition-timing-function: var(--sys-motion-easing-incoming);
      }
    `,
  ];

  @property({type: Object})
    properties: iconBoxProperties = {
      icon: '',
      description: '',
      flipRtl: false,
      headline: '',
    };

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('stated', '');
    this.setAttribute('elevated', '');
  }

  override render(): unknown {
    return html`
      <a href=${ifDefined(this.properties?.href)}>
        <alwatr-icon .name=${this.properties.icon} ?flip-rtl=${this.properties.flipRtl}></alwatr-icon>
        <div class="headline">${this.properties.headline}</div>
        <div class="description">${this.properties.description}</div>
      </a>
    `;
  }
}
