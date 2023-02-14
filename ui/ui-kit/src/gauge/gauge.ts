import {
  customElement,
  css,
  html,
  svg,
  AlwatrDummyElement,
  property,
  type PropertyValues,
} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-gauge': AlwatrGauge;
  }
}

@customElement('alwatr-gauge')
export class AlwatrGauge extends AlwatrDummyElement {
  static override styles = css`
    :host {
      display: block;
      height: 100%;
    }

    svg {
      display: block;
      margin: 0 auto;
      stroke: var(--sys-color-primary);
      stroke-width: 5px;
      stroke-linecap: round;
    }
  `;

  @property({type: Number})
    radius = 50;

  @property({type: Number})
    p1x = 200;

  @property({type: Number})
    p1y = 100;

  @property({type: Number})
    p2x = 200;

  @property({type: Number})
    p2y = 100;

  @property({type: Number})
    rotate = 0;

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);
    this.p2x = this.p1x + this.radius + Math.cos(this.rotate) * this.radius;
    this.p2y = this.p1y - Math.sin(this.rotate) * this.radius;
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return html`<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      ${svg`
      <path fill="transparent"
        d="M ${this.p1x} ${this.p1y} A ${this.radius} ${this.radius} 0 ${this.rotate > 0 ? 0 : 1} 1 ${this.p2x} ${this.p2y}"
      />
    `}
    </svg>`;
  }
}
