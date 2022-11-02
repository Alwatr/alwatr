import {AlwatrElement} from '@alwatr/element';
import {fetch} from '@alwatr/fetch';
import {svg, css, PropertyDeclaration, nothing} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {property} from 'lit/decorators/property.js';
import {state} from 'lit/decorators/state.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';

import type {TemplateResult} from 'lit';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-icon': AlwatrIcon;
  }
}

const requests: Record<string, Promise<Response>> = {};

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
      :host(.rtl) {
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
  @property({attribute: 'flip-rtl', type: Boolean}) flipRtl = false;

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

    if ((name === 'name' || name === 'urlPrefix') && this.name !== undefined && this.urlPrefix !== undefined) {
      this._getIcon(this.name, this.urlPrefix).then((iconSvg) => (this._svgContent = svg`${unsafeSVG(iconSvg)}`));
    }
    else if (name === 'flipRtl') {
      this.classList[this.flipRtl ? 'add' : 'remove']('rtl');
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
