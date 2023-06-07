import {fetch} from '@alwatr/fetch';
import {FiniteStateMachineBase} from '@alwatr/fsm2';

import type {FetchOptions} from '@alwatr/fetch/type.js';
import type {ListenerCallback, SubscribeOptions, SubscribeResult} from '@alwatr/signal2';

export interface ServerRequestConfig extends FetchOptions {
  name: string;
}

export type ServerRequestState = 'initial' | 'loading' | 'failed' | 'complete';

export type ServerRequestEvent = 'request' | 'requestFailed' | 'requestSuccess';

export abstract class AlwatrServerRequestBase extends FiniteStateMachineBase<ServerRequestState, ServerRequestEvent> {
  protected _fetchOptions: Partial<FetchOptions>;
  protected _response?: Response;

  constructor(config: ServerRequestConfig) {
    super({name: config.name, initialState: 'initial'});

    this._fetchOptions = this._mergeOptions(config);

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
  }

  protected async _$fetch(options: FetchOptions): Promise<void> {
    this._response = await fetch(options);

    if (!this._response.ok) {
      throw new Error('fetch_nok');
    }
  }

  protected async _request(options: Partial<FetchOptions>): Promise<void> {
    this._logger.logMethod?.('_request');

    const fetchOptions = this._mergeOptions(options);

    try {
      if (fetchOptions.url == null) {
        throw new Error('invalid_fetch_options');
      }

      await this._$fetch(fetchOptions as FetchOptions);

      this._transition('requestSuccess');
    }
    catch (err) {
      this._logger.error('_request', 'fetch_failed', err);
      this._transition('requestFailed');
    }
  }

  protected _mergeOptions(options: Partial<FetchOptions>): Partial<FetchOptions> {
    this._logger.logMethodArgs?.('_mergeOptions', {options});
    return {
      ...this._fetchOptions,
      ...options,
      queryParameters: {
        ...this._fetchOptions.queryParameters,
        ...options.queryParameters,
      },
    };
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

  request(options: Partial<FetchOptions>): Promise<void> {
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
