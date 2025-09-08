import {fetch, type FetchOptions} from '@alwatr/fetch';
import {AlwatrFluxStateMachineBase, type StateRecord, type ActionRecord, type AlwatrFluxStateMachineConfig} from '@alwatr/fsm';
import {packageTracer} from '@alwatr/nanolib';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

export type ServerRequestState = 'initial' | 'loading' | 'failed' | 'complete';
export type ServerRequestEvent = 'request' | 'request_failed' | 'request_succeeded';

export type {FetchOptions};

export interface AlwatrFetchStateMachineConfig<S extends string> extends Omit<AlwatrFluxStateMachineConfig<S>, 'initialState'> {
  fetch: Partial<FetchOptions>;
}

export abstract class AlwatrFetchStateMachineBase<
  ExtraState extends string = never,
  ExtraEvent extends string = never,
> extends AlwatrFluxStateMachineBase<ServerRequestState | ExtraState, ServerRequestEvent | ExtraEvent> {
  protected baseFetchOptions_: Partial<FetchOptions>;
  protected currentFetchOptions_?: FetchOptions;
  protected rawResponse_?: Response;

  protected override stateRecord_ = {
    initial: {
      request: 'loading',
    },
    loading: {
      request_failed: 'failed',
      request_succeeded: 'complete',
    },
    failed: {
      request: 'loading',
    },
    complete: {
      request: 'loading',
    },
  } as StateRecord<ServerRequestState | ExtraState, ServerRequestEvent | ExtraEvent>;

  protected override actionRecord_ = {
    on_state_loading_enter: this.requestAction_,
  } as ActionRecord<ServerRequestState | ExtraState, ServerRequestEvent | ExtraEvent>;

  constructor(config: AlwatrFetchStateMachineConfig<ServerRequestState | ExtraState>) {
    config.loggerPrefix ??= 'fetch-state-machine';
    super({
      ...config,
      initialState: 'initial',
    });
    this.baseFetchOptions_ = config.fetch;
  }

  protected request_(fetchOptions?: Partial<FetchOptions>): void {
    this.logger_.logMethodArgs?.('request_', fetchOptions);
    this.setFetchOptions_(fetchOptions);
    this.transition_('request');
  }

  protected async fetch_(fetchOptions: FetchOptions): Promise<void> {
    this.logger_.logMethodArgs?.('fetch_', fetchOptions);
    this.rawResponse_ = await fetch(fetchOptions);

    if (!this.rawResponse_.ok) {
      throw new Error('fetch_nok');
    }
  }

  protected async requestAction_(): Promise<void> {
    this.logger_.logMethod?.('requestAction__');

    try {
      if (this.currentFetchOptions_ === undefined) {
        throw new Error('invalid_fetch_options');
      }

      await this.fetch_(this.currentFetchOptions_);

      this.requestSucceeded_();
    }
    catch (error) {
      this.requestFailed_(error as Error);
    }
  }

  protected requestSucceeded_(): void {
    this.logger_.logMethod?.('requestSucceeded_');
    this.transition_('request_succeeded');
  }

  protected requestFailed_(error: Error): void {
    this.logger_.error('requestFailed_', 'fetch_failed', error);
    this.transition_('request_failed');
  }

  protected setFetchOptions_(options?: Partial<FetchOptions>): void {
    this.logger_.logMethodArgs?.('setOptions_', {options});

    this.currentFetchOptions_ = {
      ...this.baseFetchOptions_,
      ...options,
      queryParams: {
        ...this.baseFetchOptions_.queryParams,
        ...options?.queryParams,
      },
    } as FetchOptions;

    if (this.currentFetchOptions_.url === undefined) {
      throw new Error('invalid_fetch_options');
    }
  }

  /**
   * Reset the machine to its initial state without notifying, and clean up existing response and state.
   */
  protected clean_(): void {
    super.resetToInitialState_();
    delete this.rawResponse_;
    // FIXME: cancel pending fetch
  }
}
