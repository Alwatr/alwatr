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
  UnresolvedMixin,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/card/icon-box.js';

import {homePageContentContextConsumer, topAppBarContextProvider} from '../../manager/context.js';
import '../stuff/collaboration-box.js';

import type {BoxType, PageHomeContent} from '../../type.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-home': AlwatrPageHome;
  }
}

/**
 * Alwatr Keep Home Page
 */
@customElement('alwatr-page-home')
export class AlwatrPageHome extends UnresolvedMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      justify-content: center;
      gap: var(--sys-spacing-track);
      overflow-y: auto;
    }

    alwatr-icon-box {
      width: 40%;
      flex-grow: 1;
    }

    .logo {
      width: 90%;
      margin-bottom: var(--sys-spacing-track);
    }

    alwatr-icon-box[wide],
    alwatr-collaboration-box {
      width: 100%;
    }
  `;

  @state() content?: PageHomeContent;

  override connectedCallback(): void {
    super.connectedCallback();

    this._addSignalListeners(
        homePageContentContextConsumer.subscribe((content) => {
          this.content = content;
          topAppBarContextProvider.setValue(content.topAppBar);
        }),
    );
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    return this._menuTemplate();
  }

  protected* _menuTemplate(): unknown {
    yield html`<img class="logo" src="image/keep.svg" alt="Keep Collection Logo" />`;
    yield this._boxTemplate(this?.content?.about);
    yield this._boxTemplate(this?.content?.product);
    yield html`<alwatr-collaboration-box></alwatr-collaboration-box>`;
    yield this._boxTemplate(this?.content?.catalogue);
    yield mapIterable(this, this?.content?.socialList, this._boxTemplate, message('loading'));
  }

  protected _boxTemplate(box?: BoxType): unknown {
    const slot = box?.slot == null ? nothing : unsafeHTML(box.slot);
    return html`<alwatr-icon-box .content=${box} ?wide=${box?.wide}>${slot}</alwatr-icon-box>`;
  }
}
