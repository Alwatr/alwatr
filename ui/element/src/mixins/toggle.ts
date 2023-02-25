import {property} from 'lit/decorators.js';

import type {LoggerMixinInterface} from './logging.js';
import type {Constructor} from '@alwatr/type';

export declare class ToggleMixinInterface extends LoggerMixinInterface {
  selected: boolean;
  protected _click(event: MouseEvent): void
}

export function ToggleMixin<T extends Constructor<LoggerMixinInterface>>(
    superClass: T,
): Constructor<ToggleMixinInterface> & T {
  class ToggleMixinClass extends superClass {
    @property({type: Boolean, reflect: true})
      selected = false;

    override connectedCallback(): void {
      super.connectedCallback();
      this.addEventListener('click', this._click);
    }
    override disconnectedCallback(): void {
      super.disconnectedCallback();
      this.removeEventListener('click', this._click);
    }

    /**
     * On host click event.
     */
    protected _click(event: MouseEvent): void {
      this._logger.logMethod('_click');
      if (event.metaKey || event.altKey || event.shiftKey) return;
      this.selected = !this.selected;
      this.dispatchEvent(new CustomEvent('selected-change'));
    }
  }

  return ToggleMixinClass as unknown as Constructor<ToggleMixinInterface> & T;
}
