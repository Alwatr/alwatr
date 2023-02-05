import {customElement, AlwatrSmartElement, css, html, map, ifDefined, state} from '@alwatr/element';
import {localeContextConsumer, message, setLocale} from '@alwatr/i18n';
import {contextConsumer} from '@alwatr/signal';

import '@alwatr/ui-kit/card/icon-box.js';
import './lottery-box.js';
import './supply-chain-box.js';


import type {PageHomeContent} from './type.js';
import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';


interface BoxType extends IconBoxContent {
  content?: unknown;
  wide?: boolean;
  small?: boolean;
}

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

    header {
      padding: calc(2 * var(--sys-spacing-track));
    }

    header img {
      display: block;
      width: 100%;
    }

    main {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      gap: calc(2 * var(--sys-spacing-track));
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
      padding: calc(2 * var(--sys-spacing-track));
      background-color: var(--sys-color-secondary-container);
      position: relative;
    }

    .version {
      position: absolute;
      right: var(--sys-spacing-track);
      bottom: 0;
      font-size: var(--sys-typescale-label-small-font-size);
      line-height: var(--sys-typescale-label-small-line-height);
      letter-spacing: var(--sys-typescale-label-small-letter-spacing);
      opacity: var(--sys-surface-disabled-opacity);
      user-select: none;
      -webkit-user-select: none;
    }
  `;

  @state() content?: PageHomeContent;

  override connectedCallback(): void {
    super.connectedCallback();

    this._signalListenerList.push(contextConsumer.subscribe('home-page-content', this._contentChange.bind(this)));
  }

  protected _contentChange(content: unknown): void {
    this._logger.logMethodArgs('contentChange', {content});
    this.content = content as PageHomeContent;
  }

  protected _changeLocale(): void {
    this._logger.logMethod('changeLocale');
    localeContextConsumer.getValue()?.language === 'en' ? setLocale({
      code: 'fa-IR',
      language: 'fa',
      direction: 'rtl',
    }) : setLocale({
      code: 'en-US',
      language: 'en',
      direction: 'ltr',
    });
  }

  override render(): unknown {
    super.render();
    return html`
      <header><img @click=${this._changeLocale.bind(this)} src="image/soffit.svg" alt="SOFFIT Logo" /></header>
      <main>${this._menuTemplate()}</main>
      <footer>
        <span>${message('slogan')}</span>
        <span class="version">v${_ALWATR_VERSION_}</span>
      </footer>
    `;
  }

  protected* _menuTemplate(): unknown {
    if (this.content == null) return;
    yield this._boxTemplate(this.content.about);
    yield map(this.content.productList, this._boxTemplate);
    yield html`<alwatr-lottery-box></alwatr-lottery-box>`;
    yield map(this.content.socialList, this._boxTemplate);
    yield html`<alwatr-supply-chain-box></alwatr-supply-chain-box>`;
    yield map(this.content.agencyList, this._boxTemplate);
  }

  protected _boxTemplate(box: BoxType): unknown {
    return html`
      <alwatr-icon-box .content=${box} ?wide=${box.wide} ?small=${box.small}>${ifDefined(box.content)}</alwatr-icon-box>
    `;
  }
}
