import {
  AlwatrBaseElement,
  unsafeSVG,
  customElement,
  property,
  html,
  css,
  DirectionMixin,
  SignalMixin,
  nothing,
  type HTMLTemplateResult,
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
      vertical-align: middle;
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

  @property({attribute: false})
    svg: HTMLTemplateResult | null = null;

  private _name = '';
  set name(val: string) {
    this._name = val;
    if (val) this._fetchIcon(val);
  }

  @property()
  get name(): string {
    return this._name;
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    return this.svg ?? nothing;
  }

  protected async _fetchIcon(name: string): Promise<void> {
    this._logger.logMethodArgs?.('_fetchIcon', {name});
    if (!name) return;

    this.svg = null;

    let _timer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
      if (name !== this._name) return;
      _timer = null;
      this.svg = (this.constructor as typeof AlwatrIcon)._fallback;
    }, 3_000);

    try {
      const svg = await preloadIcon(this.name);
      if (name !== this._name) return;
      if (_timer != null) clearTimeout(_timer);
      this.svg = html`${unsafeSVG(svg)}`;
    }
    catch (err) {
      this._logger.error('_fetchIcon', 'fetch_failed', err);
    }
  }
}
