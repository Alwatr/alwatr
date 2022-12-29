import {AlwatrDummyElement, unsafeSVG, customElement, property, state, html, css, LocalizeMixin} from '@alwatr/element';
import {fetch} from '@alwatr/fetch';

import type {PropertyValues, HTMLTemplateResult} from '@alwatr/element';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-icon': AlwatrIcon;
  }
}

/**
 * Alwatr icon component
 *
 * @attr {boolean} flip-rtl
 */
@customElement('alwatr-icon')
export class AlwatrIcon extends LocalizeMixin(AlwatrDummyElement) {
  static override styles = css`
    :host {
      display: inline-block;
      width: 1em;
      height: 1em;
      contain: strict;
      fill: currentcolor;
      box-sizing: content-box !important;
    }

    :host([flip-rtl][dir='rtl']) svg {
      transform: scaleX(-1);
    }

    svg {
      display: block;
      height: 100%;
      width: 100%;
      stroke: currentcolor;
    }
  `;

  protected static _fallback: HTMLTemplateResult = html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <title>Square</title>
    <path
      d="M416 448H96a32.09 32.09 0 01-32-32V96a32.09 32.09 0
    0132-32h320a32.09 32.09 0 0132 32v320a32.09 32.09 0 01-32 32z"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
    />
  </svg>`;

  @property()
    name?: string;

  @property({attribute: 'url-prefix'})
    urlPrefix?: string;

  @property({attribute: 'flip-rtl', reflect: true, state: false})
    flipRtl = false;

  @state()
  protected _icon?: HTMLTemplateResult;

  override render(): unknown {
    this._logger.logMethod('render');
    return this._icon;
  }

  override shouldUpdate(changedProperties: PropertyValues): boolean {
    if (changedProperties.has('name') || changedProperties.has('urlPrefix')) {
      this._fetchIcon();
    }
    return changedProperties.has('_icon') && this._icon != null;
  }

  protected async _fetchIcon(): Promise<void> {
    this._logger.logMethodArgs('_fetchIcon', {name: this.name, urlPrefix: this.urlPrefix});

    if (!(this.name != null && this.name.length > 0)) return;

    try {
      this._icon = html`${unsafeSVG(await preloadIcon(this.name, this.urlPrefix))}`;
    }
    catch (err) {
      this._logger.error('_fetchIcon', 'fetch_failed', err);
      this._icon = AlwatrIcon._fallback;
    }
  }
}

export async function preloadIcon(
    name: string,
    urlPrefix = 'https://cdn.jsdelivr.net/npm/@alwatr/icon@0/svg/',
): Promise<string> {
  const url = urlPrefix + name + '.svg';
  const response = await fetch({
    url,
    timeout: 6000,
    retry: 5,
    removeDuplicate: 'auto',
    cacheStrategy: 'cache_first',
    cache: 'force-cache',
  });

  if (response.ok !== true) {
    throw new Error('fetch_failed');
  }

  return await response.text();
}
