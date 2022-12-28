import {l10n} from '@alwatr/i18n';
import {LitElement} from 'lit';

import type {Constructor} from '../type.js';

export declare class LocalizeMixinInterface extends LitElement {
  protected _signalListenerList: Array<unknown>;
  protected l10n: {
    localize: typeof l10n.localize;
    formatNumber: typeof l10n.formatNumber;
  };
}

export function LocalizeMixin<T extends Constructor<LitElement>>(
    superClass: T,
): Constructor<LocalizeMixinInterface> & T {
  class LocalizeMixinClass extends superClass {
    protected _signalListenerList: Array<unknown> = [];

    protected l10n = {
      localize: l10n.localize,
      formatNumber: l10n.formatNumber,
    };

    override connectedCallback(): void {
      super.connectedCallback();
      this._signalListenerList.push(
          l10n.resourceChangeSignal.addListener(() => {
            this._l10nResourceChange();
          }),
      );
    }

    protected _l10nResourceChange(): void {
      this.requestUpdate();
    }
  }

  return LocalizeMixinClass as unknown as Constructor<LocalizeMixinInterface> & T;
}
