import {routeContextConsumer, type RouteContext} from '@alwatr/router';

import type {SignalMixinInterface} from './signal.js';
import type {Constructor} from '@alwatr/type';

export declare class RouterMixinInterface extends SignalMixinInterface {
  protected _routeContextUpdated(routeContext: RouteContext): void;
}

export function RouterMixin<T extends Constructor<SignalMixinInterface>>(
    superClass: T,
): Constructor<RouterMixinInterface> & T {
  class RouterMixinClass extends superClass {
    override connectedCallback(): void {
      super.connectedCallback();
      this._addSignalListeners(
          routeContextConsumer.subscribe((routeContext) => this._routeContextUpdated(routeContext), {
            receivePrevious: 'No',
          }),
      );
    }

    /**
     * On route context update.
     */
    protected _routeContextUpdated(routeContext: RouteContext): void {
      this._logger.logMethodArgs('_routeContextUpdated', routeContext);
      this.requestUpdate();
    }
  }

  return RouterMixinClass as unknown as Constructor<RouterMixinInterface> & T;
}
