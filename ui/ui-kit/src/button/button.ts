import {css, customElement, html, property} from '@alwatr/element';
import '@alwatr/icon';
import {eventTrigger} from '@alwatr/signal';

import {AlwatrSurface} from '../card/surface.js';

import type {ClickSignalType, Stringifyable} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-button': AlwatrButton;
  }
}

/**
 * Alwatr outlined text field.
 *
 * @attr click-signal-id
 */
@customElement('alwatr-button')
export class AlwatrButton extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        --_surface-color-on: var(--sys-color-primary-hsl);
        background-color: transparent;
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
        border-radius: var(--sys-radius-xlarge);
        white-space: nowrap;
        user-select: none;
        cursor: pointer;
      }

      alwatr-icon {
        font-size: calc(2.5 * var(--sys-spacing-track));
      }
    `,
  ];

  @property()
    icon?: string;

  @property({attribute: 'click-signal-id'})
    clickSignalId?: string;

  @property({attribute: false})
    detail?: Stringifyable;

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
    if (this.icon) {
      return html`
        <alwatr-icon .name=${this.icon} ?flip-rtl=${this.hasAttribute('flip-rtl')}></alwatr-icon>
        <slot>button</slot>
      `;
    }
    else {
      return html`<slot>button</slot>`;
    }
  }

  protected _click(event: MouseEvent): void {
    this._logger.logMethodArgs('click', {clickSignalId: this.clickSignalId});
    if (this.clickSignalId) {
      eventTrigger.dispatch<ClickSignalType>(this.clickSignalId, {
        x: event.clientX,
        y: event.clientY,
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        detail: this.detail,
      });
    }
  }
}
