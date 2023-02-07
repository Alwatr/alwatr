import {css, html, customElement, property, nothing, type PropertyValues, map} from '@alwatr/element';

import {AlwatrSurface} from '../card/surface.js';

import '@alwatr/ui-kit/button/icon-button.js';

import type {IconButtonContent} from '../button/icon-button.js';
import type {StringifyableRecord} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-top-app-bar': AlwatrTopAppBar;
  }
}

export interface TopAppBarContent extends StringifyableRecord {
  type: 'center' | 'small' | 'medium' | 'large';
  headline: string;
  startIcon: IconButtonContent;
  endIconList?: Array<IconButtonContent>
}

/**
 * Alwatr top app bar.
 *
 * @attr {center|small|medium|large} [type=small]
 */
@customElement('alwatr-top-app-bar')
export class AlwatrTopAppBar extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        display: block;
        padding: var(--sys-spacing-track) calc(0.5 * var(--sys-spacing-track));
        z-index: var(--sys-zindex-sticky);
      }

      .row {
        display: flex;
      }

      .headline {
        display: none;
      }

      .title {
        flex-grow: 1;
        font-family: var(--sys-typescale-title-large-font-family-name);
        font-weight: var(--sys-typescale-title-large-font-weight);
        font-size: var(--sys-typescale-title-large-font-size);
        letter-spacing: var(--sys-typescale-title-large-letter-spacing);
        /* line-height: var(--sys-typescale-title-large-line-height); */
        line-height: calc(6 * var(--sys-spacing-track) - 0.2em);
      }

      .leading-icon {
        --comp-icon-button-color-hsl: var(--sys-color-on-surface-hsl);
      }

      .trailing-icons {
        --comp-icon-button-color-hsl: var(--sys-color-on-surface-variant-hsl);
      }
    `,
  ];

  @property({type: Object, attribute: false})
    content?: TopAppBarContent;

  protected override shouldUpdate(changedProperties: PropertyValues<this>): boolean {
    return super.shouldUpdate(changedProperties) && this.content != null;
  }

  override render(): unknown {
    this._logger.logMethod('render');
    if (this.content == null) return nothing;

    this.setAttribute('type', this.content.type);
    const title = this.content.type === 'center' || this.content.type === 'small' ? this.content.headline : nothing;
    const headline = this.content.type === 'medium' || this.content.type === 'large' ? this.content.headline : nothing;

    return html`
      <div class="row">
        <alwatr-icon-button class="leading-icon" .content=${this.content.startIcon}></alwatr-icon-button>
        <div class="title">${title}</div>
        ${map(this.content.endIconList, (iconContent) => html`
          <alwatr-icon-button class="trailing-icons" .content=${iconContent}></alwatr-icon-button>
        `)}
      </div>
      <div class="headline">${headline}</div>
    `;
  }
}

/*
  TODO:
    1.
    https://m3.material.io/components/top-app-bar/specs
*/
