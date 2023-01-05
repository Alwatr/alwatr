import {AlwatrDummyElement, css, html, unsafeCSS, customElement, property} from '@alwatr/element';

import {hostElevation} from '../elevation/style.js';

import type {TemplateResult} from '@alwatr/element';

@customElement('alwatr-top-app-bar')
export class AlwatrTopAppBar extends AlwatrDummyElement {
  static override styles = [
    unsafeCSS(hostElevation),
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
        padding: var(--sys-spacing-track) calc(0.5 * var(--sys-spacing-track));
        min-height: calc(6 * var(--sys-spacing-track));
        background-color: var(--sys-color-surface);
        z-index: var(--sys-zindex-above);

        --_elevation-level: 0.35;
        --_elevation-duration: var(--sys-motion-duration-medium-out);
      }

      .start,
      .end {
        display: flex;
        align-items: center;

        min-width: max-content;
      }
      .start {
        order: 1;
      }
      .end {
        order: 4;
      }
      .main {
        display: flex;
        align-items: center;
        order: 2;
        flex-grow: 1;
      }
      .main .label {
        user-select: none;
        padding: var(--sys-spacing-track);
        font-family: var(--sys-typescale-title-large-font-family-name);
        font-weight: var(--sys-typescale-title-large-font-weight);
        font-size: var(--sys-typescale-title-large-font-size);
        letter-spacing: var(--sys-typescale-title-large-letter-spacing);
        line-height: var(--sys-typescale-title-large-line-height);
      }
      .separator {
        order: 3;
      }

      ::slotted(alwatr-standard-icon-button) {
        width: calc(6 * var(--sys-spacing-track));
        height: calc(6 * var(--sys-spacing-track));
      }
    `,
    css`
      :host([scrolling]) {
        --_elevation-level: 3;
        --_elevation-duration: var(--sys-motion-duration-medium-in);
      }
      :host([flat]) {
        --_elevation-level: 0 !important;

        background-color: var(--sys-color-background);
      }
    `,
    css`
      :host([mode='large']) {
        padding-bottom: calc(3.5 * var(--sys-spacing-track));
      }
      :host([mode='large']) .main {
        margin-top: calc(2 * var(--sys-spacing-track));
      }
      :host([mode='medium']) .main,
      :host([mode='large']) .main {
        order: 5;
        width: 100%;
      }
      :host([mode='center']) .main {
        justify-content: center;
      }
      :host([mode='medium']) .separator,
      :host([mode='large']) .separator {
        flex-grow: 1;
      }
      :host([mode='medium']) .main .label,
      :host([mode='large']) .main .label {
        margin-inline-start: calc(0.5 * var(--sys-spacing-track));
      }
      :host([mode='medium']) .main .label {
        font-family: var(--sys-typescale-headline-small-font-family-name);
        font-weight: var(--sys-typescale-headline-small-font-weight);
        font-size: var(--sys-typescale-headline-small-font-size);
        letter-spacing: var(--sys-typescale-headline-small-letter-spacing);
        line-height: var(--sys-typescale-headline-small-line-height);
      }
      :host([mode='large']) .main .label {
        font-family: var(--sys-typescale-headline-medium-font-family-name);
        font-weight: var(--sys-typescale-headline-medium-font-weight);
        font-size: var(--sys-typescale-headline-medium-font-size);
        letter-spacing: var(--sys-typescale-headline-medium-letter-spacing);
        line-height: var(--sys-typescale-headline-medium-line-height);
      }
    `,
  ];

  @property()
    label?: string;

  @property({type: Boolean, reflect: true})
    flat = false;

  @property({type: Boolean, reflect: true})
    scrolling = false;

  @property({reflect: true})
    mode?: 'center' | 'small' | 'medium' | 'large' = 'small';

  override render(): TemplateResult {
    return html`
      <div class="start">
        <slot name="start"></slot>
      </div>

      <div class="main">
        <span class="label">${this.label}</span>
      </div>

      <span class="separator"></span>

      <div class="end">
        <slot name="end"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-top-app-bar': AlwatrTopAppBar;
  }
}

/*
      ::slotted([slot='small']),
      ::slotted([slot='center']),
      ::slotted([slot='medium']),
      ::slotted([slot='large']) {
        color: var(--alwatr-sys-color-on-surface);
        margin: 0;
      }

      ::slotted([slot='center']) {
        width: 100%;
        text-align: center;
      }
      ::slotted([slot='small']),
      ::slotted([slot='center']) {
        font-weight: var(--alwatr-sys-typescale-title-large-font-weight);
        font-size: var(--alwatr-sys-typescale-title-large-font-size);
        letter-spacing: var(--alwatr-sys-typescale-title-large-letter-spacing);
        line-height: var(--alwatr-sys-typescale-title-large-line-height);
      }
      ::slotted([slot='medium']) {
        font-weight: var(--alwatr-sys-typescale-headline-small-font-weight);
        font-size: var(--alwatr-sys-typescale-headline-small-font-size);
        letter-spacing: var(--alwatr-sys-typescale-headline-small-letter-spacing);
        line-height: var(--alwatr-sys-typescale-headline-small-line-height);
      }
      ::slotted([slot='large']) {
        font-weight: var(--alwatr-sys-typescale-headline-medium-font-weight);
        font-size: var(--alwatr-sys-typescale-headline-medium-font-size);
        letter-spacing: var(--alwatr-sys-typescale-headline-medium-letter-spacing);
        line-height: var(--alwatr-sys-typescale-headline-medium-line-height);
      }
      ::slotted(standard-icon-button) {
        width: var(--alwatr-sys-spacing-track-6);
        height: var(--alwatr-sys-spacing-track-6);
      } */
