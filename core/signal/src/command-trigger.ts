import {requestCommand, requestCommandWithResponse} from './core.js';

import type {OmitFirstParam, Stringifyable} from '@alwatr/type';

/**
 * Command trigger/request interface.
 */
export const commandTrigger = {
  /**
   * Dispatch request command signal with commandArgument as detail.
   *
   * Example:
   *
   * ```ts
   * commandTrigger.request<ArgumentType>('show-dialog', {foo: 'bar'});
   * ```
   */
  request: requestCommand,

  /**
   * Dispatch request command signal with commandArgument as detail and return untilNext of callback signal.
   *
   * Request command and wait for answer.
   *
   * Example:
   *
   * ```ts
   * const response = await commandTrigger.requestWithResponse<ArgumentType, ReturnType>('show-dialog', {foo: 'bar'});
   * ```
   */
  requestWithResponse: requestCommandWithResponse,

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
     * showDialog.request({foo: 'bar'});
     * ```
     */
    request: requestCommand.bind(null, commandId) as unknown as
      OmitFirstParam<typeof requestCommand<TArgument>>,

    /**
     * Dispatch request command signal with commandArgument as detail and return untilNext of callback signal.
     *
     * Example:
     *
     * ```ts
     * const response = await showDialog.requestWithResponse({foo: 'bar'});
     * ```
     */
    requestWithResponse: requestCommandWithResponse.bind(null, commandId) as unknown as
      OmitFirstParam<typeof requestCommandWithResponse<TArgument, TReturn>>,
  }),
} as const;
