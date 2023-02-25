import {
  css,
  html,
  customElement,
  property,
  nothing,
  map,
  DirectionMixin,
  SignalMixin,
  type PropertyValues,
} from '@alwatr/element';
import {contextConsumer} from '@alwatr/signal';

import '../button/icon-button.js';
import {AlwatrSurface} from '../card/surface.js';

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
  endIconList?: Array<IconButtonContent>;
  elevated?: number;
  tinted?: number;
}

/**
 * Alwatr top app bar.
 *
 * @attr {center|small|medium|large} [type=small]
 * @attr {String} context-signal - context signal name
 */
@customElement('alwatr-top-app-bar')
export class AlwatrTopAppBar extends DirectionMixin(SignalMixin(AlwatrSurface)) {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        display: block;
        flex-grow: 0;
        flex-shrink: 0;
        padding: var(--sys-spacing-track) calc(0.5 * var(--sys-spacing-track));
        z-index: var(--sys-zindex-sticky);
        border-radius: 0;
        user-select: none;
      }

      .row {
        display: flex;
      }

      .leading-icon {
        --comp-icon-button-color-hsl: var(--sys-color-on-surface-hsl);
      }

      .trailing-icons {
        --comp-icon-button-color-hsl: var(--sys-color-on-surface-variant-hsl);
      }

      .title {
        flex-grow: 1;
      }

      :host([type=small]) .title,
      :host([type=center]) .title {
        padding: 0 calc(0.5 * var(--sys-spacing-track));
        font-family: var(--sys-typescale-title-large-font-family-name);
        font-weight: var(--sys-typescale-title-large-font-weight);
        font-size: var(--sys-typescale-title-large-font-size);
        letter-spacing: var(--sys-typescale-title-large-letter-spacing);
        /* line-height: var(--sys-typescale-title-large-line-height); */
        line-height: calc(6 * var(--sys-spacing-track));
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        overflow: clip;
      }

      :host([dir=rtl][type=small]) .title,
      :host([dir=rtl][type=center]) .title {
        line-height: calc(6 * var(--sys-spacing-track) - 0.18em); /* 0.5 * track / title-line-height */
      }

      :host([type=center]) .title {
        text-align: center;
      }

      .headline { /* medium | large */
        display: none;
      }

      :host([type=medium]) {
        padding-bottom: calc(3 * var(--sys-spacing-track));
      }
      :host([type=large]) {
        padding-bottom: calc(3.5 * var(--sys-spacing-track));
      }

      :host([type=medium]) .headline,
      :host([type=large]) .headline {
        display: block;
        padding: 0 calc(1.5 * var(--sys-spacing-track));
      }

      :host([type=medium]) .headline {
        font-family: var(--sys-typescale-headline-small-font-family-name);
        font-weight: var(--sys-typescale-headline-small-font-weight);
        font-size: var(--sys-typescale-headline-small-font-size);
        letter-spacing: var(--sys-typescale-headline-small-letter-spacing);
        line-height: var(--sys-typescale-headline-small-line-height);
      }

      :host([type=large]) .headline {
        margin-top: calc(4 * var(--sys-spacing-track));
        font-family: var(--sys-typescale-headline-medium-font-family-name);
        font-weight: var(--sys-typescale-headline-medium-font-weight);
        font-size: var(--sys-typescale-headline-medium-font-size);
        letter-spacing: var(--sys-typescale-headline-medium-letter-spacing);
        line-height: var(--sys-typescale-headline-medium-line-height);
      }
    `,
  ];

  @property({type: Object, attribute: false})
    content?: TopAppBarContent;

  override connectedCallback(): void {
    super.connectedCallback();
    const contextSignal = this.getAttribute('context-signal');
    if (contextSignal) {
      this._signalListenerList.push(
          contextConsumer.subscribe<TopAppBarContent>(contextSignal, (context) => {
            this.content = context;
            this.requestUpdate(); // Ensure update on child properties changes.
          },
          {receivePrevious: 'NextCycle'}),
      );
    }
  }

  protected override shouldUpdate(changedProperties: PropertyValues<this>): boolean {
    return super.shouldUpdate(changedProperties) && this.content != null;
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);
    if (changedProperties.has('content') && this.content != null) {
      if (this.content.elevated != null && this.content.elevated > 0) {
        this.setAttribute('elevated', this.content.elevated + '');
      }
      else {
        this.removeAttribute('elevated');
      }
      if (this.content.tinted != null && this.content.tinted > 0) {
        this.setAttribute('tinted', this.content.tinted + '');
      }
      else {
        this.removeAttribute('tinted');
      }
    }
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
