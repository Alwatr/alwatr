import {PropertyValues, css, customElement, html, nothing, property} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/icon';
import {eventTrigger} from '@alwatr/signal';

import {AlwatrSurface} from '../card/surface.js';

import type {ClickSignalType, Stringifyable, StringifyableRecord} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-button': AlwatrButton;
  }
}

export interface ButtonContent extends StringifyableRecord {
  /**
   * Label.
   */
  label?: string

  /**
   * Label i18n key.
   */
  labelKey?: string;

  /**
   * Icon name.
   */
  icon?: string;

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

  disabled?: boolean;
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

  @property({type: Object})
    content?: ButtonContent;

  protected override firstUpdated(_changedProperties: PropertyValues<this>): void {
    super.firstUpdated(_changedProperties);
    this.setAttribute('stated', '');
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._click);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._click);
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);

    if (this.content?.disabled != null && this.hasAttribute('disabled') !== this.content.disabled) {
      this.toggleAttribute('disabled', this.content.disabled);
    }
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    const content = this.content || {};

    return [
      content.icon
        ? html`<alwatr-icon .name=${content.icon} ?flip-rtl=${content.flipRtl}></alwatr-icon>`
        : nothing,
      html`<slot>${content.label ?? message(content.labelKey)}</slot>`,
    ];
  }

  protected _click(event: MouseEvent): void {
    if (this.content?.clickSignalId == null) return;
    this._logger.logMethodArgs?.('click', {clickSignalId: this.content.clickSignalId});
    eventTrigger.dispatch<ClickSignalType>(this.content.clickSignalId, {
      x: event.clientX,
      y: event.clientY,
      altKey: event.altKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      detail: this.content.clickDetail,
    });
  }
}
