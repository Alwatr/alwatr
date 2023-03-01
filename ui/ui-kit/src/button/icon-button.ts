import {css, customElement, html, property, type PropertyValues} from '@alwatr/element';
import '@alwatr/icon';
import {eventTrigger} from '@alwatr/signal';

import {AlwatrSurface} from '../card/surface.js';

import type {StringifyableRecord, ClickSignalType, Stringifyable} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-icon-button': AlwatrStandardIconButton;
  }
}

export interface IconButtonContent extends StringifyableRecord {
  /**
   * Icon name.
   */
  icon: string;

  /**
   * Flip icon on rtl
   */
  flipRtl?: true;

  /**
   * Unique name for identify click event over signal.
   */
  clickSignalId?: string;

  /**
   * Dispatched signal with ClickSignalType and this detail.
   */
  clickDetail?: Stringifyable;

  disabled?: true;
}

/**
 * Alwatr standard icon button element.
 *
 * @attr {Boolean} flip-rtl
 *
 * @cssprop {String} [--comp-icon-button-color-hsl=var(--sys-color-on-surface-variant-hsl)]
 */
@customElement('alwatr-icon-button')
export class AlwatrStandardIconButton extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        --_surface-color-on: var(--comp-icon-button-color-hsl, var(--sys-color-on-surface-variant-hsl));
        --_surface-state-color: var(--comp-icon-button-color-hsl, var(--sys-color-on-surface-variant-hsl));

        display: inline-block;
        padding: calc(0.5 * var(--sys-spacing-track));
        font-size: calc(3 * var(--sys-spacing-track)); /* icon size */
        background-image: none;
        background-color: hsla(var(--_surface-state-color), var(--_surface-state-opacity));
        background-clip: content-box;
        border-radius: 50%;
        box-shadow: none;

        user-select: none;
        cursor: pointer;
        align-self: center;
        vertical-align: middle;
        flex-grow: 0;
        flex-shrink: 0;
      }

      alwatr-icon {
        display: block;
        padding: var(--sys-spacing-track);
      }
    `,
  ];

  @property({type: Object, attribute: false})
    content?: IconButtonContent;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('stated', '');
    this.addEventListener('click', this._click);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._click);
  }

  protected override shouldUpdate(changedProperties: PropertyValues<this>): boolean {
    return super.shouldUpdate(changedProperties) && this.content != null;
  }

  override render(): unknown {
    this._logger.logMethod('render');
    if (this.content == null) return;

    const disabled = Boolean(this.content.disabled);
    if (this.hasAttribute('disabled') === disabled) {
      this.toggleAttribute('disabled', disabled);
    }

    return html`<alwatr-icon .name=${this.content.icon} ?flip-rtl=${this.content.flipRtl}></alwatr-icon>`;
  }

  protected _click(event: MouseEvent): void {
    const clickSignalId = this.content?.clickSignalId;
    this._logger.logMethodArgs('_click', {signalId: clickSignalId});
    if (clickSignalId) {
      eventTrigger.dispatch<ClickSignalType>(clickSignalId, {
        x: event.clientX,
        y: event.clientY,
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        detail: this.content?.clickDetail,
      });
    }
  }
}

/*
  TODO:
    1. Filled icon button
    2. Filled tonal icon button
    3. Outlined icon button
    4. toggle/selected mode
    https://m3.material.io/components/icon-buttons/specs
*/
