import {AsyncDirective, css, directive, html, unsafeSVG} from '@alwatr/element';

import type {MaybePromise} from '@alwatr/type';

export const alwatrIconStyle = css`
  .alwatr-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    contain: size layout paint style;
    box-sizing: content-box;
    vertical-align: middle;
  }

  .alwatr-icon svg {
    display: block;
    height: 100%;
    width: 100%;
    stroke: currentcolor;
    fill: currentcolor;
  }

  [dir='rtl'] .alwatr-icon svg {
    transform: scaleX(-1);
  }
`;

class AlwatrIcon extends AsyncDirective {
  render(svg: MaybePromise<string>): unknown {
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
