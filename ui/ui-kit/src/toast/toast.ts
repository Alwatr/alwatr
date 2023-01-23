import {css, customElement, html, nothing, state, type PropertyValues} from '@alwatr/element';
import {ListenerInterface} from '@alwatr/signal';

import '../button/icon-button.js';
import '../button/button.js';

import {toastSignal} from './signal.js';
import {AlwatrSurface} from '../card/surface.js';


declare global {
  interface HTMLElementTagNameMap {
    'alwatr-toast': AlwatrToast;
  }
}

export type ToastType = 'info' | 'error';
export interface ToastActionInterface {
  label: string;
  callback: (...args: any) => void;
}
export interface AlwatrToastOptionsInterface {
  message: string;
  timer: number;
  type: ToastType;
  open: boolean;
  icon?: string;
  action?: ToastActionInterface;
}

/**
 * Alwatr toast.
 */
@customElement('alwatr-toast')
export class AlwatrToast extends AlwatrSurface {
  static override styles = [
    AlwatrSurface.styles,
    css`
      :host {
        display: block
      }
    `,
  ];

  @state() options: AlwatrToastOptionsInterface = {
    message: 'Toast',
    open: false,
    timer: -1, // Stay open to infinity
    type: 'info',
  };

  protected _toastTimeout = 0;
  protected _toastSignalListener: ListenerInterface<'toast'> | null = null;

  override connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener('animationend', this.toastAnimationEndHandler);
    this._toastSignalListener = toastSignal.addListener((toastOptions) => {
      this.options = toastOptions;
    });
  }

  override disconnectedCallback(): void {
    this.removeEventListener('animationend', this.toastAnimationEndHandler);
    this._toastSignalListener!.remove();

    super.disconnectedCallback();
  }

  override render(): unknown {
    this._logger.logMethod('render');

    return html`
      <div>
        <p>${this.options.message}</p>
        <alwatr-icon-button .icon=${'close'} flip-rtl></alwatr-icon-button>
      </div>

      ${this.options.action
        ? html`
            <alwatr-button @click=${this.options.action.callback}>${this.options.action.label}</alwatr-button>`
        : nothing}
    `;
  }

  protected override updated(changedProperties: PropertyValues): void {
    this._logger.logMethodArgs('updated', {changedProperties});

    if (changedProperties.has('options') && changedProperties.get('options') != null) {
      if (this.options.open && this.options.timer > 0) {
        this.autoClose();
      }

      this.dispatchEvent(new CustomEvent('toast-open-changed', {
        detail: this.options.open,
      }));
    }
  }

  protected toastAnimationEndHandler(): void {
    this._logger.logMethod('toastAnimationEndHandler');

    if (!this.options.open) {
      this.removeAttribute('closing');
    }
  }

  protected toastCloseHandler(): void {
    this._logger.logMethod('toastCloseHandler');

    this.options.open = false;
    clearTimeout(this._toastTimeout);

    requestAnimationFrame(() => {
      this.setAttribute('closing', '');
    });
  }

  protected autoClose(): void {
    this._logger.logMethod('autoClose');
    this._toastTimeout = window.setTimeout(this.toastCloseHandler, Number(this.options.timer));
  }
}
