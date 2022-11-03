import {AlwatrElement} from '@alwatr/element';
import {fetch} from '@alwatr/fetch';
import {svg, css, nothing} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {property} from 'lit/decorators/property.js';
import {state} from 'lit/decorators/state.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';

import type {TemplateResult, PropertyDeclaration, PropertyValues} from 'lit';

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
export class AlwatrIcon extends AlwatrElement {
  static override styles = [
    css`
      :host {
        display: inline-block;
        width: 1em;
        height: 1em;
        contain: strict;
        fill: currentColor;
        box-sizing: content-box !important;
      }

      :host([flip-rtl][dir='rtl']) svg {
        transform: scaleX(-1);
      }

      svg {
        display: block;
        height: 100%;
        width: 100%;
      }
    `,
  ];

  @property() name?: string;
  @property({attribute: 'url-prefix'}) urlPrefix = 'https://cdn.jsdelivr.net/npm/ionicons@5/dist/svg/';

  @state() protected _svgContent: TemplateResult | typeof nothing = nothing;

  override render(): TemplateResult | typeof nothing {
    return this._svgContent;
  }
  override requestUpdate(
      name?: PropertyKey,
      oldValue?: unknown,
      options?: PropertyDeclaration<unknown, unknown>,
  ): void {
    super.requestUpdate(name, oldValue, options);

    if (name === 'name' && this.name && this.urlPrefix) {
      this._loadIcon(this.name, this.urlPrefix);
    }
  }
  override shouldUpdate(changedProperties: PropertyValues): boolean {
    return changedProperties.has('_svgContent');
  }

  protected async _loadIcon(name: string, urlPrefix: string): Promise<void> {
    try {
      const response = await fetch({
        url: urlPrefix + name + '.svg',
        cacheStorageName: 'alwatr-icon',
        cacheStrategy: 'cache_first',
      });
      const iconSvg = await response.text();

      this._logger.logMethodArgs('_loadIcon', {name, urlPrefix});
      this._svgContent = svg`${unsafeSVG(iconSvg)}`;
    }
    catch (error) {
      this._logger.error('load_icon', 'get_icon_failed', error, {name, urlPrefix});
    }
  }
}
