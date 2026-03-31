import {AlwatrDynamicDirective, classMap, directive, html, type PartInfo} from '@alwatr/fract';

export interface ButtonOptions {
  /**
   * Label.
   */
  label: string;

  disabled?: boolean;

  extendClass?: string;
}

export class AlwatrButtonDirective extends AlwatrDynamicDirective {
  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-button>');
  }

  render(options: ButtonOptions): unknown {
    this._logger.logMethodArgs?.('render', options);
    return html`<button
      class="${classMap({
        'opacity-25 pointer-events-none': options.disabled === true,
      })} inline-flex select-none items-center justify-center rounded-lg bg-primary bg-opacity-90 px-5
        py-3 text-center text-base font-medium text-onPrimary hover:bg-opacity-100
        active:bg-opacity-95"
    >
      ${options.label}
    </button>`;
  }
}

export const alwatrButton = directive(AlwatrButtonDirective);
