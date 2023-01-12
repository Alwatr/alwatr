import {customElement, AlwatrSmartElement, css, html} from '@alwatr/element';

import '@material/web/textfield/filled-text-field.js';
import '@material/web/button/filled-button.js';
import '@alwatr/ui-kit/card/card.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-form': AlwatrPageForm;
  }
}

/**
 * Alwatr Demo Form Page
 */
@customElement('alwatr-page-form')
export class AlwatrPageForm extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: block;
      height: 100%;
      padding: 0 var(--sys-spacing-side-padding);
      box-sizing: border-box;
    }
    .card {
      display: flex;
      direction: rtl;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      padding: calc(2 * var(--sys-spacing-track));
      margin: calc(2 * var(--sys-spacing-track));
      gap: calc(2 * var(--sys-spacing-track));
      border-radius: var(--sys-radius-medium);
    }
    md-filled-text-field,
    md-filled-button {
      --_supporting-text-line-height: var(--sys-typescale-label-small-line-height);
      --_supporting-text-tracking: var(--sys-typescale-label-small-letter-spacing);
      --_supporting-text-weight: var(--sys-typescale-label-small-font-weight);
      --_supporting-text-font: var(--sys-typescale-label-small-font-family-name);
      --_supporting-text-size: var(--sys-typescale-label-small-font-size);

      --_label-text-line-height: var(--sys-typescale-label-medium-line-height);
      --_label-text-tracking: var(--sys-typescale-label-medium-letter-spacing);
      --_label-text-weight: var(--sys-typescale-label-medium-font-weight);
      --_label-text-font: var(--sys-typescale-label-medium-font-family-name);
      --_label-text-size: var(--sys-typescale-label-medium-font-size);

      --_label-text-populated-size: var(--sys-typescale-label-small-font-size);
      --_label-text-populated-line-height: var(--sys-typescale-label-small-line-height);

      --_input-text-line-height: var(--sys-typescale-label-medium-line-height);
      --_input-text-tracking: var(--sys-typescale-label-medium-letter-spacing);
      --_input-text-weight: var(--sys-typescale-label-medium-font-weight);
      --_input-text-font: var(--sys-typescale-label-medium-font-family-name);
      --_input-text-size: var(--sys-typescale-label-medium-font-size);

      flex-grow: 1;
    }
  `;

  override render(): unknown {
    super.render();
    return html`
      <alwatr-card class="card" elevated>
        <md-filled-text-field label="نام"></md-filled-text-field>
        <md-filled-text-field label="نام خانوادگی"></md-filled-text-field>
        <md-filled-text-field label="شماره تماس" type="tel" textDirection="ltr" inputmode="tel"></md-filled-text-field>
        <md-filled-text-field
          label="شماره قرعه کشی"
          type="text"
          textDirection="ltr"
          inputmode="numeric"
        ></md-filled-text-field>
        <md-filled-button label="ثبت" hasIcon></md-filled-button>
      </alwatr-card>
    `;
  }
}
