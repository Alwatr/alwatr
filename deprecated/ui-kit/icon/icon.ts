import {AlwatrDynamicDirective, directive, html, unsafeSVG, nothing, type PartInfo} from '@alwatr/fract';

import type {MaybePromise} from '@alwatr/type';

export type SvgContent = MaybePromise<string>;

export interface IconContent {
  svg: SvgContent;
  flipIconInRtl?: boolean;
}

export class IconDirective extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-icon>');
  }

  render(content: IconContent): unknown {
    this._logger.logMethodArgs?.('render', content);

    if (content.svg instanceof Promise) {
      content.svg.then((_svg) => {
        this.setValue(this._renderSvg(_svg));
      });
      return this._renderSvg();
    }
    else {
      return this._renderSvg(content.svg, content.flipIconInRtl ? 'rtl:-scale-x-100' : '');
    }
  }

  protected _renderSvg(svg?: string, customClass = ''): unknown {
    return html`<div
      class="${customClass} box-content h-[1em] w-[1em] align-middle [contain:size_layout_paint_style] [&>svg]:block [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-current [&>svg]:stroke-current"
    >
      ${svg ? unsafeSVG(svg) : nothing}
    </div>`;
  }
}

export const icon = directive(IconDirective);
