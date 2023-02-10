import {customElement, AlwatrSmartElement, css, html, unsafeHTML, map, state, nothing} from '@alwatr/element';
import {contextConsumer} from '@alwatr/signal';

import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

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
export class AlwatrPageHome extends AlwatrSmartElement {
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
    if (this.content == null) return nothing;
    return html`
      <alwatr-top-app-bar .content=${this.content.topAppBar}></alwatr-top-app-bar>
      <main>${map(this.content.boxList, this._boxTemplate)}</main>
      <footer>
        <div>A good ceiling is vital.<br />a SOFFIT ceiling can be an inspiration.</div>
        <div class="version">Soffit Order Management v${_ALWATR_VERSION_}</div>
      </footer>
    `;
  }

  protected _boxTemplate(box: BoxType): unknown {
    const slot = box.slot == null ? nothing : unsafeHTML(box.slot);
    return html`<alwatr-icon-box .content=${box} ?wide=${box.wide} ?small=${box.small}>${slot}</alwatr-icon-box>`;
  }
}
