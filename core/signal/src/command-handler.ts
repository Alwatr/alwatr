import {defineCommand} from './core2.js';

/**
 * Command handler/define interface.
 */
export const commandHandler = {
  /**
   * Defines the command and dispatch returned value.
   *
   * Subscribe commandFunction to request-command-signal and dispatch callback-signal with commandFunction return value.
   *
   * Example:
   *
   * ```ts
   * commandHandler.define<TArgument, TReturn>(
   *   'show-prompt',
   *   async (argumentObject) => {
   *      return await showPrompt(argumentObject);
   *   },
   * );
   * ```
   */
  define: defineCommand,
} as const;
