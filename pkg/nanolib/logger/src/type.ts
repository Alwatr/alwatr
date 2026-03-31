/**
 * Represents the AlwatrLogger interface for logging various types of information at different levels of detail.
 * This interface allows for structured logging of events, method calls, errors, and more,
 * aiding in debugging and understanding application behavior.
 * 
 * @example
 * import {createLogger} from '@alwatr/logger';
 * const logger = createLogger('my-module'); // Create a logger with a specific scope
 * 
 * function greet(name: string) {
 *   logger.logMethodArgs?.('greet', {name}); // Log the method call with its arguments
 *   // ...
 * }
 *
 * greet('Ali');
 */
export interface AlwatrLogger {
  /**
   * Indicates whether debug mode is enabled for the current scope.
   * This state is typically determined based on the `debug` pattern in localStorage.
   */
  debugMode: boolean;

  /**
   * Logs a property change with its new value using `console.debug`. Useful for tracking changes in application state.
   *
   * @param propertyName The name of the property that has changed.
   * @param value The new value of the property.
   *
   * @example
   * ```ts
   * logger.logProperty?.('name', 'ali');
   * ```
   */
  logProperty?(propertyName: string, value: unknown): void;

  /**
   * Logs the file name of the current module using `console.debug`.
   * Helpful for identifying the source of log messages.
   *
   * @param fileName The name of the file representing the module.
   *
   * @example
   * ```ts
   * logger.logFileModule?.('app');
   * ```
   */
  logFileModule?(fileName: string): void;

  /**
   * Logs the entry into a function or method using `console.debug`.
   * Provides a basic trace of program execution.
   *
   * @param methodName The name of the function or method being called.
   *
   * @example
   * ```ts
   * function myMethod () {
   *   logger.logMethod?.('myMethod');
   * }
   * ```
   */
  logMethod?(methodName: string): void;

  /**
   * Logs the entry into a function or method along with its arguments using `console.debug`.
   * Aids in understanding the context of method calls.
   *
   * @param methodName The name of the function or method being called.
   * @param args An object containing the arguments passed to the method.
   *
   * @example
   * ```ts
   * function myMethod (a: number, b: number) {
   *   logger.logMethodArgs?.('myMethod', {a, b});
   * }
   * ```
   */
  logMethodArgs?(methodName: string, args: unknown): void;

  /**
   * Logs specific steps or milestones within a method using `console.debug`.
   * Facilitates tracking progress within complex functions.
   *
   * @param methodName The name of the method where the step occurs.
   * @param stepName The name or identifier of the specific step.
   * @param props (Optional) Additional properties or data related to the step.
   *
   * @example
   * ```ts
   * function myMethod () {
   *   logger.logMethod?.('myMethod');
   *   ...
   *   logger.logStep?.('myMethod', 'step1');
   *   ...
   *   logger.logStep?.('myMethod', 'step2');
   *   ...
   * }
   * ```
   */
  logStep?(methodName: string, stepName: string, props?: unknown): void;

  /**
   * Logs a complete method call, including its arguments and result, using `console.debug`.
   * Useful for debugging and understanding the output of functions.
   *
   * @param methodName The name of the function or method being called.
   * @param args An object containing the arguments passed to the method.
   * @param result The result returned by the method.
   *
   * @example
   * ```ts
   * function add (a: number, b: number): number {
   *   const result = a + b;
   *   logger.logMethodFull?.('add', {a, b}, result);
   *   return result;
   * }
   * ```
   */
  logMethodFull?(methodName: string, args: unknown, result: unknown): void;

  /**
   * Logs an event or expected incident using `console.log`. Intended for noteworthy information that doesn't represent an error or warning.
   *
   * @param methodName The name or context of the event or incident.
   * @param warningCode A code or identifier for the specific type of event or incident.
   * @param args Additional details or context related to the event or incident.
   *
   * @example
   * ```ts
   * logger.incident?.('fetch', 'abort_signal', {url: '/test.json'});
   * ```
   */
  incident?(methodName: string, warningCode: string, ...args: unknown[]): void;

  /**
   * Logs an unexpected incident or handled error as a warning using `console.warn`.
   * Indicates a potential issue that has been addressed but warrants attention.
   *
   * @param methodName The name or context of the incident or error.
   * @param warningCode A code or identifier for the specific type of incident or error.
   * @param args Additional details or context related to the incident or error.
   *
   * @example
   * ```ts
   * logger.accident('fetch', 'file_not_found', {url: '/test.json'});
   * ```
   */
  accident(methodName: string, warningCode: string, ...args: unknown[]): void;

  /**
   * Logs an unexpected error using `console.error`. Highlights critical issues that need to be addressed.
   *
   * @param methodName The name or context where the error occurred.
   * @param errorCode A code or identifier for the specific type of error.
   * @param args Additional details or context related to the error, including the error object itself.
   *
   * @example
   * ```ts
   * try {
   *   ...
   * }
   * catch (err) {
   *   logger.error('myMethod', 'error_code', err, {a: 1, b: 2});
   * }
   * ```
   */
  error(methodName: string, errorCode: string, ...args: unknown[]): void;

  /**
   * Performs a simple `console.debug` log with styled scope for general debugging purposes.
   *
   * @param args Any number of arguments to be logged.
   *
   * @example
   * ```ts
   * logger.logOther?.('foo:', 'bar', {a: 1});
   * ```
   */
  logOther?(...args: unknown[]): void;

  /**
   * Try to construct a table with the columns of the properties of `tabularData` (or use `properties`)
   * and rows of `tabularData` and log it.
   * Falls back to just logging the argument if it can't be parsed as tabular.
   * @param tabularData Any data that can be represented in tabular form.
   * @param properties Alternate properties for constructing the table.
   */
  logTable?(tabularData: unknown, properties?: readonly string[]): void;

  /**
   * Starts a timer with a specified label using `console.time`. Useful for measuring performance.
   *
   * @param label The label for the timer.
   *
   * @example
   * ```ts
   * logger.time?.('foo');
   * ```
   */
  time?(label: string): void;

  /**
   * Ends a timer with a specified label and logs the elapsed time using `console.timeEnd`.
   *
   * @param label The label for the timer.
   *
   * @example
   * ```ts
   * logger.timeEnd?.('foo');
   * ```
   */
  timeEnd?(label: string): void;

  /**
   * Logs a prominent banner message, typically used for displaying important announcements or version information.
   *
   * @param message The message to be displayed in the banner.
   *
   * @example
   * ```ts
   * logger.banner('Alwatr PWA v2');
   * ```
   */
  banner(message: string): void;
}
