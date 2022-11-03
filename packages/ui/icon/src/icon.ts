import {AlwatrElement} from '@alwatr/element';
import {fetch} from '@alwatr/fetch';
import {svg, css, nothing} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {property} from 'lit/decorators/property.js';
import {state} from 'lit/decorators/state.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';

import type {TemplateResult, PropertyDeclaration} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-icon': AlwatrIcon;
  }
}

const requests: Record<string, Promise<Response>> = {};

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

    if (name === 'name' && this.name !== undefined && this.urlPrefix !== undefined) {
      this._getIcon(this.name, this.urlPrefix).then((iconSvg) => (this._svgContent = svg`${unsafeSVG(iconSvg)}`));
    }
  }

  protected async _getIcon(name: string, urlPrefix: string): Promise<string> {
    const url = urlPrefix + name + '.svg';
    let request = requests[url];

    if (request == null) {
      request = fetch({url, cacheStorageName: 'alwatr-icon', cacheStrategy: 'cache_first'});
      requests[url] = request;
    }

    return request.then((response) => response.clone().text());
  }
}
