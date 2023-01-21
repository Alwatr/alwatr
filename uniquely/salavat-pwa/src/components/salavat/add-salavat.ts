import {customElement, html, css, LocalizeMixin, state, property, AlwatrSmartElement} from '@alwatr/element';
import {SignalInterface} from '@alwatr/signal';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-add-salavat': AlwatrAddSalavat;
  }
}

@customElement('alwatr-add-salavat')
export class AlwatrAddSalavat extends LocalizeMixin(AlwatrSmartElement) {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .my-salavat-count {
      display: flex;
      align-items: center;
      justify-content: center;
      text-shadow: 0.05em 0.05em 0.2em #0008;
      gap: var(--sys-spacing-track);
      font-family: var(--sys-typescale-title-medium-font-family-name);
      font-weight: var(--sys-typescale-title-medium-font-weight);
      font-size: var(--sys-typescale-title-medium-font-size);
      letter-spacing: var(--sys-typescale-title-medium-letter-spacing);
      line-height: var(--sys-typescale-title-medium-line-height);
    }

    .my-salavat-count .count {
      direction: ltr;
      font-weight: 700;
    }

    .my-salavat-count .count .increase {
      display: inline-block;
      text-align: center;
      min-width: calc(5 * var(--sys-spacing-track));
      color: var(--sys-color-tertiary);
    }

    .salavat-add {
      display: flex;
      align-items: center;
      padding: 0 calc(2 * var(--sys-spacing-track));
    }

    .salavat-add alwatr-standard-icon-button {
      --_surface-color-bg: var(--sys-color-on-tertiary-hsl);
      --_surface-color-on: var(--sys-color-tertiary-hsl);
    }

    .salavat-add mwc-slider {
      --mdc-theme-primary: var(--sys-color-tertiary);
      --mdc-theme-on-primary: var(--sys-color-on-tertiary);
      --mdc-theme-on-surface: var(--sys-color-on-surface);

      flex-grow: 1;
      margin: 0 -12px;
    }
  `;

  @property({type: Number})
    mySalavatCount = 0;

  @state()
  protected salavatIncreaseCount = 0;

  @state()
  protected addSalavatSliderMax = 50;

  static salavatIncreaseSignal = new SignalInterface('salavat-increase');

  override connectedCallback(): void {
    super.connectedCallback();

    const salavatIncreaseSignalListener = AlwatrAddSalavat.salavatIncreaseSignal.addListener((value) => {
      this.salavatIncreaseCount = value;
    });

    this._signalListenerList.push(salavatIncreaseSignalListener);
  }

  override render(): unknown {
    return html`
      <div class="my-salavat-count">
        صلوات های من:
        <div class="count">
          <span class="old-salavat">${this.l10n.formatNumber(this.mySalavatCount)}</span>
          <span class="increase">+ ${this.l10n.formatNumber(this.salavatIncreaseCount)}</span>
        </div>
      </div>
      <div class="salavat-add">
        <alwatr-standard-icon-button
          icon="add-outline"
          stated
          @click=${this.increaseSalavatSlider}
        ></alwatr-standard-icon-button>
        <mwc-slider
          dir="ltr"
          min="0"
          .max=${this.addSalavatSliderMax}
          .value=${this.salavatIncreaseCount}
          @input=${this.addSalavatSliderInput}
          @change=${this.addSalavatSliderChange}
        ></mwc-slider>
        <alwatr-standard-icon-button
          icon="remove-outline"
          stated
          @click=${this.decreaseSalavatSlider}
        ></alwatr-standard-icon-button>
      </div>
    `;
  }

  private increaseSalavatSlider(event: PointerEvent): void {
    event.stopPropagation();

    if (this.salavatIncreaseCount < this.addSalavatSliderMax) {
      this.salavatIncreaseCount++;
    }


    this.addSalavatSliderInput(new CustomEvent<{value: number}>('input', {detail: {value: this.salavatIncreaseCount}}));
    this.addSalavatSliderChange(
        new CustomEvent<{value: number}>('change', {detail: {value: this.salavatIncreaseCount}}),
    );
  }

  private decreaseSalavatSlider(event: PointerEvent): void {
    event.stopPropagation();

    if (this.salavatIncreaseCount > 0) {
      this.salavatIncreaseCount--;
    }

    this.addSalavatSliderInput(new CustomEvent<{value: number}>('input', {detail: {value: this.salavatIncreaseCount}}));
    this.addSalavatSliderChange(
        new CustomEvent<{value: number}>('change', {detail: {value: this.salavatIncreaseCount}}),
    );
  }

  private addSalavatSliderInput(event: CustomEvent<{value: number}>): void {
    AlwatrAddSalavat.salavatIncreaseSignal.dispatch(event.detail.value);
  }

  private addSalavatSliderChange(event: CustomEvent<{value: number}>): void {
    this.addSalavatSliderMax = calcAddSalavatSliderMax(event.detail.value);
  }
}

const salavatSliderMaxValues = [50, 100, 200, 500, 1_000, 2_000, 5_000];

function calcAddSalavatSliderMax(value: number): number {
  let last = 0;

  for (const max of salavatSliderMaxValues) {
    last = max;
    if (value < max * 0.9) break;
  }

  return last;
}
