import {
  customElement,
  css,
  html,
  AlwatrBaseElement,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/card/icon-box.js';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-404': AlwatrPage404;
  }
}

/**
 * Alwatr 404 Page
 */
@customElement('alwatr-page-404')
export class AlwatrPage404 extends AlwatrBaseElement {
  static override styles = css`
    :host {
      display: block;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }
  `;

  override render(): unknown {
    this._logger.logMethod?.('render');

    const box: IconBoxContent = {
      stated: true,
      elevated: 1,
      icon: 'construct-outline',
      flipRtl: true,
      headline: message('page_404_not_found'),
      description: message('page_404_not_found_description'),
      preLine: true,
    };

    return html`<alwatr-icon-box .content=${box}></alwatr-icon-box>`;
  }
}
