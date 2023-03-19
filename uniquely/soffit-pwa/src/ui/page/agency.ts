import {
  customElement,
  css,
  html,
  unsafeHTML,
  state,
  nothing,
  SignalMixin,
  AlwatrBaseElement,
  mapIterable,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/card/icon-box.js';

import {agencyPageContentContextConsumer, topAppBarContextProvider} from '../../manager/context.js';

import type {BoxType, PageAgencyContent} from '../../type.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-agency': AlwatrPageAgency;
  }
}

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-agency')
export class AlwatrPageAgency extends SignalMixin(AlwatrBaseElement) {
  static override styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      gap: var(--sys-spacing-track);
      overflow-y: auto;
    }

    alwatr-icon-box {
      width: 40%;
      flex-grow: 1;
    }

    alwatr-icon-box[wide] {
      width: 100%;
    }
  `;

  @state() content?: PageAgencyContent;

  override connectedCallback(): void {
    super.connectedCallback();


    this._addSignalListener(
        agencyPageContentContextConsumer.subscribe((content) => {
          this.content = content;
          topAppBarContextProvider.setValue(content.topAppBar);
        }),
    );
  }

  override render(): unknown {
    this._logger.logMethod('render');
    if (this.content == null) return;

    return [
      mapIterable(this, this.content.agencyList, this._boxTemplate, message('loading')),
    ];
  }

  protected _boxTemplate(box: BoxType): unknown {
    const slot = box.slot == null ? nothing : unsafeHTML(box.slot);
    return html`<alwatr-icon-box .content=${box} ?wide=${box.wide}>${slot}</alwatr-icon-box>`;
  }
}
