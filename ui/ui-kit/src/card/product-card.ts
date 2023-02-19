import {
  css,
  customElement,
  SignalMixin,
  LocalizeMixin,
  ToggleMixin,
  nothing,
  html,
  property,
  type PropertyValues,
} from '@alwatr/element';
import {number} from '@alwatr/i18n';
import '@alwatr/icon';

import {AlwatrSurface} from './surface.js';
import '../button/icon-button.js';

import type {StringifyableRecord} from '@alwatr/type';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-product-card': AlwatrProductCard;
  }
}

export interface ProductCartContent extends StringifyableRecord {
  title: string;
  imagePath: string;
  price?: number;
  finalPrice?: number;
}

/**
 * Alwatr elevated card element.
 */
@customElement('alwatr-product-card')
export class AlwatrProductCard extends ToggleMixin(LocalizeMixin(SignalMixin(AlwatrSurface))) {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        display: block;
        padding: 0;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        --_surface-color-on: var(--sys-color-on-surface-hsl);
        --_surface-color-bg: var(--sys-color-surface-hsl);
        outline: 2px solid transparent;
      }

      :host([selected]) {
        --_surface-color-on: var(--sys-color-inverse-on-surface-hsl);
        --_surface-color-bg: var(--sys-color-inverse-surface-hsl);
        border-radius: var(--sys-radius-xlarge);
        outline: 2px solid var(--sys-color-inverse-surface);
      }

      img {
        display: block;
        box-sizing: border-box;
        width: 100%;
        min-height: 50px;
        height: auto;
        border-radius: 0 0 var(--sys-radius-medium) var(--sys-radius-medium);
        filter: brightness(1);
        transition: filter var(--sys-motion-duration-small) var(--sys-motion-easing-normal);
      }

      :host([selected]) img {
        filter: brightness(0.8);
      }

      @media (prefers-color-scheme: dark) {
        img {
          filter: brightness(0.8);
        }
        :host([selected]) img {
          filter: brightness(1);
        }
      }

      .content{
        padding: calc(2 * var(--sys-spacing-track));

      }
      .title {
        margin: 0;
        /* text-align: center; */
        font-family: var(--sys-typescale-headline-small-font-family-name);
        font-weight: var(--sys-typescale-headline-small-font-weight);
        font-size: var(--sys-typescale-headline-small-font-size);
        letter-spacing: var(--sys-typescale-headline-small-letter-spacing);
        line-height: var(--sys-typescale-headline-small-line-height);
        margin-bottom: var(--sys-spacing-track);
      }

      .price {
        text-align: end;
        color: var(--sys-color-on-surface-variant);
        font-family: var(--sys-typescale-body-small-font-family-name);
        font-weight: var(--sys-typescale-body-small-font-weight);
        font-size: var(--sys-typescale-body-small-font-size);
        letter-spacing: var(--sys-typescale-body-small-letter-spacing);
        line-height: var(--sys-typescale-body-small-line-height);
      }
      :host([selected]) .price {
        color: inherit;
      }

      .price ins {
        color: var(--sys-color-primary);
        text-decoration: none;
        font-weight: var(--ref-font-weight-medium);
        vertical-align: middle;
      }

      .price del {
        display: block;
        text-align: end;
        padding-left: 1em;
      }

      :host([selected]) .price ins {
        color: var(--sys-color-inverse-primary);
      }

      svg {
        display: inline-block;
        width: 1em;
        height: 1em;
        contain: strict;
        vertical-align: middle;
      }
    `,
  ];

  @property({type: Object, attribute: false})
    content?: ProductCartContent;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('stated', '');
    this.setAttribute('elevated', '');
  }

  protected override shouldUpdate(changedProperties: PropertyValues<this>): boolean {
    return super.shouldUpdate(changedProperties) && this.content != null;
  }

  override render(): unknown {
    this._logger.logMethod('render');
    if (this.content == null) return nothing;

    // const icon = this.selected ? 'radio-button-on-outline' : 'radio-button-off-outline';

    return html`
      <img src=${this.content.imagePath} alt=${this.content.title} />
      <div class="content">
        <h2 class="title">${this.content.title}</h2>
        <div class="price">
          <del>${number(this.content.price)}</del>
          <ins>${number(this.content.finalPrice)}</ins>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill-rule="evenodd" stroke="none" fill="currentcolor" d="M3.057 1.742L3.821 1l.78.75-.776.741-.768-.749zm3.23 2.48c0 .622-.16 1.111-.478 1.467-.201.221-.462.39-.783.505a3.251 3.251 0 01-1.083.163h-.555c-.421 0-.801-.074-1.139-.223a2.045 2.045 0 01-.9-.738A2.238 2.238 0 011 4.148c0-.059.001-.117.004-.176.03-.55.204-1.158.525-1.827l1.095.484c-.257.532-.397 1-.419 1.403-.002.04-.004.08-.004.12 0 .252.055.458.166.618a.887.887 0 00.5.354c.085.028.178.048.278.06.079.01.16.014.243.014h.555c.458 0 .769-.081.933-.244.14-.139.21-.383.21-.731V2.02h1.2v2.202zm5.433 3.184l-.72-.7.709-.706.735.707-.724.7zm-2.856.308c.542 0 .973.19 1.293.569.297.346.445.777.445 1.293v.364h.18v-.004h.41c.221 0 .377-.028.467-.084.093-.055.14-.14.14-.258v-.069c.004-.243.017-1.044 0-1.115L13 8.05v1.574a1.4 1.4 0 01-.287.863c-.306.405-.804.607-1.495.607h-.627c-.061.733-.434 1.257-1.117 1.573-.267.122-.58.21-.937.265a5.845 5.845 0 01-.914.067v-1.159c.612 0 1.072-.082 1.38-.247.25-.132.376-.298.376-.499h-.515c-.436 0-.807-.113-1.113-.339-.367-.273-.55-.667-.55-1.18 0-.488.122-.901.367-1.24.296-.415.728-.622 1.296-.622zm.533 2.226v-.364c0-.217-.048-.389-.143-.516a.464.464 0 00-.39-.187.478.478 0 00-.396.187.705.705 0 00-.136.449.65.65 0 00.003.067c.008.125.066.22.177.283.093.054.21.08.352.08h.533zM9.5 6.707l.72.7.724-.7L10.209 6l-.709.707zm-6.694 4.888h.03c.433-.01.745-.106.937-.29.024.012.065.035.12.068l.074.039.081.042c.135.073.261.133.379.18.345.146.67.22.977.22a1.216 1.216 0 00.87-.34c.3-.285.449-.714.449-1.286a2.19 2.19 0 00-.335-1.145c-.299-.457-.732-.685-1.3-.685-.502 0-.916.192-1.242.575-.113.132-.21.284-.294.456-.032.062-.06.125-.084.191a.504.504 0 00-.03.078 1.67 1.67 0 00-.022.06c-.103.309-.171.485-.205.53-.072.09-.214.14-.427.147-.123-.005-.209-.03-.256-.076-.057-.054-.085-.153-.085-.297V7l-1.201-.5v3.562c0 .261.048.496.143.703.071.158.168.296.29.413.123.118.266.211.43.28.198.084.42.13.665.136v.001h.036zm2.752-1.014a.778.778 0 00.044-.353.868.868 0 00-.165-.47c-.1-.134-.217-.201-.35-.201-.18 0-.33.103-.447.31-.042.071-.08.158-.114.262a2.434 2.434 0 00-.04.12l-.015.053-.015.046c.142.118.323.216.544.293.18.062.325.092.433.092.044 0 .086-.05.125-.152z"></path></svg>
        </div>
    </div>
    `;
  }
}
