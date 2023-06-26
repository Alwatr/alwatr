import {AlwatrDynamicDirective, directive, html, unsafeSVG, type PartInfo} from '@alwatr/fract';

import './icon.scss';

import type {MaybePromise} from '@alwatr/type';

class AlwatrIcon extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-icon>');
  }

  override render(svg: MaybePromise<string>): unknown {
    if (svg instanceof Promise) {
      svg.then((_svg) => {
        this.setValue(this._render_icon(_svg));
      });
      return this._render_icon();
    }
    else {
      return this._render_icon(svg);
    }
  }

  _render_icon(svg?: string): unknown {
    return html`<div class="alwatr-icon">${svg ? unsafeSVG(svg) : ''}</div>`;
  }
}

export const alwatrIconDirective = directive(AlwatrIcon);
