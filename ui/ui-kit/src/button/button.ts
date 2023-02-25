import {css, customElement, html, property} from '@alwatr/element';
import '@alwatr/icon';
import {eventTrigger} from '@alwatr/signal';

import {AlwatrSurface} from '../card/surface.js';

import type {ClickSignalType} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-button': AlwatrButton;
  }
}

/**
 * Alwatr outlined text field.
 */
@customElement('alwatr-button')
export class AlwatrButton extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        --_surface-color-on: var(--sys-color-primary-hsl);
        background-color: transparent;
        display: inline-block;
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
        border-radius: var(--sys-radius-xlarge);
        white-space: nowrap;
        user-select: none;
        cursor: pointer;
      }
    `,
  ];

  @property({attribute: 'signal-id'})
    signalId?: string;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('stated', '');
    this.addEventListener('click', this._click);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._click);
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return html`<slot>button</slot>`;
  }

  protected _click(event: MouseEvent): void {
    this._logger.logMethodArgs('_click', {signalId: this.signalId});
    if (this.signalId) {
      eventTrigger.dispatch<ClickSignalType>(this.signalId, {
        x: event.clientX,
        y: event.clientY,
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
      });
    }
  }
}
