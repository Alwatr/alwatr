import {l10n} from '@alwatr/i18n';
import {LitElement} from 'lit';

import type {Constructor} from '../type.js';
import type {ListenerInterface} from '@alwatr/signal';

export declare class I18nResourceChangeMixinInterface extends LitElement {
  private __i18nResourceChangeMixinListener?: ListenerInterface<'l10n-resource-change'>;
}
export declare class I18nLocaleChangeMixinInterface extends LitElement {
  private __i18nLocaleChangeMixinListener?: ListenerInterface<'locale-change'>;
}

export function I18nResourceChangeMixin<ClassType extends Constructor<LitElement>>(
    superClass: ClassType,
): Constructor<I18nResourceChangeMixinInterface> & ClassType {
  class I18nResourceChangeMixinClass extends superClass {
    private __i18nResourceChangeMixinListener = l10n.resourceChangeSignal.addListener(() => this.requestUpdate());

    override disconnectedCallback(): void {
      super.disconnectedCallback();

      this.__i18nResourceChangeMixinListener.remove();
    }
  }

  return I18nResourceChangeMixinClass as unknown as Constructor<I18nResourceChangeMixinInterface> & ClassType;
}
export function I18nLocaleChangeMixin<ClassType extends Constructor<LitElement>>(
    superClass: ClassType,
): Constructor<I18nLocaleChangeMixinInterface> & ClassType {
  class I18nLocaleChangeMixinClass extends superClass {
    private __i18nLocaleChangeMixinListener = l10n.localeChangeSignal.addListener((locale) => {
      this.dir = locale.direction;
    });

    override connectedCallback(): void {
      super.connectedCallback();

      if (l10n.localeChangeSignal.value != null) {
        this.dir = l10n.localeChangeSignal.value.direction;
      }
    }

    override disconnectedCallback(): void {
      super.disconnectedCallback();

      this.__i18nLocaleChangeMixinListener.remove();
    }
  }

  return I18nLocaleChangeMixinClass as unknown as Constructor<I18nLocaleChangeMixinInterface> & ClassType;
}
