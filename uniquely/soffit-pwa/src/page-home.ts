import {
  customElement,
  css,
  html,
  unsafeHTML,
  map,
  state,
  nothing,
  SignalMixin,
  AlwatrBaseElement,
} from '@alwatr/element';
import {contextConsumer} from '@alwatr/signal';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

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
      display: block;
      height: 100%;
      overflow-y: auto;
    }

    .logo {
      display: block;
      width: 100%;
    }

    main {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      gap: var(--sys-spacing-track);
    }

    alwatr-icon-box {
      width: 40%;
      flex-grow: 1;
    }

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

    footer {
      direction: ltr;
      text-align: center;
      color: var(--sys-color-on-secondary-container);
      padding: calc(2 * var(--sys-spacing-track)) var(--sys-spacing-track) var(--sys-spacing-track);
      background-color: var(--sys-color-secondary-container);
    }

    .version {
      font-size: var(--sys-typescale-label-small-font-size);
      line-height: var(--sys-typescale-label-small-line-height);
      letter-spacing: var(--sys-typescale-label-small-letter-spacing);
      opacity: 0.4;
      user-select: none;
      -webkit-user-select: none;
    }
  `;

  @state() content?: PageHomeContent;

  override connectedCallback(): void {
    super.connectedCallback();

    this._signalListenerList.push(
        contextConsumer.subscribe<PageHomeContent>('home_page_content', (content) => {
          this.content = content;
        }),
    );
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      <alwatr-top-app-bar .content=${this.content?.topAppBar}></alwatr-top-app-bar>
      <main>
        <img class="logo" src="image/soffit.svg" alt="SOFFIT Logo" />
        ${this._menuTemplate()}
      </main>
      <footer>
        <div>A good ceiling is vital.<br />a SOFFIT ceiling can be an inspiration.</div>
        <div class="version">Soffit PWA v${_ALWATR_VERSION_}</div>
      </footer>
    `;
  }

  protected* _menuTemplate(): unknown {
    if (this.content == null) return nothing;
    yield this._boxTemplate(this.content.about);
    yield map(this.content.productList, this._boxTemplate);
    yield this._boxTemplate(this.content.catalogue);
    yield html`<alwatr-lottery-box></alwatr-lottery-box>`;
    yield map(this.content.socialList, this._boxTemplate);
    yield html`<alwatr-supply-chain-box></alwatr-supply-chain-box>`;
    yield map(this.content.agencyList, this._boxTemplate);
  }

  protected _boxTemplate(box: BoxType): unknown {
    const slot = box.slot == null ? nothing : unsafeHTML(box.slot);
    return html`<alwatr-icon-box .content=${box} ?wide=${box.wide} ?small=${box.small}>${slot}</alwatr-icon-box>`;
  }
}
