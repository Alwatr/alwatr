import {
  customElement,
  css,
  html,
  state,
  AlwatrBaseElement,
} from '@alwatr/element';
import '@alwatr/ui-kit/card/icon-box.js';

import type {PageHomeContent} from '../../type.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-home': AlwatrPageHome;
  }
}

/**
 * Alwatr Keep Home Page
 */
@customElement('alwatr-page-home')
export class AlwatrPageHome extends AlwatrBaseElement {
  static override styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      justify-content: center;
      gap: var(--sys-spacing-track);
      overflow-y: auto;
    }
  `;

  @state() content?: PageHomeContent;

  override connectedCallback(): void {
    super.connectedCallback();

    // this._addSignalListeners(
    //     homePageContentContextConsumer.subscribe((content) => {
    //       this.content = content;
    //       topAppBarContextProvider.setValue(content.topAppBar);
    //     }),
    // );
  }

  override render(): unknown {
    this._logger.logMethod?.('render');
    return html`Home Page...`;
  }
}
