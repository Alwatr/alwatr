import {serviceRequest, type StringifyableFetchOptions} from '@alwatr/fetch';
import {finiteStateMachineProvider, type FsmConsumerInterface} from '@alwatr/fsm';
import {createLogger, globalAlwatr} from '@alwatr/logger';

import type {ServerContextFsm, ServerContextFsmContext} from './type.js';
import type {AlwatrServiceResponseSuccessWithMeta} from '@alwatr/type';

export const logger = createLogger('alwatr/context');

globalAlwatr.registeredList.push({
  name: '@alwatr/context',
  version: _ALWATR_VERSION_,
});

export const serverContextFsmConstructor = finiteStateMachineProvider.defineConstructor('server_context_fsm', {
  initial: 'initial',
  context: <ServerContextFsmContext>{},
  stateRecord: {
    $all: {
      on: {},
    },
    initial: {
      on: {
        request_service: {
          target: 'offlineLoading',
        },
      },
    },
    /**
     * Just check offline cache data before online request.
     */
    offlineLoading: {
      entry: ['offline_mode', 'request'],
      on: {
        request_failed: {
          target: 'loadingFailed',
        },
        request_success: {
          target: 'reloading',
        },
        cache_not_found: {
          target: 'onlineLoading',
        },
      },
    },
    /**
     * First loading without any cached context.
     */
    onlineLoading: {
      entry: ['online_mode', 'request'],
      on: {
        request_failed: {
          target: 'loadingFailed',
        },
        request_success: {
          target: 'complete',
        },
      },
    },
    /**
     * First loading failed without any cached context.
     */
    loadingFailed: {
      on: {
        request_service: {
          target: 'offlineLoading',
        },
      },
    },
    reloading: {
      entry: ['online_mode', 'request'],
      on: {
        request_failed: {
          target: 'reloadingFailed',
        },
        request_success: {
          target: 'complete',
        },
      },
    },
    /**
     * Reloading failed with previously cached context exist.
     */
    reloadingFailed: {
      on: {
        request_service: {
          target: 'reloading',
        },
      },
    },
    complete: {
      on: {
        request_service: {
          target: 'reloading',
        },
      },
    },
  },
});

finiteStateMachineProvider.defineActions<ServerContextFsm>('server_context_fsm', {
  offline_mode: (fsm) => {
    logger.logMethod('action_offline_mode');
    const {options: fetchOptions} = fsm.getContext();
    if (fetchOptions == null) return logger.error('action_offline_mode', 'invalid_fetch_options', {id: fsm.id});
    fetchOptions.cacheStrategy = 'cache_only';
  },

  online_mode: (fsm) => {
    logger.logMethod('action_online_mode');
    const {options: fetchOptions} = fsm.getContext();
    if (fetchOptions == null) return logger.error('action_online_mode', 'invalid_fetch_options', {id: fsm.id});
    fetchOptions.cacheStrategy = 'update_cache';
  },

  request: async (fsm) => {
    logger.logMethod('action_request');

    try {
      const {response, options: fetchOptions} = fsm.getContext();
      if (fetchOptions == null) return logger.error('action_request', 'invalid_fetch_options', {id: fsm.id});
      const newResponse = await serviceRequest<NonNullable<ServerContextFsmContext['response']>>(
        fetchOptions as StringifyableFetchOptions,
      );

      if (
        response != null &&
        newResponse.meta?.lastUpdated != null &&
        newResponse.meta.lastUpdated === response.meta?.lastUpdated
      ) {
        // no changed
        fsm.transition('request_success');
      }
      else {
        fsm.transition('request_success', {response: newResponse});
      }
    }
    catch (err) {
      if ((err as Error).message === 'fetch_cache_not_found') {
        fsm.transition('cache_not_found');
      }
      else {
        logger.error('requestOrderStorageContext', 'fetch_failed', err);
        fsm.transition('request_failed');
      }
    }
  },
});

export const request = (
    fsm: FsmConsumerInterface<ServerContextFsm>,
    options?: Partial<StringifyableFetchOptions>,
    mergeOption = true,
): void => {
  logger.logMethodArgs('request', fsm.id);
  if (options != null) setOptions(fsm, options, mergeOption);
  fsm.transition('request_service');
};

export const setOptions = (
    fsm: FsmConsumerInterface<ServerContextFsm>,
    options: Partial<StringifyableFetchOptions>,
    merge = true,
): void => {
  logger.logMethodArgs('setOptions', fsm.id);
  const {options: fetchOptions} = fsm.getContext();
  // prettier-ignore
  fsm.setContext({
    options: merge === false ? options : {
      ...options,
      queryParameters: {
        ...fetchOptions?.queryParameters,
        ...options.queryParameters,
      },
    },
  });
};

export const getResponse = <TResponse extends AlwatrServiceResponseSuccessWithMeta>(
  fsm: FsmConsumerInterface<ServerContextFsm, ServerContextFsmContext<TResponse>>,
): TResponse | undefined => {
  logger.logMethodArgs('getResponse', fsm.id);
  return fsm.getContext().response;
};
