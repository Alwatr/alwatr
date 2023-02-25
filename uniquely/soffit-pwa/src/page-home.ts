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

import {homePageContentContextConsumer, topAppBarContextProvider} from './context.js';
import './lottery-box.js';
import './supply-chain-box.js';

import type {BoxType, PageHomeContent} from './type.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-home': AlwatrPageHome;
  }
}

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-home')
export class AlwatrPageHome extends SignalMixin(AlwatrBaseElement) {
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

    .logo,
    alwatr-icon-box[wide],
    alwatr-lottery-box,
    alwatr-supply-chain-box {
      width: 100%;
    }

    alwatr-icon-box[small] {
      width: 26%;
    }

    alwatr-supply-chain-form,
    alwatr-lottery-form {
      padding: 0 var(--sys-spacing-track);
    }
  `;

  @state() content?: PageHomeContent;

  override connectedCallback(): void {
    super.connectedCallback();

    this._signalListenerList.push(
        homePageContentContextConsumer.subscribe((content) => {
          this.content = content;
          topAppBarContextProvider.setValue(content.topAppBar);
        }),
    );
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return this._menuTemplate();
  }

  protected* _menuTemplate(): unknown {
    yield html`<img class="logo" src="image/soffit.svg" alt="Soffit Company Logo" />`;
    if (this.content == null) return nothing;
    yield this._boxTemplate(this.content.about);
    yield mapIterable(this, this.content.productList, this._boxTemplate, message('loading'));
    yield this._boxTemplate(this.content.catalogue);
    yield html`<alwatr-lottery-box></alwatr-lottery-box>`;
    yield mapIterable(this, this.content.socialList, this._boxTemplate, message('loading'));
    yield html`<alwatr-supply-chain-box></alwatr-supply-chain-box>`;
    yield mapIterable(this, this.content.agencyList, this._boxTemplate, message('loading'));
  }

  protected _boxTemplate(box: BoxType): unknown {
    const slot = box.slot == null ? nothing : unsafeHTML(box.slot);
    return html`<alwatr-icon-box .content=${box} ?wide=${box.wide} ?small=${box.small}>${slot}</alwatr-icon-box>`;
  }
}
