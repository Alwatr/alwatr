import {css, customElement, html, property, nothing, ifDefined} from '@alwatr/element';

import {AlwatrSurface} from './surface.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-image-box': AlwatrImageBox;
  }
}

export type IconBoxContent = {
  image: string;
  headline: string;
  description?: string;
  href?: string;
  target?: 'download' | '_blank';
};

/**
 * Alwatr image box element.
 */
@customElement('alwatr-image-box')
export class AlwatrImageBox extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        display: block;
        padding: 0;
        width: 40%;
        flex-grow: 1;
        transition-property: color, background-color, opacity, height;
        transition-duration:
          var(--sys-motion-duration-small),
          var(--sys-motion-duration-small),
          var(--sys-motion-duration-small),
          var(--sys-motion-duration-medium)
        ;
        transition-timing-function: var(--sys-motion-easing-normal);
        font-family: var(--sys-typescale-body-small-font-family-name);
        font-weight: var(--sys-typescale-body-small-font-weight);
        font-size: var(--sys-typescale-body-small-font-size);
        letter-spacing: var(--sys-typescale-body-small-letter-spacing);
        line-height: var(--sys-typescale-body-small-line-height);
        user-select: none;
        -webkit-user-select: none;
        overflow: hidden;
        overflow: clip;
      }

      :host([highlight]) {
        cursor: pointer;
      }

      :host([highlight]:hover) {
        --_surface-color-on: var(--sys-color-on-primary-hsl);
        --_surface-color-bg: var(--sys-color-primary-hsl);
      }

      .container {
        display: block;
        border-radius: inherit;
        color: inherit;
      }

      .content-container {
        padding: calc(2 * var(--sys-spacing-track));
      }

      .image {
        width: 100%;
        height: auto;
        border-radius: inherit;
      }

      .headline {
        margin: 0;
        color: var(--sys-color-on-surface);
        font-family: var(--sys-typescale-headline-small-font-family-name);
        font-weight: var(--sys-typescale-headline-small-font-weight);
        font-size: var(--sys-typescale-headline-small-font-size);
        letter-spacing: var(--sys-typescale-headline-small-letter-spacing);
        line-height: var(--sys-typescale-headline-small-line-height);
      }

      .description {
        margin-top: calc(2 * var(--sys-spacing-track));
        font-weight: var(--sys-typescale-body-medium-font-weight);
        font-family: var(--sys-typescale-body-medium-font-family-name);
        font-size: var(--sys-typescale-body-medium-font-size);
        letter-spacing: var(--sys-typescale-body-medium-letter-spacing);
        line-height: var(--sys-typescale-body-medium-line-height);
      }

      :host([pre-line]) .description {
        white-space: pre-line;
      }
    `,
  ];

  @property({type: Object})
    content?: IconBoxContent;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('elevated', '3');
  }

  override render(): unknown {
    this._logger.logMethod('render');
    const content = this.content;
    if (content == null) return nothing;
    const target = content.target !== 'download' ? content.target : undefined;

    const template = html`
      <img class="image" src=${content.image} />
      <div class="content-container">
        <h3 class="headline">${content.headline}</h3>
        <div class="description">${content.description}</div>
      </div>
    `;

    return content.href == null
      ? html`<div class="container">${template}</div>`
      : html`<a
          class="container"
          href=${ifDefined(content.href)}
          target=${ifDefined(target)}
          ?download=${content.target === 'download'}
        >${template}</a>`;
  }
}
