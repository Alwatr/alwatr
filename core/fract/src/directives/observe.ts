
import {AlwatrDynamicDirective} from '../dynamic-directive.js';
import {directive, noChange, type PartInfo} from '../lit-html.js';

import type {AlwatrObservableInterface} from '@alwatr/signal2';

class AlwatrObserveDirective<T extends AlwatrObservableInterface<unknown>> extends AlwatrDynamicDirective {
  protected _$observable?: T;
  protected _$render?: (data: unknown) => unknown;
  unsubscribe?: () => void;

  constructor(partInfo: PartInfo) {
    super(partInfo, '<alwatr-observe>');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render(observable: T, render: (data: any) => unknown): unknown {
    this._logger.logMethodArgs?.('render', {observable, render});

    this._$render = render;
    if (this._$observable !== observable) {
      // When the observable changes, unsubscribe to the old one and subscribe to the new one
      this.unsubscribe?.();
      this._$observable = observable;
      if (this.isConnected) {
        this.subscribe(observable);
      }
    }

    return noChange;
  }

  /**
   * Subscribes to the observable, calling the directive's asynchronous and setValue each time the value changes.
   */
  subscribe(observable: T): void {
    this._logger.logMethod?.('subscribe');
    this.unsubscribe = observable.subscribe((v) => {
      this.setValue(this._$render!(v));
    }, {receivePrevious: true}).unsubscribe;
  }

  // When the directive is disconnected from the DOM, unsubscribe to ensure
  // the directive instance can be garbage collected
  override disconnected(): void {
    this.unsubscribe!();
  }
  // If the subtree the directive is in was disconnected and subsequently
  // re-connected, re-subscribe to make the directive operable again
  override reconnected(): void {
    this.subscribe(this._$observable!);
  }
}

export const alwatrObserve = directive(AlwatrObserveDirective);
