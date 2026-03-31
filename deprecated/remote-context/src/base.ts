import {
  AlwatrJsonFetchStateMachineBase,
  type AlwatrFetchStateMachineConfig,
  type ServerRequestEvent,
  type ServerRequestState,
} from '@alwatr/fetch-state-machine';
import {packageTracer} from '@alwatr/nanolib';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

type ExtraState = 'offline_check' | 'reloading' | 'reloading_failed';
export type ServerContextState = ServerRequestState | ExtraState;

type ExtraEvent = 'cache_not_found';
export type ServerContextEvent = ServerRequestEvent | ExtraEvent;

export type AlwatrRemoteContextStateMachineConfig = AlwatrFetchStateMachineConfig<ServerContextState>;

export abstract class AlwatrRemoteContextStateMachineBase<T extends JsonValue = JsonObject> extends AlwatrJsonFetchStateMachineBase<
  T,
  ExtraState,
  ExtraEvent
> {
  protected context_?: T;

  constructor(config: AlwatrRemoteContextStateMachineConfig) {
    super(config);

    this.stateRecord_ = {
      initial: {
        request: 'offline_check',
      },
      /**
       * Just check offline cache data before online request.
       */
      offline_check: {
        request_failed: 'failed',
        cache_not_found: 'loading',
        request_succeeded: 'reloading',
      },
      /**
       * First loading without any cached context.
       */
      loading: {
        request_failed: 'failed',
        request_succeeded: 'complete',
      },
      /**
       * First loading failed without any cached context.
       */
      failed: {
        request: 'loading', // //TODO: why offline_check? should be loading!
      },
      reloading: {
        request_failed: 'reloading_failed',
        request_succeeded: 'complete',
      },
      /**
       * Reloading failed with previously cached context exist.
       */
      reloading_failed: {
        request: 'reloading',
      },
      complete: {
        request: 'reloading',
      },
    };

    this.actionRecord_ = {
      on_state_offline_check_enter: this.offlineRequestAction_,
      on_state_loading_enter: this.onlineRequestAction_,
      on_state_reloading_enter: this.onlineRequestAction_,
      on_event_request_succeeded: this.updateContextAction_,
    };
  }

  protected offlineRequestAction_(): void {
    this.logger_.logMethod?.('offlineRequestAction_');
    this.currentFetchOptions_!.cacheStrategy = 'cache_only';
    this.requestAction_();
  }

  protected onlineRequestAction_(): void {
    this.logger_.logMethod?.('onlineRequestAction_');
    this.currentFetchOptions_!.cacheStrategy = 'update_cache';
    this.requestAction_();
  }

  protected updateContextAction_(): void {
    this.logger_.logMethod?.('updateContextAction_');

    if (this.jsonResponse_ === undefined) {
      this.logger_.accident('updateContextAction_', 'no_response_json');
      return;
    }

    this.context_ = this.jsonResponse_;
  }

  protected override requestFailed_(error: Error): void {
    this.logger_.logMethod?.('requestFailed_');

    if (error.message === 'fetch_cache_not_found') {
      this.transition_('cache_not_found');
    }
    else {
      super.requestFailed_(error);
    }
  }

  protected override clean_(): void {
    super.clean_();
    delete this.context_;
  }
}
