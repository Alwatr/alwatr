import {signalManager} from './signal-manager.js';

import type {OmitFirstParam, Stringifyable} from '@alwatr/type';


/**
 * Command trigger/request interface.
 */
export const commandTrigger = {
  /**
   * Dispatch request command signal with commandArgument as detail and return untilNext of callback signal.
   *
   * Example:
   *
   * ```ts
   * const returnObject = await commandTrigger.request<ArgumentType, ReturnType>('show-dialog', {foo: 'bar'});
   * ```
   */
  request: signalManager.requestCommand,

  /**
   * Bind define command to special command.
   *
   * Example:
   *
   * ```ts
   * const showDialog = commandTrigger.bind<ArgumentType, ReturnType>('show-dialog');
   * ```
   */
  bind: <TArgument extends Record<string, Stringifyable>, TReturn extends Stringifyable>(commandId: string) =>({
    /**
     * Command signal Id.
     */
    id: commandId,

    /**
     * Dispatch request command signal with commandArgument as detail and return untilNext of callback signal.
     *
     * Example:
     *
     * ```ts
     * const returnObject = await showDialog.request({foo: 'bar'});
     * ```
     */
    request: signalManager.requestCommand.bind(null, commandId) as unknown as
      OmitFirstParam<typeof signalManager.setContextProvider<TArgument, TReturn>>,
  }),
} as const;
