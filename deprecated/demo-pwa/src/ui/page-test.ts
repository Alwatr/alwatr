import {AlwatrDynamicDirective, directive, html, type PartInfo} from '@alwatr/fract';

export class AlwatrPageTestDirective extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-page-test>');
  }

  render(name: string): unknown {
    this._logger.logMethodArgs?.('render', name);
    return html`<h1>Page ${name}</h1>`;
  }
}

export const alwatrPageTest = directive(AlwatrPageTestDirective);
