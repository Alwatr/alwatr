import {
  css,
  LocalizeMixin,
  SignalMixin,
  AlwatrBaseElement,
  type CSSResultGroup,
} from '@alwatr/element';
import '@alwatr/icon';
import '@alwatr/ui-kit/button/icon-button.js';
import '@alwatr/ui-kit/card/surface.js';

import './order-shipping-form.js';
import './order-status-box.js';

export class AlwatrOrderDetailBase extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles: CSSResultGroup = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
      gap: var(--sys-spacing-track);
    }

    :host([state=reloading]) > * {
      opacity: var(--sys-surface-disabled-opacity);
    }

    alwatr-surface {
      --_surface-color-on: var(--sys-color-on-surface-variant-hsl);
    }

    .product-item {
      display: flex;
      flex-direction: row;
      gap: var(--sys-spacing-track);
    }

    .product-item > img {
      display: block;
      width: calc(6 * var(--sys-spacing-track));
      border-radius: var(--sys-radius-small);
      align-self: flex-start;
    }

    .detail-container {
      flex-grow: 1;
    }

    .detail-container > * {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--sys-spacing-track);
    }

    .detail-container > *:last-child {
      margin-bottom: 0;
    }

    .submit-container {
      text-align: end;
    }

    /* ----- */
    .number-field {
      --_surface-color-on: var(--sys-color-on-surface-variant-hsl);
      /* --_surface-color-bg: var(--sys-color-surface-variant-hsl); */
      display: flex;
      align-items: center;
      padding: 0;
      font-family: var(--sys-typescale-body-large-font-family-name);
      font-weight: var(--sys-typescale-body-large-font-weight);
      font-size: var(--sys-typescale-body-large-font-size);
      letter-spacing: var(--sys-typescale-body-large-letter-spacing);
      line-height: var(--sys-typescale-body-large-line-height);
      border-radius: var(--sys-radius-xsmall);
      text-align: center;
      box-shadow: none;
      border-bottom: 1px solid var(--sys-color-outline);
      border-radius: var(--sys-radius-xsmall) var(--sys-radius-xsmall) 0 0;
      width: calc(20 * var(--sys-spacing-track));
      margin-right: auto;
    }
    alwatr-text-field {
      display: block;
      padding: 0;
      width: 100%;
      flex-grow: 1;
      border-radius: inherit;
    }

    /* So not group these selectors! */
    input::placeholder {
      font: inherit;
      color: var(--sys-color-on-surface-variant);
    }
    input::-webkit-input-placeholder {
      font: inherit;
      color: var(--sys-color-on-surface-variant);
    }
    input::-moz-placeholder {
      font: inherit;
      color: var(--sys-color-on-surface-variant);
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `;
}
