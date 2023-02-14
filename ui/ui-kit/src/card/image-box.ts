import {css, customElement, html, property, nothing, ifDefined, type PropertyValues} from '@alwatr/element';
import '@alwatr/icon';

import {AlwatrSurface} from './surface.js';

import type {StringifyableRecord} from '@alwatr/type';


declare global {
  interface HTMLElementTagNameMap {
    'alwatr-image-box': AlwatrImageBox;
  }
}

export interface ImageBoxContent extends StringifyableRecord {
  image: string;
  headline: string;
  description?: string;
  href?: string;
  target?: 'download' | '_blank';
  highlight?: boolean;
  stated?: boolean;
  preLine?: boolean;
  elevated?: number;
}

/**
 * Alwatr image box element.
 */
@customElement('alwatr-image-box')
export class AlwatrImageBox extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        position: relative;
        display: block;
        padding: 0;
        transition-property: color, background-color, opacity, height;
        transition-duration: var(--sys-motion-duration-small), var(--sys-motion-duration-small),
          var(--sys-motion-duration-small), var(--sys-motion-duration-medium);
        transition-timing-function: var(--sys-motion-easing-normal);
        font-family: var(--sys-typescale-body-small-font-family-name);
        font-weight: var(--sys-typescale-body-small-font-weight);
        font-size: var(--sys-typescale-body-small-font-size);
        letter-spacing: var(--sys-typescale-body-small-letter-spacing);
        line-height: var(--sys-typescale-body-small-line-height);
        user-select: none;
        -webkit-user-select: none;
        cursor: pointer;
      }

      :host([selected]) {
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
        font-family: var(--sys-typescale-headline-small-font-family-name);
        font-weight: var(--sys-typescale-headline-small-font-weight);
        font-size: var(--sys-typescale-headline-small-font-size);
        letter-spacing: var(--sys-typescale-headline-small-letter-spacing);
        line-height: var(--sys-typescale-headline-small-line-height);
      }

      .checkmark-icon {
        display: none;
        color: var(--sys-color-primary);
        position: absolute;
        font-size: var(--sys-typescale-headline-small-font-size);
        padding: var(--sys-spacing-track);
        filter: drop-shadow(var(--sys-surface-elevation-1));
      }

      :host([selected]) .checkmark-icon {
        display: inline;
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
    content?: ImageBoxContent;

  @property({type: Boolean})
    selected = false;

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

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._toggleSelect);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._toggleSelect);
  }

  protected _toggleSelect(): void {
    this.selected = !this.selected;

    if (this.selected) {
      this.setAttribute('selected', '');
      navigator.vibrate(30);
    }
    else {
      this.removeAttribute('selected');
      navigator.vibrate(10);
    }
  }

  override render(): unknown {
    this._logger.logMethod('render');
    const content = this.content;
    if (content == null) return nothing;
    const target = content.target !== 'download' ? content.target : undefined;

    const template = html`
      <alwatr-icon class="checkmark-icon" .name=${'checkmark-circle-sharp'}></alwatr-icon>
      <img class="image" src=${content.image} />
      <div class="content-container">
        <h3 class="headline">${content.headline}</h3>
        <div class="description"><slot>${content.description}</slot></div>
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
