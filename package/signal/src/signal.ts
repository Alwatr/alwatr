import {createLogger} from '@alwatr/logger';

import {
  __getSignalObject,
  _removeSignalListener,
  _setSignalProvider,
  _dispatchSignal,
  _addSignalListener,
} from './core';

import type {
  ListenerOptions,
  DispatchOptions,
  ListenerCallback,
  SignalProvider,
  SignalProviderOptions,
} from './type';

/**
 * Signal API interface as a remote controller.
 */
export class SignalInterface<SignalName extends keyof AlwatrSignals> {
  private _signal;
  private _logger;

  constructor(signalName: SignalName) {
    this._logger = createLogger('Signal:' + signalName);
    this._signal = __getSignalObject(signalName);
  }

  /**
   * Get signal name.
   *
   * Example:
   *
   * ```ts
   * console.log(contentChangeSignal.name);
   * ```
   */
  get name(): SignalName {
    return this._signal.name;
  }

  /**
   * Get last dispatched signal value or undefined.
   *
   * Example:
   *
   * ```ts
   * const contentChangeSignal = new SignalInterface('content-change');
   * if (contentChangeSignal.dispatched) {
   *   const content = contentChangeSignal.value!;
   *   ...
   * }
   * ```
   */
  get value(): AlwatrSignals[SignalName] | undefined {
    return this._signal.value;
  }

  /**
   * Check signal dispatched before or not!
   *
   * Example
   *
   * ```ts
   * const contentChangeSignal = new SignalInterface('content-change');
   * if(contentChangeSignal.dispatched) {
   *   // contentChangeSignal.value exist.
   * }
   * ```
   */
  get dispatched(): boolean {
    return 'value' in this._signal;
  }

  /**
   * Disable signal, all dispatch's ignored (just value updated) and no more listeners will be called.
   *
   * Example:
   *
   * ```ts
   * contentChangeSignal.disabled = true;
   * ```
   */
  get disabled(): boolean {
    return this._signal.disabled;
  }
  set disabled(disabled: boolean) {
    this._signal.disabled = disabled;
  }

  /**
   * Expire the signal by clear last dispatched value.
   *
   * dispatched and receivePrevious etc not work until new signal.
   *
   * Example:
   *
   * ```ts
   * const contentChangeSignal = new SignalInterface('content-change');
   * contentChangeSignal.dispatched; // true
   * contentChangeSignal.expire();
   * contentChangeSignal.value; // undefined
   * contentChangeSignal.dispatched; // false
   * ```
   */
  expire(): void {
    this._logger.logMethod('expire');
    delete this._signal.value;
  }

  /**
   * Define signal provider, which will be called when signal requested (addRequestSignalListener).
   *
   * Example:
   *
   * ```ts
   * const contentChangeSignal = new SignalInterface('content-change');
   * contentChangeSignal.setProvider(async (requestParam) => {
   *   const content = await fetchNewContent(requestParam);
   *   if (content != null) {
   *     return content; // Dispatch signal 'content-change' with content.
   *   }
   *   else {
   *     // dispatch new signal: 'content-not-found'
   *   }
   * });
   * ```
   */
  setProvider(signalProvider: SignalProvider<SignalName>, options?: SignalProviderOptions): symbol {
    this._logger.logMethodArgs('setProvider', {options});
    return _setSignalProvider(this.name, signalProvider, options);
  }

  // @TODO: removeProvider(signalName): void

  /**
   * Dispatch request signal and wait for answer (wait for new signal dispatched).
   *
   * Resolved with signal value when new signal received (getNextSignalValue).
   *
   * Example:
   *
   * ```ts
   * const contentChangeSignal = new SignalInterface('content-change');
   * // dispatch request signal and wait for answer (wait for NEW signal).
   * const newContent = await contentChangeSignal.request({foo: 'bar'});
   * ```
   */
  request(requestParam: AlwatrRequestSignals[SignalName]): Promise<AlwatrSignals[SignalName]> {
    this._logger.logMethodArgs('request', {requestParam});
    const nextSignalValuePromise = this.getNextSignalValue();
    _dispatchSignal(
      `request-${this.name}` as unknown as SignalName,
      requestParam as unknown as AlwatrSignals[SignalName], // mastmalize to avoid type error
    );
    return nextSignalValuePromise;
  }

  /**
   * Resolved with signal value when new signal received.
   *
   * Example:
   *
   * ```ts
   * const contentChangeSignal = new SignalInterface('content-change');
   * // Wait for NEW signal received.
   * const newContent = await contentChangeSignal.getNextSignalValue();
   * ```
   */
  getNextSignalValue(): Promise<AlwatrSignals[SignalName]> {
    this._logger.logMethod('getNextSignalValue');
    return new Promise((resolve) => {
      this.addListener(resolve, {
        once: true,
        priority: true,
        receivePrevious: false,
      });
    });
  }

  /**
   * Resolved with signal value when signal is ready.
   *
   * Get signal value from last dispatched signal (if any) or wait for new signal received.
   *
   * Example:
   *
   * ```ts
   * const contentChangeSignal = new SignalInterface('content-change');
   * // get signal value from last dispatched signal (if any) or wait new signal received.
   * const content = await contentChangeSignal.getSignalValue();
   * ```
   */
  getSignalValue(): Promise<AlwatrSignals[SignalName]> {
    this._logger.logMethod('getSignalValue');
    if (this._signal.value !== undefined) {
      return Promise.resolve(this._signal.value);
    } else {
      return this.getNextSignalValue();
    }
  }

  /**
   * Dispatch signal to all listeners.
   *
   * Example:
   *
   * ```ts
   * const contentChangeSignal = new SignalInterface('content-change');
   * contentChangeSignal.dispatch(content);
   * ```
   */
  dispatch(signalValue: AlwatrSignals[SignalName], options?: DispatchOptions): void {
    this._logger.logMethodArgs('dispatch', {signalValue, options});
    _dispatchSignal(this._signal.name, signalValue, options);
  }

  /**
   * Add new listener to the signal.
   *
   * Example:
   *
   * ```ts
   * const contentChangeSignal = new SignalInterface('content-change');
   * const listener = contentChangeSignal.addListener((content) => console.log(content));
   * ```
   */
  addListener(listener: ListenerCallback<SignalName>, options?: ListenerOptions): symbol {
    this._logger.logMethodArgs('addListener', {listener, options});
    return _addSignalListener(this._signal.name, listener, options);
  }

  /**
   * Remove listener from specific signal.
   *
   * Example:
   *
   * ```ts
   * const contentChangeSignal = new SignalInterface('content-change');
   * const listenerId = contentChangeSignal.addListener((content) => console.log(content));
   * ...
   * contentChangeSignal.removeListener(listenerId);
   * ```
   */
  removeListener(listenerId: symbol): void {
    this._logger.logMethod('removeListener');
    _removeSignalListener(this._signal.name, listenerId);
  }
}

// @TODO: getSignalOptions(signalName);
// @TODO: getListenerOptions(listenerId);
// @TODO: setSignalOptions(signalName, {...});
// @TODO: setListenerOptions(listenerId, {...});
