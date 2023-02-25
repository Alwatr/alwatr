import {
  customElement,
  css,
  html,
  state,
  nothing,
  unsafeHTML,
  SignalMixin,
  AlwatrBaseElement,
  mapIterable,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/button/icon-button.js';
import '@alwatr/ui-kit/card/image-box.js';

import {productPageContentContextConsumer, topAppBarContextProvider} from './context.js';

import type {ProductType, ProductPageContent} from './type.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-product': AlwatrPageHome;
  }
}

/**
 * Soffit Product Page
 */
@customElement('alwatr-page-product')
export class AlwatrPageHome extends SignalMixin(AlwatrBaseElement) {
  static override styles = css`
    :host {
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      padding: var(--sys-spacing-track) calc(2 * var(--sys-spacing-track));
      gap: var(--sys-spacing-track);
      overflow-y: scroll;
    }

    alwatr-image-box {
      width: 40%;
      flex-grow: 1;
    }
  `;

  @state() content?: ProductPageContent;

  override connectedCallback(): void {
    super.connectedCallback();

    this._signalListenerList.push(
        productPageContentContextConsumer.subscribe((content) => {
          this.content = content;
          topAppBarContextProvider.setValue(content.topAppBar);
        }),
    );
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return mapIterable(this, this.content?.product, this._productBoxTemplate, message('loading'));
  }

  protected _productBoxTemplate(box: ProductType): unknown {
    const slot = box.slot == null ? nothing : unsafeHTML(box.slot);
    return html`<alwatr-image-box .content=${box} ?wide=${box.wide}>${slot}</alwatr-image-box>`;
  }
}
