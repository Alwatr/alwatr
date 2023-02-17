import {
  AlwatrBaseElement,
  unsafeSVG,
  customElement,
  property,
  state,
  html,
  css,
  DirectionMixin,
  SignalMixin,
  PropertyDeclaration,
  nothing,
  type HTMLTemplateResult,
  type PropertyValues,
} from '@alwatr/element';
import {globalAlwatr} from '@alwatr/logger';

import {preloadIcon} from './preload.js';

export {preloadIcon};

globalAlwatr.registeredList.push({
  name: '@alwatr/icon',
  version: _ALWATR_VERSION_,
});

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-icon': AlwatrIcon;
  }
}

/**
 * Alwatr icon component
 *
 * @attr {Boolean} flip-rtl
 */
@customElement('alwatr-icon')
export class AlwatrIcon extends DirectionMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: inline-block;
      width: 1em;
      height: 1em;
      contain: size layout paint style;
      box-sizing: content-box;
    }

    :host([flip-rtl][dir='rtl']) svg {
      transform: scaleX(-1);
    }

    svg {
      display: block;
      height: 100%;
      width: 100%;
      stroke: currentcolor;
      fill: currentcolor;
    }
  `;

  protected static _fallback: HTMLTemplateResult = html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <circle cx="256" cy="256" r="48" />
    <circle cx="416" cy="256" r="48" />
    <circle cx="96" cy="256" r="48" />
  </svg>`;

  @property()
    name?: string;

  @state()
  protected _svg?: HTMLTemplateResult | null;

  override render(): unknown {
    this._logger.logMethod('render');
    return this._svg ?? nothing;
  }

  override requestUpdate(propName?: PropertyKey, oldValue?: unknown, options?: PropertyDeclaration): void {
    this._logger?.logMethodArgs('requestUpdate', {name: propName});
    if (propName === 'name') {
      this._fetchIcon();
    }
    super.requestUpdate(propName, oldValue, options);
  }

  protected override shouldUpdate(changedProperties: PropertyValues<this>): boolean {
    return super.shouldUpdate(changedProperties) && this._svg !== undefined;
  }

  protected async _fetchIcon(): Promise<void> {
    this._logger.logMethodArgs('_fetchIcon', {name: this.name});

    if (this.name == null || this.name === '') {
      // if (this._svg != null) this._svg = null;
      return;
    }

    let _timer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
      _timer = null;
      this._svg = (this.constructor as typeof AlwatrIcon)._fallback;
    }, 3_000);

    try {
      const svg = await preloadIcon(this.name);
      if (_timer != null) clearTimeout(_timer);
      this._svg = html`${unsafeSVG(svg)}`;
    }
    catch (err) {
      this._logger.error('_fetchIcon', 'fetch_failed', err);
    }
  }
}
