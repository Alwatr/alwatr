declare global {
  interface Window {
    Vatr?: {
      registeredList?: Array<{
        name: string,
        version: string,
      }>;
    }
  }

  /**
   * @TODO: Make an issue to TS, WTF is this way! any better solution for more args in bind?!
   */
  interface CallableFunction {
    bind<T, A0, A1, A2, A3, A4, A extends unknown[], R>
      (this: (this: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4, ...args: A)
        => R, thisArg: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4): (...args: A) => R;
  }
}

export interface Logger {
  readonly color: string;

  readonly scope: string;

  /**
   * `console.debug` function or method calls.
   *
   * Example:
   *
   * ```ts
   * function myMethod () {
   *   logger.logMethod('myMethod');
   * }
   * ```
   */
  logMethod(method: string): void;

  /**
   * `console.debug` function or method calls with arguments.
   *
   * Example:
   *
   * ```ts
   *  function myMethod (a: number, b: number) {
   *    logger.logMethodArgs('myMethod', {a, b});
   *  }
   * ```
   */
  logMethodArgs(method: string, args: Record<string, unknown>): void;

  /**
   * `console.trace` an expected event or accident. (not warn or error)
   *
   * Example:
   *
   * ```ts
   * logger.incident('fetch', 'Abort_Signal', 'aborted signal received', {url: '/test.json'});
   * ```
   */
  incident(method: string, code: string, desc: string, ...args: unknown[]): void;

  /**
   * `console.warn` an unexpected accident or error that you handled.
   *
   * Example:
   *
   * ```ts
   * logger.accident('fetch', 'File_Not_Found', 'url requested return 404 not found', {url: '/test.json'});
   * ```
   */
  accident(method: string, code: string, desc: string, ...args: unknown[]): void;

  /**
   * `console.error` an unexpected error.
   *
   * Example:
   *
   * ```ts
   * try {
   *   ...
   * }
   * catch (err) {
   *   logger.error('myMethod', (err as Error).stack || err);
   * }
   * ```
   */
  error(method: string, errorStack: string | unknown): void;

  /**
   * Simple `console.debug` with styled scope.
   *
   * Example:
   *
   * ```ts
   * logger.logOther('foo:', 'bar', {a: 1});
   * ```
   */
  logOther(...args: unknown[]): void;
}
