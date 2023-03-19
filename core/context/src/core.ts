import {serviceRequest, type StringifyableFetchOptions} from '@alwatr/fetch';
import {finiteStateMachineProvider, type FsmConsumerInterface} from '@alwatr/fsm';
import {createLogger, globalAlwatr} from '@alwatr/logger';

import type {ServerContextFsm, ServerContextFsmContext} from './type.js';

export const logger = createLogger('alwatr/context');

globalAlwatr.registeredList.push({
  name: '@alwatr/context',
  version: _ALWATR_VERSION_,
});

export const serverContextFsmConstructorId = 'server_context_fsm';

export const serverContextFsmConstructor = finiteStateMachineProvider.defineConstructor(serverContextFsmConstructorId, {
  initial: 'initial',
  context: <ServerContextFsmContext>{
    options: {},
  },
  stateRecord: {
    $all: {
      on: {},
    },
    initial: {
      on: {
        REQUEST: {
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
        REQUEST: {
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
        REQUEST: {
          target: 'reloading',
        },
      },
    },
    complete: {
      on: {
        REQUEST: {
          target: 'reloading',
        },
      },
    },
  },
});

finiteStateMachineProvider.defineActions<ServerContextFsm>(serverContextFsmConstructorId, {
  offline_mode: (fsm) => {
    logger.logMethod('action_offline_mode');
    const {options} = fsm.getContext();
    if (options == null) return logger.error('action_offline_mode', 'invalid_fetch_options', {id: fsm.id});
    options.cacheStrategy = 'cache_only';
  },

  online_mode: (fsm) => {
    logger.logMethod('action_online_mode');
    const {options} = fsm.getContext();
    if (options == null) return logger.error('action_online_mode', 'invalid_fetch_options', {id: fsm.id});
    options.cacheStrategy = 'update_cache';
  },

  request: async (fsm) => {
    logger.logMethod('action_request');

    try {
      const {response, options} = fsm.getContext();
      if (options == null || options.url == null) {
        return logger.error('action_request', 'invalid_fetch_options', {id: fsm.id, options});
      }
      const newResponse = await serviceRequest<NonNullable<ServerContextFsmContext['response']>>(
        options as StringifyableFetchOptions,
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
    options?: ServerContextFsm['TContext']['options'],
    mergeOption = true,
): void => {
  logger.logMethodArgs('request', fsm.id);
  if (options != null) setOptions(fsm, options, mergeOption);
  fsm.transition('REQUEST');
};

export const setOptions = (
    fsm: FsmConsumerInterface<ServerContextFsm>,
    options: ServerContextFsm['TContext']['options'],
    merge = true,
): void => {
  logger.logMethodArgs('setOptions', fsm.id);
  const oldOptions = fsm.getContext().options;
  // prettier-ignore
  fsm.setContext({
    options: merge === false ? options : {
      ...oldOptions,
      ...options,
      queryParameters: {
        ...oldOptions?.queryParameters,
        ...options.queryParameters,
      },
    },
  });
};
