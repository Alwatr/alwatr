import {
  customElement,
  css,
  html,
  LocalizeMixin,
  SignalMixin,
  AlwatrBaseElement,
  UnresolvedMixin,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/card/icon-box.js';

import {topAppBarContextProvider} from '../../manager/context.js';

import type {IconBoxContent} from '@alwatr/ui-kit/card/icon-box.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-403': AlwatrPage403;
  }
}

/**
 * Alwatr 403 page.
 */
@customElement('alwatr-page-403')
export class AlwatrPage403 extends UnresolvedMixin(LocalizeMixin(SignalMixin(AlwatrBaseElement))) {
  static override styles = css`
    :host {
      display: block;
      padding: calc(2 * var(--sys-spacing-track));
      box-sizing: border-box;
      min-height: 100%;
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();
    topAppBarContextProvider.setValue({
      type: 'small',
      headline: message('403_unauthorized'),
      startIcon: {icon: 'arrow-back-outline', flipRtl: true, clickSignalId: 'back_to_home_click_event'},
      tinted: 2,
    });
  }

  override render(): unknown {
    this._logger.logMethod?.('render');

    const box: IconBoxContent = {
      stated: true,
      elevated: 1,
      icon: 'close-circle-outline',
      flipRtl: true,
      headline: message('403_unauthorized'),
      description: message('403_unauthorized_description'),
      preLine: true,
    };

    return html`<alwatr-icon-box .content=${box}></alwatr-icon-box>`;
  }
}
