import {localeContextConsumer} from '@alwatr/i18n';

import type {SignalMixinInterface} from './signal.js';
import type {Constructor, LocaleContext} from '@alwatr/type';

export declare class DirectionMixinInterface extends SignalMixinInterface {
  protected _dirParent: HTMLElement | null;
  protected _localeChange: (localeContext: LocaleContext) => void;
  protected _updateDir: () => void;
}

type ComputeMode = 'locale' | 'parents' | 'computed-style';
const defaultComputeStyleMode: ComputeMode = 'parents';

export function DirectionMixin<T extends Constructor<SignalMixinInterface>>(
    superClass: T,
    computeMode: ComputeMode = defaultComputeStyleMode,
): Constructor<DirectionMixinInterface> & T {
  class DirectionMixinClass extends superClass {
    /**
     * Parent element for get direction in parents mode.
     */
    protected _parentEl: HTMLElement | null = null;

    override connectedCallback(): void {
      super.connectedCallback();
      this._addSignalListener(localeContextConsumer.subscribe(() => this._updateDir()));
    }

    /**
     * Update direction from this._dirParent or l10n.locale
     */
    protected _updateDir(dir?: string): void {
      this._logger.logMethodArgs('_updateDir', {dir, computeMode});

      if (typeof dir === 'string') {
        // console.timeEnd('_updateDir');
        return this.setAttribute('dir', dir === 'rtl' ? dir : 'ltr');
      }

      // console.time('_updateDir');
      // else, calculate
      if (computeMode === 'locale') {
        return this._updateDir(localeContextConsumer.getValue()?.direction ?? document.documentElement.dir);
      }
      // else
      if (computeMode === 'computed-style') {
        const dir = window.getComputedStyle(this).getPropertyValue('direction');
        return this._updateDir(dir);
      }
      // else if (computeMode === 'parents')
      if (this._parentEl !== null) {
        return this._updateDir(this._parentEl.dir);
      }
      // else
      let parentEl = (this.assignedSlot || this.parentNode) as HTMLElement | null;
      while (parentEl != null && parentEl !== document.documentElement && !parentEl.dir) {
        // prettier-ignore
        parentEl = (
            parentEl.assignedSlot ||
            parentEl.parentNode ||
            (parentEl as unknown as ShadowRoot).host
          ) as HTMLElement;
      }

      if (parentEl?.dir) {
        this._parentEl = parentEl;
        return this._updateDir(parentEl.dir);
      }
      // else
      computeMode = 'locale';
      this._updateDir();
    }
  }

  return DirectionMixinClass as unknown as Constructor<DirectionMixinInterface> & T;
}
