import {AlwatrDirective, directive, html, type PartInfo} from '@alwatr/fract';

export class AlwatrDrawerDirective extends AlwatrDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-drawer>');
  }

  render(renderContent: () => unknown): unknown {
    this._logger.logMethod?.('render');

    return html`
      <aside aria-label="Sidenav"
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
        ${renderContent()}
      </aside>
    `;
  }
}

export const alwatrDrawer = directive(AlwatrDrawerDirective);
