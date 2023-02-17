import {customElement, css, html, LocalizeMixin, SignalMixin, AlwatrBaseElement} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

import './app-footer';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';
import type {TopAppBarContent} from '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-404': AlwatrPage404;
  }
}

/**
 * Alwatr Demo Home Page
 */
@customElement('alwatr-page-404')
export class AlwatrPage404 extends LocalizeMixin(SignalMixin(AlwatrBaseElement)) {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .logo {
      display: block;
      width: 100%;
    }

    main {
      display: block;
      padding: calc(2 * var(--sys-spacing-track));
      flex-grow: 1;
      overflow-y: auto;
    }
  `;

  override render(): unknown {
    this._logger.logMethod('render');

    const topAppBar: TopAppBarContent = {
      type: 'small',
      headline: message('not_found'),
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back-click-event'},
    };

    const box: IconBoxContent = {
      stated: true,
      elevated: 1,
      icon: 'construct-outline',
      flipRtl: true,
      headline: message('under_develope'),
      description: message('under_develope_description'),
      preLine: true,
    };

    return html`
      <alwatr-top-app-bar .content=${topAppBar}></alwatr-top-app-bar>
      <main><alwatr-icon-box .content=${box}></alwatr-icon-box></main>
      <alwatr-app-footer></alwatr-app-footer>
    `;
  }
}
