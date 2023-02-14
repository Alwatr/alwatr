import type {LoggerMixinInterface} from './logging.js';
import type {Constructor} from '@alwatr/type';

export declare class ToggleMixinInterface extends LoggerMixinInterface {
  private _selected: boolean;
  get selected(): boolean;
  set selected(value: boolean);
  protected _click(event: MouseEvent): void
}

export function ToggleMixin<T extends Constructor<LoggerMixinInterface>>(
    superClass: T,
): Constructor<ToggleMixinInterface> & T {
  class ToggleMixinClass extends superClass {
    private _selected = false;

    get selected(): boolean {
      return this._selected;
    }
    set selected(value: boolean) {
      if (this._selected === value) return;
      this._logger.logProperty('selected', value);
      this._selected = value;
      if (value) {
        this.setAttribute('selected', '');
      }
      else {
        this.removeAttribute('selected');
      }
    }

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
    }
  }

  return ToggleMixinClass as unknown as Constructor<ToggleMixinInterface> & T;
}
