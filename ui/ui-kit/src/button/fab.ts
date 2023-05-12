import {css, customElement, html, property, type PropertyValueMap} from '@alwatr/element';

import {AlwatrSurface} from '../card/surface.js';

import type {StringifyableRecord} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-fab': AlwatrFab;
  }
}

export interface AlwatrFabContent extends StringifyableRecord {
  icon: string;
  label?: string;
}

@customElement('alwatr-fab')
export class AlwatrFab extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        --_surface-color-on: var(--sys-color-primary-hsl);
        position: fixed;
        bottom: calc(2 * var(--sys-spacing-track));
        z-index: var(--sys-zindex-fixed);
        box-shadow: var(--sys-surface-elevation-1);
        display: inline-flex;
        align-items: center;
        gap: var(--sys-spacing-track);
        min-width: calc(6 * var(--sys-spacing-track));
        text-align: center;
        vertical-align: middle;
        padding: 0 calc(1.5 * var(--sys-spacing-track));
        font-family: var(--sys-typescale-label-large-font-family-name);
        font-weight: var(--sys-typescale-label-large-font-weight);
        font-size: var(--sys-typescale-label-large-font-size);
        letter-spacing: var(--sys-typescale-label-large-letter-spacing);
        line-height: var(--sys-typescale-label-large-line-height);
        line-height: calc(5 * var(--sys-spacing-track));
        white-space: nowrap;
        user-select: none;
        cursor: pointer;
        border-radius: calc(2 * var(--sys-spacing-track));
      }

      alwatr-icon {
        color: var(--sys-color-on-primary-container);
      }
    `,
  ];

  protected override firstUpdated(_changedProperties: PropertyValueMap<this>): void {
    super.firstUpdated(_changedProperties);
    this.setAttribute('elevated', '3');
    this.setAttribute('stated', '');
  }

  @property({type: Object})
    content?: AlwatrFabContent;

  override render(): unknown {
    return html`
      <alwatr-icon .name=${this.content?.icon}></alwatr-icon>
      <div>${this.content?.label}</div>
    `;
  }
}
