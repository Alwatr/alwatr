import {fetch} from '@alwatr/fetch';
import {FiniteStateMachineBase} from '@alwatr/fsm2';

import type {FetchOptions} from '@alwatr/fetch/type.js';
import type {ListenerCallback, SubscribeOptions, SubscribeResult} from '@alwatr/signal2';

export interface ServerRequestConfig extends Partial<FetchOptions> {
  name: string;
}

export type ServerRequestState = 'initial' | 'loading' | 'failed' | 'complete';

export type ServerRequestEvent = 'request' | 'requestFailed' | 'requestSuccess';

export abstract class AlwatrServerRequestBase extends FiniteStateMachineBase<ServerRequestState, ServerRequestEvent> {
  protected _$fetchOptions?: FetchOptions;
  protected _response?: Response;

  constructor(protected _config: ServerRequestConfig) {
    super({name: _config.name, initialState: 'initial'});

    this._stateRecord = {
      initial: {
        request: 'loading',
      },
      loading: {
        requestFailed: 'failed',
        requestSuccess: 'complete',
      },
      failed: {
        request: 'loading',
      },
      complete: {
        request: 'loading',
      },
    };

    this._actionRecord = {
      _on_loading_enter: this._requestAction,
    };
  }

  protected _request(options?: Partial<FetchOptions>): void {
    this._logger.logMethodArgs?.('_request', options);
    this._setOptions(options);
    this._transition('request');
  }

  protected async _$fetch(options: FetchOptions): Promise<void> {
    this._logger.logMethodArgs?.('_$fetch', options);
    this._response = await fetch(options);

    if (!this._response.ok) {
      throw new Error('fetch_nok');
    }
  }

  protected async _requestAction(): Promise<void> {
    this._logger.logMethod?.('_requestAction');

    try {
      if (this._$fetchOptions === undefined) {
        throw new Error('invalid_fetch_options');
      }

      await this._$fetch(this._$fetchOptions);

      this._transition('requestSuccess');
    }
    catch (err) {
      this._logger.error('_request', 'fetch_failed', err);
      this._transition('requestFailed');
    }
  }

  protected _setOptions(options?: Partial<FetchOptions>): void {
    this._logger.logMethodArgs?.('_setOptions', {options});

    const fetchOptions = {
      ...this._$fetchOptions,
      ...options,
      queryParameters: {
        ...this._$fetchOptions?.queryParameters,
        ...options?.queryParameters,
      },
    };

    if (fetchOptions.url == null) {
      throw new Error('invalid_fetch_options');
    }

    this._$fetchOptions = fetchOptions as FetchOptions;
  }
}

export class AlwatrServerRequest extends AlwatrServerRequestBase {
  /**
   * Current state.
   */
  get state(): ServerRequestState {
    return super._state;
  }

  get response(): Response | undefined {
    return super._response;
  }

  request(options?: Partial<FetchOptions>): void {
    return super._request(options);
  }

  /**
   * Subscribe to state changes.
   */
  subscribe(listenerCallback: ListenerCallback<this, ServerRequestState>, options?: SubscribeOptions): SubscribeResult {
    return super._subscribe(listenerCallback, options);
  }

  /**
     * Unsubscribe from changes.
     */
  unsubscribe(listenerCallback: ListenerCallback<this, ServerRequestState>): void {
    return super._unsubscribe(listenerCallback);
  }
}
