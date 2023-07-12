import {AlwatrDirective, directive, html, Part, type PartInfo} from '@alwatr/fract';

import './menu.scss';

export class AlwatrDrawerDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-drawer>');
  }

  render(slot: Part): unknown {
    this._logger.logMethod?.('render');

    return html`
      <div class="alwatr-drawer">
        ${slot}
      </div>
    `;
  }
}

export const alwatrDrawer = directive(AlwatrDrawerDirective);
