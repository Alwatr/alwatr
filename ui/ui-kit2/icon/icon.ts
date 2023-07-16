import {AlwatrDynamicDirective, directive, html, unsafeSVG, nothing, type PartInfo} from '@alwatr/fract';

import './icon.css';

import type {MaybePromise} from '@alwatr/type';

export interface AlwatrIconOptions {
  svg: MaybePromise<string>;
  flipIconInRtl?: boolean;
}

export class AlwatrIconDirective extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-icon>');
  }

  render(options: AlwatrIconOptions): unknown {
    if (options.svg instanceof Promise) {
      options.svg.then((_svg) => {
        this.setValue(this._render_icon(_svg));
      });
      return this._render_icon();
    }
    else {
      return this._render_icon(options.svg, options.flipIconInRtl ? 'rtl:-scale-x-100' : '');
    }
  }

  _render_icon(svg?: string, customClass = ''): unknown {
    return html`<div
      class="alwatr-icon w-[1em] h-[1em] box-content align-middle [contain:size_layout_paint_style] ${customClass}">
      ${svg ? unsafeSVG(svg) : nothing}
    </div>`;
  }
}

export const alwatrIcon = directive(AlwatrIconDirective);
