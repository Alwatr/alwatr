import {MaybePromise} from '@alwatr/type';

import {
  logger,
  _addSignalListener,
  _dispatchSignal,
  _getSignalObject,
} from './core.js';
import {ProviderOptions} from './type.js';

let _callbackAutoId = 0;

/**
 * Command provider function.
 */
export type CommandProviderFunction<
  TArgument extends Record<string, unknown>,
  TReturn extends Record<string, unknown>
> = (argumentObject: TArgument) => MaybePromise<TReturn>;

export function commandProvider<TArgument extends Record<string, unknown>, TReturn extends Record<string, unknown>>(
    commandId: string,
    commandProvider: CommandProviderFunction<TArgument, TReturn>,
    options: Pick<ProviderOptions, 'debounce'> = {},
): void {
  options.debounce ??= 'AnimationFrame';
  logger.logMethodArgs('commandProvider', {commandId, options});

  const requestSignalId = `command-${commandId}-request`;

  const requestSignal = _getSignalObject<TArgument>(requestSignalId);
  if (requestSignal.listenerList.length > 0) {
    logger.accident(
        'commandProvider',
        'another_command_provider_exist',
        'Another command exist! It will be removed to fix the problem.',
        {
          commandId,
          requestSignalId,
        },
    );
    requestSignal.listenerList = [];
  }

  _addSignalListener<TArgument & {_callbackSignalId: string}>(
      requestSignalId,
      async (argumentObject) => {
        const callbackSignalId = argumentObject._callbackSignalId;
        // TODO: validate callbackSignalId
        const commandReturn = await commandProvider(argumentObject);
        _dispatchSignal<TReturn>(callbackSignalId, commandReturn, {debounce: options.debounce});
      },
      {
        receivePrevious: 'No', // Prevent to merge multiple previous requests
      },
  );
}

export function commandRequest<TArgument extends Record<string, unknown>, TReturn extends Record<string, unknown>>(
    commandId: string,
    commandArgument: TArgument,
): Promise<TReturn> {
  return new Promise((resolve) => {
    const requestSignalId = `command-${commandId}-request`;
    const _callbackSignalId = `command-${commandId}-callback-${++_callbackAutoId}`;

    // TODO: refactor _untilNextSignal with option and use it
    _addSignalListener<TReturn>(_callbackSignalId, resolve, {once: true, priority: true, receivePrevious: 'No'});

    _dispatchSignal<TArgument & {_callbackSignalId: string}>(
        requestSignalId,
        {...commandArgument, _callbackSignalId},
        {debounce: 'No'},
    );
  });
}

// TODO: bind
