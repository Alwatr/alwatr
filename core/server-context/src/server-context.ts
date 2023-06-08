import {AlwatrApiRequestBase} from './api-request.js';

import type {ServerRequestState, ServerRequestEvent, ServerRequestConfig} from './server-request.js';
import type {FetchOptions} from '@alwatr/fetch/type.js';
import type {ListenerCallback, SubscribeResult, SubscribeOptions} from '@alwatr/signal2';
import type {AlwatrServiceResponse} from '@alwatr/type';

type ExtraState = 'offlineCheck' | 'reloading' | 'reloadingFailed';
export type ServerContextState = ServerRequestState | ExtraState;

type ExtraEvent = 'cacheNotFound';
export type ServerContextEvent = ServerRequestEvent | ExtraEvent;

export abstract class AlwatrServerContextBase<
  T extends AlwatrServiceResponse = AlwatrServiceResponse
> extends AlwatrApiRequestBase<T, ExtraState, ExtraEvent> {
  protected _context?: T;
  constructor(protected override _config: ServerRequestConfig) {
    super(_config);

    this._stateRecord = {
      initial: {
        request: 'offlineCheck',
      },
      /**
       * Just check offline cache data before online request.
       */
      offlineCheck: {
        requestFailed: 'failed',
        cacheNotFound: 'loading',
        requestSuccess: 'reloading',
      },
      /**
       * First loading without any cached context.
       */
      loading: {
        requestFailed: 'failed',
        requestSuccess: 'complete',
      },
      /**
       * First loading failed without any cached context.
       */
      failed: {
        request: 'offlineCheck',
      },
      reloading: {
        requestFailed: 'reloadingFailed',
        requestSuccess: 'complete',
      },
      /**
       * Reloading failed with previously cached context exist.
       */
      reloadingFailed: {
        request: 'reloading',
      },
      complete: {
        request: 'reloading',
      },
    };

    this._actionRecord = {
      _on_offlineCheck_enter: this._$offlineRequestAction,
      _on_loading_enter: this._$onlineRequestAction,
      _on_reloading_enter: this._$onlineRequestAction,
      _on_requestSuccess: this._$updateContextAction,
    };
  }

  protected _$offlineRequestAction(): void {
    this._logger.logMethod?.('_$offlineRequestAction');
    this._setOptions({cacheStrategy: 'cache_only'});
    this._$requestAction();
  }

  protected _$onlineRequestAction(): void {
    this._logger.logMethod?.('_$onlineRequestAction');
    this._setOptions({cacheStrategy: 'update_cache'});
    this._$requestAction();
  }

  protected _$updateContextAction(): void {
    if (this._responseJson === undefined) {
      this._logger.accident('_$updateContextAction', 'no_response_json', 'this._responseJson undefined');
      return;
    }

    this._logger.logMethod?.('_$updateContextAction');

    if (
      this._context === undefined ||
      this._responseJson.meta?.lastUpdated === undefined ||
      this._responseJson.meta.lastUpdated !== this._context.meta?.lastUpdated
    ) {
      this._context = this._responseJson;
    }

    this._cleanup();
  }

  protected override async _$requestAction(): Promise<void> {
    this._logger.logMethod?.('_$requestAction');

    try {
      if (this._$fetchOptions === undefined) {
        throw new Error('invalid_fetch_options');
      }

      await this._$fetch(this._$fetchOptions);

      this._transition('requestSuccess');
    }
    catch (err) {
      if ((err as Error).message === 'fetch_cache_not_found') {
        this._transition('cacheNotFound');
      }
      else {
        this._logger.error('_$requestAction', 'fetch_failed', err);
        this._transition('requestFailed');
      }
    }
  }

  protected _cleanup(): void {
    delete this._response;
    delete this._responseJson;
  }
}

export class AlwatrServerContext<
  T extends AlwatrServiceResponse = AlwatrServiceResponse
> extends AlwatrServerContextBase<T> {
  /**
   * Current state.
   */
  get state(): ServerContextState {
    return this._state;
  }

  get context(): T | undefined {
    return this._context;
  }

  request(options?: Partial<FetchOptions>): void {
    return this._request(options);
  }

  /**
   * Subscribe to state changes.
   */
  subscribe(listenerCallback: ListenerCallback<this, ServerContextState>, options?: SubscribeOptions): SubscribeResult {
    return this._subscribe(listenerCallback, options);
  }

  /**
   * Unsubscribe from changes.
   */
  unsubscribe(listenerCallback: ListenerCallback<this, ServerContextState>): void {
    return this._unsubscribe(listenerCallback);
  }
}
