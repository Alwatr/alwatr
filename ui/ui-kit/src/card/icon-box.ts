import {css, customElement, html, property, nothing, ifDefined, PropertyValues, when} from '@alwatr/element';

import '@alwatr/icon';

import {AlwatrSurface} from './surface.js';

import type {StringifyableRecord} from '@alwatr/type';


declare global {
  interface HTMLElementTagNameMap {
    'alwatr-icon-box': AlwatrIconBox;
  }
}

export interface IconBoxContent extends StringifyableRecord {
  icon?: string;
  headline: string;
  description?: string;
  href?: string;
  flipRtl?: boolean;
  target?: string;
  highlight?: boolean;
  stated?: boolean;
  preLine?: boolean;
  elevated?: number;
}

/**
 * Alwatr standard icon button element.
 *
 * @attr {Boolean} highlight - Primary color on hover and active
 * @attr {Boolean} pre-line - Add `white-space: pre-line;` to description
 */
@customElement('alwatr-icon-box')
export class AlwatrIconBox extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        display: block;
        padding: 0;
        transition-property: color, background-color, opacity, height;
        transition-duration: var(--sys-motion-duration-small), var(--sys-motion-duration-small),
          var(--sys-motion-duration-small), var(--sys-motion-duration-large);
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
        padding: calc(2 * var(--sys-spacing-track));
        border-radius: inherit;
        color: inherit;
        text-decoration: inherit;
      }

      .headline {
        font-family: var(--sys-typescale-headline-small-font-family-name);
        font-weight: var(--sys-typescale-headline-small-font-weight);
        font-size: var(--sys-typescale-headline-small-font-size);
        letter-spacing: var(--sys-typescale-headline-small-letter-spacing);
        line-height: var(--sys-typescale-headline-small-line-height);
        margin: 0;
      }

      .headline alwatr-icon {
        display: block;
        margin-bottom: var(--sys-spacing-track);
        font-size: 1.5em;
        color: var(--sys-color-primary);
        transition: color var(--sys-motion-duration-small) var(--sys-motion-easing-normal);
      }
      :host([highlight]:hover) .headline alwatr-icon {
        color: var(--sys-color-on-primary);
      }

      .description {
        margin-top: calc(2 * var(--sys-spacing-track));
      }
      :host([pre-line]) .description {
        white-space: pre-line;
      }
    `,
  ];

  @property({type: Object})
    content?: IconBoxContent;

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);
    if (changedProperties.has('content') && this.content != null) {
      this.toggleAttribute('highlight', Boolean(this.content.highlight));
      this.toggleAttribute('stated', Boolean(this.content.stated));
      this.toggleAttribute('pre-line', Boolean(this.content.preLine));
      if (this.content.elevated != null && this.content.elevated > 0) {
        this.setAttribute('elevated', this.content.elevated + '');
      }
      else {
        this.removeAttribute('elevated');
      }
    }
  }

  override render(): unknown {
    this._logger.logMethod('render');
    const content = this.content;
    if (content == null) return nothing;
    const target = content.target !== 'download' ? content.target : undefined;

    const template = html`
      <h3 class="headline">
        ${when(content.icon, () => html`
          <alwatr-icon .name=${content.icon} ?flip-rtl=${content.flipRtl}></alwatr-icon>
        `)}
        <span>${content.headline}</span>
      </h3>
      <div class="description"><slot>${content.description}</slot></div>
    `;

    return content.href == null
      ? html`<div class="container">${template}</div>`
      : html`<a
          class="container"
          href=${ifDefined(content.href)}
          target=${ifDefined(target)}
          ?download=${content.target === 'download'}
          >${template}</a
        >`;
  }
}
