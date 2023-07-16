import {AlwatrDynamicDirective, classMap, directive, html, type PartInfo} from '@alwatr/fract';

export type ButtonOptions = {
   /**
   * Label.
   */
   label: string,

   disabled?: boolean;

   extendClass?: string
}

export class AlwatrButtonDirective extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-button>');
  }

  render(options: ButtonOptions): unknown {
    this._logger.logMethodArgs?.('render', options);
    return html`<button
      class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-onPrimary
        rounded-lg bg-primary bg-opacity-90 hover:bg-opacity-100 active:bg-opacity-95 select-none
        ${classMap({'opacity-25 pointer-events-none': options.disabled === true})}"
    >${options.label}</button>`;
  }
}

export const alwatrButton = directive(AlwatrButtonDirective);
