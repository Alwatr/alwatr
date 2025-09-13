import type {DebounceableFunction, DebouncerOptions} from './type.js';

/**
 * A powerful and type-safe Debouncer class.
 *
 * It encapsulates the debouncing logic, state, and provides a rich control API.
 */
export class Debouncer<F extends Func> {
  private readonly callback__: F;
  private readonly config__: Required<DebouncerOptions>;

  private timerId__: number | null = null;
  private lastArgs__: Parameters<F> | undefined;
  private thisContext__: ThisParameterType<F> | undefined;

  public constructor(callback: F, options: DebouncerOptions) {
    this.callback__ = callback;
    // Set default values for options to adhere to KISS principle
    this.config__ = {
      leading: false,
      trailing: true,
      ...options,
    };
  }

  /**
   * Triggers the debounced function.
   * The actual execution will be delayed based on the provided options.
   * @param thisContext The `this` context for the callback.
   * @param args The arguments to pass to the callback.
   */
  trigger(thisContext: ThisParameterType<F>, ...args: Parameters<F>): void {
    this.lastArgs__ = args;
    this.thisContext__ = thisContext;

    const isRunning = this.timerId__ !== null;

    // Clear previous timer to reset the delay
    if (isRunning) {
      clearTimeout(this.timerId__!);
    }

    // Handle `leading` edge call
    if (this.config__.leading && !isRunning) {
      this._invoke();
    }

    // Set new timer for `trailing` edge call
    this.timerId__ = window.setTimeout(() => {
      // If leading was true, we don't want to call it again on trailing edge
      // unless there were more calls during the wait period.
      if (this.config__.trailing && isRunning) {
        this._invoke();
      }
      this.timerId__ = null;
    }, this.config__.delay);
  }

  /**
   * Cancels any pending debounced execution.
   */
  cancel(): void {
    if (this.timerId__ !== null) {
      clearTimeout(this.timerId__);
      this.timerId__ = null;
    }
  }

  /**
   * Immediately executes the pending function if one exists.
   */
  flush(): void {
    if (this.isPending()) {
      this.cancel();
      this._invoke();
    }
  }

  /**
   * Checks if there is a pending execution scheduled.
   * @returns `true` if a function execution is pending.
   */
  isPending(): boolean {
    return this.timerId__ !== null;
  }

  /**
   * The core execution logic.
   */
  private _invoke(): void {
    if (this.lastArgs__ && this.thisContext__) {
      this.callback__.apply(this.thisContext__, this.lastArgs__);
    }
  }
}

/**
 * Factory function for creating a Debouncer instance for better type inference.
 * @param callback The function to debounce.
 * @param options Configuration for the debouncer.
 */
export function createDebouncer<F extends DebounceableFunction<F>>(callback: F, options: DebouncerOptions): Debouncer<F> {
  return new Debouncer(callback, options);
}
