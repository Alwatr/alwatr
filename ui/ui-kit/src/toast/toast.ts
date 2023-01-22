import {css, customElement, html, property, type PropertyValues} from '@alwatr/element';

import '@alwatr/icon';

import {AlwatrSurface} from '../card/surface.js';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-toast': AlwatrToast;
  }
}

export type ToastType = 'info' | 'error';
export interface AlwatrToastPropsInterface {
  message: string;
  timer: number;
  type: ToastType;
  open: boolean;
  icon?: string;
  actionLabel?: string;
}

/**
 * Alwatr toast.
 *
 *
 */
@customElement('alwatr-toast')
export class AlwatrToast extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {}
    `,
  ];

  @property({type: Object})
    props: AlwatrToastPropsInterface = {
      message: 'Toast',
      open: false,
      timer: -1,
      type: 'info',
    };

  private toastTimeout = 0;


  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('animationend', this.toastAnimationEndHandler);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('animationend', this.toastAnimationEndHandler);
  }

  override render(): unknown {
    this._logger.logMethod('render');

    return html`
        <p>${this.props.message}</p>
    `;
  }

  protected override updated(changedProperties: PropertyValues): void {
    this._logger.logMethodArgs('updated', {changedProperties});

    if (changedProperties.has('props') && changedProperties.get('props') != null) {
      if (this.props.open && this.props.timer > 0) {
        this.autoClose();
      }

      this.dispatchEvent(new CustomEvent('toast-open-changed', {
        detail: this.props.open,
      }));
    }
  }

  protected toastAnimationEndHandler(): void {
    this._logger.logMethod('toastAnimationEndHandler');

    if (!this.props.open) {
      this.removeAttribute('closing');
    }
  }

  protected toastCloseHandler(): void {
    this._logger.logMethod('toastCloseHandler');

    this.props.open = false;
    clearTimeout(this.toastTimeout);

    requestAnimationFrame(() => {
      this.setAttribute('closing', '');
    });
  }

  protected autoClose(): void {
    this._logger.logMethod('autoClose');
    this.toastTimeout = window.setTimeout(this.toastCloseHandler, Number(this.props.timer));
  }
}
