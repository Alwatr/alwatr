import {customElement, css, html, state, AlwatrBaseElement, PropertyValues} from '@alwatr/element';
import '@alwatr/ui-kit/card/icon-box.js';

import {tourServerContext} from '../../manager/tour-storage.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-page-home': AlwatrPageHome;
  }
}

/**
 * Alwatr home page
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

  @state()
    gotState = tourServerContext.state;

  override connectedCallback(): void {
    super.connectedCallback();

    tourServerContext.subscribe(() => {
      this.gotState = tourServerContext.state;
    });
  }

  protected override update(changedProperties: PropertyValues<this>): void {
    super.update(changedProperties);
    if (changedProperties.has('gotState')) {
      this.setAttribute('state', this.gotState);
    }
  }

  override render(): unknown {
    this._logger.logMethod?.('render');

    const methodName = `_render_${this.gotState}`;
    if (typeof this[methodName as keyof this] !== 'function') {
      return this._render_loading(); // FIXME:
    }

    return (this[methodName as keyof this] as () => unknown)();
  }

  protected _render_loading(): unknown {
    this._logger.logMethod?.('_render_loading');
    return html`Loading tour list...`;
  }

  protected _render_failed(): unknown {
    this._logger.logMethod?.('_render_failed');
    return html`Getting the list of tours is failed`;
  }

  protected async _render_complete(): Promise<unknown> {
    const tourStorage = await tourServerContext.response?.json();
    this._logger.logMethodArgs?.('_render_complete', {tourStorage});
    return html`The list of tours is ready`;
  }
}
