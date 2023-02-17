
import {
  customElement,
  css,
  html,
  unsafeHTML,
  mapIterable,
  state,
  nothing,
  SignalMixin,
  AlwatrBaseElement,
} from '@alwatr/element';
import {message} from '@alwatr/i18n';
import '@alwatr/ui-kit/card/icon-box.js';
import '@alwatr/ui-kit/top-app-bar/top-app-bar.js';

import './app-footer';
import {homePageContentContextConsumer, topAppBarContextProvider} from './context.js';

import type {BoxType, PageHomeContent} from './type.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-home': AlwatrPageHome;
  }
}

/**
 * Alwatr Customer Order Management Home Page
 */
@customElement('alwatr-page-home')
export class AlwatrPageHome extends SignalMixin(AlwatrBaseElement) {
  static override styles = css`
    :host {
      box-sizing: border-box;
      min-height: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: calc(2 * var(--sys-spacing-track));
      gap: var(--sys-spacing-track);
    }

    :host > * {
      width: 40%;
      flex-grow: 1;
    }

    :host > [wide] {
      width: 100%;
    }
  `;

  @state()
    content?: PageHomeContent;

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
    if (this.content == null) return nothing;
    return mapIterable(this, this.content.boxList, this._boxTemplate, message('loading'));
  }

  protected _boxTemplate(box: BoxType): unknown {
    const slot = box.slot == null ? nothing : unsafeHTML(box.slot);
    return html`<alwatr-icon-box .content=${box} ?wide=${box.wide} ?small=${box.small}>${slot}</alwatr-icon-box>`;
  }
}
