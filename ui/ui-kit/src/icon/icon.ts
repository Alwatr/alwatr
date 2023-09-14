import {AlwatrDynamicDirective, directive, html, unsafeSVG, type PartInfo} from '@alwatr/fract';

import './icon.scss';

import type {MaybePromise} from '@alwatr/type';

export class AlwatrIconDirective extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-icon>');
  }

  render(svg: MaybePromise<string>, flipIconInRtl = false): unknown {
    if (svg instanceof Promise) {
      svg.then((_svg) => {
        this.setValue(this._render_icon(_svg));
      });
      return this._render_icon();
    }
    else {
      return this._render_icon(svg, flipIconInRtl ? 'flip-icon-in-rtl' : '');
    }
  }

  _render_icon(svg?: string, customClass = ''): unknown {
    return html`<div class="alwatr-icon ${customClass}">${svg ? unsafeSVG(svg) : ''}</div>`;
  }
}

export const alwatrIcon = directive(AlwatrIconDirective);
