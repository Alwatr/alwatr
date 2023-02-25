import type {LoggerMixinInterface} from './logging.js';
import type {PropertyValues} from '../lit.js';
import type {Constructor} from '@alwatr/type';

export declare class UnresolvedMixinInterface extends LoggerMixinInterface {}

export function UnresolvedMixin<T extends Constructor<LoggerMixinInterface>>(
    superClass: T,
): Constructor<UnresolvedMixinInterface> & T {
  class UnresolvedMixinClass extends superClass {
    protected override firstUpdated(_changedProperties: PropertyValues<this>): void {
      super.firstUpdated(_changedProperties);
      if (this.hasAttribute('unresolved')) {
        this.removeAttribute('unresolved');
      }
    }
  }

  return UnresolvedMixinClass as unknown as Constructor<UnresolvedMixinInterface> & T;
}
