/**
 * Array of callback functions to be called when the process is exiting.
 */
let callbacks: (() => void)[] | null = null;

/**
 * True whether the process is exiting to prevent calling the callbacks more than once.
 */
let exiting = false;

/**
 * Add a callback function to be called when the process is exiting.
 *
 * @param callback The callback function to be called when the process is exiting.
 *
 * @example
 * ```typescript
 * const saveAllData = () => {
 *   // save all data
 * };
 *
 * existHook(saveAllData);
 * ```
 */
export function exitHook(callback: () => void): void {
  if (callbacks === null) {
    registerExitEvents();
    callbacks = [];
  }
  callbacks.push(callback);
}

/**
 * A once callback to be called on process exit event.
 */
function onExit_(signal: number | 'SIGINT' | 'SIGTERM') {
  console.log('onExit({signal: %s})', signal);
  if (exiting === true || callbacks === null) return;

  exiting = true;

  for (const callback of callbacks) {
    try {
      callback();
    } catch (error) {
      console.error('Error in exit hook callback:', error);
    }
  }

  if (signal === 'SIGINT' || signal === 'SIGTERM') {
    setTimeout(() => {
      process.exit(0);
    });
  }
}

/**
 * Register process exit events.
 */
function registerExitEvents(): void {
  /**
   * This event emitted when Node.js empties its event loop and has no additional work to schedule.
   * Normally, the Node.js process will exit when there is no work scheduled,
   * but a listener registered on the 'beforeExit' event can make **asynchronous calls**, and thereby cause the Node.js process to continue.
   *
   * @see https://nodejs.org/api/process.html#event-beforeexit
   */
  // process.once('beforeExit', onExit_);

  /**
   * This event is emitted when the Node.js process is about to exit as a result of either:
   * 1- The `process.exit()` method being called explicitly.
   * 2- The Node.js event loop no longer having any additional work to perform.
   *
   * @see https://nodejs.org/api/process.html#event-exit
   */
  process.once('exit', onExit_);

  /**
   * This event is emitted in terminal mode before exiting with code 128 + signal number.
   *
   * @see https://nodejs.org/api/process.html#signal-events
   */
  process.once('SIGTERM', onExit_);

  /**
   * This event is emitted when `Ctrl+C` is pressed.
   *
   * @see https://nodejs.org/api/process.html#signal-events
   */
  process.once('SIGINT', onExit_);
}
