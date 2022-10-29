import {AlwatrElement} from '@alwatr/element';
import {html, css} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {property} from 'lit/decorators/property.js';

import type {TemplateResult} from 'lit';

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
      svg {
        display: block;

        height: 100%;
        width: 100%;
      }
    `,
  ];

  @property({reflect: true}) name?: string;
  @property({reflect: true}) preurl = 'https://cdn.jsdelivr.net/gh/ionic-team/ionicons@6.0.3/src/svg/';

  override render(): TemplateResult {
    return html`
      <svg width="512" height="512" viewBox="0 0 512 512">
        <path
          d="M80,212V448a16,16,0,0,0,16,16h96V328a24,24,0,0,1,24-24h80a24,24,0,0,1,24,24V464h96a16,16,0,0,0,16-16V212"
          style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
        />
        <path
          d="M480,256,266.89,52c-5-5.28-16.69-5.34-21.78,0L32,256"
          style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
        />
        <polyline
          points="400 179 400 64 352 64 352 133"
          style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"
        />
      </svg>
    `;
  }
}
