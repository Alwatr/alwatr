import {fetch} from '@alwatr/fetch';
import {FiniteStateMachineBase} from '@alwatr/fsm2';

import type {FetchOptions} from '@alwatr/fetch/src/type.js';

export interface ServerRequestConfig extends FetchOptions {
  name: string;
}

type State = 'initial' | 'loading' | 'failed' | 'complete';

type Event = 'request' | 'requestFailed' | 'requestSuccess';

export abstract class AlwatrServerRequestBase extends FiniteStateMachineBase<State, Event> {
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

  protected async _request(options: Partial<FetchOptions>): Promise<void> {
    this._logger.logMethod?.('_request');

    const fetchOptions = this._mergeOptions(options);

    try {
      if (fetchOptions.url == null) {
        throw new Error('invalid_fetch_options');
      }

      this._response = await fetch(fetchOptions as FetchOptions);

      if (!this._response.ok) {
        throw new Error('fetch_nok');
      }

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
  get response(): Response | undefined {
    return super._response;
  }

  request(options: Partial<FetchOptions>): Promise<void> {
    return super._request(options);
  }
}
