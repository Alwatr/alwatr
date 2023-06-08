import {NODE_MODE} from '@alwatr/logger';
import {getClientId} from '@alwatr/util';

import {AlwatrServerRequestBase} from './server-request.js';

import type {ServerRequestState} from './server-request.js';
import type {FetchOptions} from '@alwatr/fetch/type.js';
import type {ListenerCallback, SubscribeOptions, SubscribeResult} from '@alwatr/signal2';
import type {AlwatrServiceResponse, Stringifyable, StringifyableRecord} from '@alwatr/type';

export abstract class AlwatrApiRequestBase<
  TData extends Stringifyable = Stringifyable,
  TMeta extends StringifyableRecord = StringifyableRecord
> extends AlwatrServerRequestBase {
  protected _responseJson?: AlwatrServiceResponse<TData, TMeta>;

  protected override async _$fetch(options: FetchOptions): Promise<void> {
    if (!NODE_MODE) {
      options.headers ??= {};
      if (!options.headers['client-id']) {
        options.headers['client-id'] = getClientId();
      }
    }

    super._$fetch(options);

    let responseText: string;
    try {
      responseText = await this._response!.text();
    }
    catch (err) {
      this._logger.error('_$fetch', 'invalid_response_text', err);
      throw err;
    }

    try {
      this._responseJson = JSON.parse(responseText);
    }
    catch (err) {
      this._logger.error('_$fetch', 'invalid_response_json', err, {responseText});
      throw err;
    }

    const responseJson = this._responseJson!;
    if (responseJson.ok !== true) {
      if (typeof responseJson.errorCode === 'string') {
        this._logger.accident('_$fetch', responseJson.errorCode, 'fetch response not ok', {responseJson});
        throw new Error(responseJson.errorCode);
      }
      else {
        this._logger.error('_$fetch', 'fetch_nok', 'fetch response json not ok', {responseJson});
        throw new Error('fetch_nok');
      }
    }
  }
}

export class AlwatrApiRequest<
  TData extends Stringifyable = Stringifyable,
  TMeta extends StringifyableRecord = StringifyableRecord
> extends AlwatrApiRequestBase<TData, TMeta> {
  /**
   * Current state.
   */
  get state(): ServerRequestState {
    return super._state;
  }

  get response(): AlwatrServiceResponse<TData, TMeta> | undefined {
    return super._responseJson;
  }

  get _fetchResponse(): Response | undefined {
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
