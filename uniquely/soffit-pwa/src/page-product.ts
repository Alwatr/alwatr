import {customElement, AlwatrSmartElement, css, html, state, map, nothing, unsafeHTML} from '@alwatr/element';
import {contextConsumer} from '@alwatr/signal';
import '@alwatr/ui-kit/button/icon-button.js';
import '@alwatr/ui-kit/card/image-box.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

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
export class AlwatrPageHome extends AlwatrSmartElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
    }

    main {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      gap: var(--sys-spacing-track);
    }

    alwatr-image-box {
      width: 40%;
      flex-grow: 1;
    }

    alwatr-image-box[wide] {
      width: 100%;
    }
  `;

  @state() content?: ProductPageContent;

  override connectedCallback(): void {
    super.connectedCallback();

    this._signalListenerList.push(
        contextConsumer.subscribe<ProductPageContent>('product_page_content', (content) => {
          this.content = content;
        }),
    );
  }

  override render(): unknown {
    this._logger.logMethod('render');
    return html`
      <alwatr-top-app-bar .content=${this.content?.topAppBar}></alwatr-top-app-bar>
      <main>${this._menuTemplate()}</main>
    `;
  }

  protected* _menuTemplate(): unknown {
    this._logger.logMethodArgs('_menuTemplate', {...this.content});
    yield map(this.content?.product, this._productBoxTemplate);
  }

  protected _productBoxTemplate(box: ProductType): unknown {
    const slot = box.slot == null ? nothing : unsafeHTML(box.slot);
    return html`<alwatr-image-box .content=${box} ?wide=${box.wide}>${slot}</alwatr-image-box>`;
  }
}
