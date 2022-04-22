/* eslint-disable no-var */
export interface GlobalAlwatr {
  registeredList: Array<{
    name: string;
    version: string;
  }>;
}

declare global {
  var Alwatr: GlobalAlwatr;
  var ALWATR_DEBUG: string | undefined;

  /**
   * @TODO: Make an issue to TS, WTF is this way! any better solution for more args in bind?!
   */
  interface CallableFunction {
    bind<T, A0, A1, A2, A3, A4, A extends unknown[], R>(
      this: (this: T, arg0: A0, arg1: A1, arg2: A2, arg3: A3, arg4: A4, ...args: A) => R,
      thisArg: T,
      arg0: A0,
      arg1: A1,
      arg2: A2,
      arg3: A3,
      arg4: A4
    ): (...args: A) => R;
  }
}

export interface Logger {
  /**
   * Debug state for current scope base on localStorage `ALWATR_LOG` pattern.
   */
  readonly debug: boolean;

  /**
   * Color picked for current scope.
   */
  readonly color: string;

  /**
   * Scope defined for this logger.
   */
  readonly scope: string;

  /**
   * `console.debug` property change.
   *
   * Example:
   *
   * ```ts
   * logger.logProperty('name', 'ali');
   * ```
   */
  logProperty(property: string, value: unknown): void;

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
   * function myMethod (a: number, b: number) {
   *   logger.logMethodArgs('myMethod', {a, b});
   * }
   * ```
   */
  logMethodArgs(method: string, args: Record<string, unknown> | string | number | boolean): void;

  /**
   * `console.debug` function or method calls with arguments.
   *
   * Example:
   *
   * ```ts
   * function add (a: number, b: number): number {
   *   const result = a + b;
   *   logger.logMethodFull('add', {a, b}, result);
   *   return result;
   * }
   * ```
   */
  logMethodFull(
    method: string,
    args: Record<string, unknown> | string | number | boolean,
    result: unknown
  ): void;

  /**
   * `console.trace` an event or expected accident. (not warn or error)
   *
   * Example:
   *
   * ```ts
   * logger.incident('fetch', 'abort_signal', 'aborted signal received', {url: '/test.json'});
   * ```
   */
  incident(method: string, code: string, desc: string, ...args: unknown[]): void;

  /**
   * `console.warn` an unexpected accident or error that you handled.
   *
   * Example:
   *
   * ```ts
   * logger.accident('fetch', 'file_not_found', 'url requested return 404 not found', {url: '/test.json'});
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
   *   logger.error('myMethod', 'error_code', (err as Error).stack || err, {a: 1, b: 2});
   * }
   * ```
   */
  error(method: string, code: string, errorStack: string | unknown, ...args: unknown[]): void;

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
