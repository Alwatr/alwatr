import type {DebouncerConfig} from './type.ts';

/**
 * A powerful and type-safe Debouncer class.
 *
 * It encapsulates the debouncing logic, state, and provides a rich control API.
 * Debouncing delays function execution until after a specified delay has passed since the last invocation.
 * Useful for optimizing performance in scenarios like search inputs, resize events, or API calls.
 *
 * @example
 * ```typescript
 * const debouncer = new Debouncer({
 *   func: (text: string) => console.log('Searching:', text),
 *   delay: 300,
 *   leading: false,
 *   trailing: true,
 * });
 *
 * // Debounce search input
 * debouncer.trigger('hello');
 * debouncer.trigger('hello world'); // Only 'hello world' will log after 300ms
 *
 * // Advanced: With leading edge
 * const leadingDebouncer = new Debouncer({
 *   func: () => console.log('Immediate and delayed'),
 *   delay: 500,
 *   leading: true,
 *   trailing: true,
 * });
 * leadingDebouncer.trigger(); // Logs immediately, then again after 500ms if not cancelled
 * ```
 */
export class Debouncer<F extends AnyFunction> {
  private timerId__?: number | NodeJS.Timeout;
  private maxWaitTimerId__?: number | NodeJS.Timeout;
  private lastArgs__?: Parameters<F>;

  public constructor(private readonly config__: DebouncerConfig<F>) {
    this.config__.trailing ??= true;
  }

  /**
   * Checks if there is a pending execution scheduled.
   * Returns true if a timer is active, indicating a debounced call is waiting.
   */
  public get isPending(): boolean {
    return this.timerId__ !== undefined;
  }

  /**
   * Triggers the debounced function with the stored `thisContext`.
   * @param args The arguments to pass to the `func`.
   *
   * @example
   * ```typescript
   * const debouncer = new Debouncer({
   *   func: (value: number) => console.log('Value:', value),
   *   delay: 500,
   * });
   * debouncer.trigger(42); // Logs after 500ms if not triggered again
   *
   * // Edge case: Rapid triggers only execute the last one
   * debouncer.trigger(1);
   * debouncer.trigger(2); // Only 2 will execute after delay
   * ```
   */
  public trigger(...args: Parameters<F>): void {
    this.lastArgs__ = args; // its an array even if triggered without any args
    const firstTrigger = !this.isPending;

    if (firstTrigger) {
      if (this.config__.maxWait) {
        this.maxWaitTimerId__ = setTimeout(() => this.flush, this.config__.maxWait);
      }
      if (this.config__.leading === true) {
        this.invoke__();
      }
    }
    else {
      clearTimeout(this.timerId__!);
    }

    this.timerId__ = setTimeout(() => {
      if (this.config__.trailing === true) {
        this.invoke__();
      }
      this.cleanup__();
    }, this.config__.delay);
  }

  /**
   * Cancels any pending debounced execution and cleans up internal state.
   * Useful for stopping execution when the operation is no longer needed (e.g., component unmount).
   *
   * @example
   * ```typescript
   * const debouncer = new Debouncer({
   *   func: () => console.log('Executed'),
   *   delay: 1000,
   * });
   * debouncer.trigger();
   * debouncer.cancel(); // Prevents execution
   *
   * // Note: After cancel, isPending becomes false
   * ```
   */
  public cancel(): void {
    if (this.timerId__) {
      clearTimeout(this.timerId__);
    }
    if (this.maxWaitTimerId__) {
      clearTimeout(this.maxWaitTimerId__);
    }
    this.cleanup__();
  }

  /**
   * Cleans up internal state by deleting timer and arguments.
   */
  private cleanup__(): void {
    delete this.timerId__;
    delete this.maxWaitTimerId__;
    delete this.lastArgs__;
  }

  /**
   * Immediately executes the pending function if one exists.
   * Bypasses the delay and cleans up state. If no pending call, does nothing.
   *
   * @example
   * ```typescript
   * const debouncer = new Debouncer({
   *   func: () => console.log('Flushed'),
   *   delay: 1000,
   * });
   * debouncer.trigger();
   * setTimeout(() => debouncer.flush(), 500); // Executes immediately
   *
   * // Edge case: Flush after cancel does nothing
   * debouncer.cancel();
   * debouncer.flush(); // No execution
   * ```
   */
  public flush(): void {
    if (this.isPending) {
      this.invoke__();
    }
    this.cancel();
  }

  /**
   * The core execution logic.
   */
  private invoke__(): void {
    if (this.lastArgs__) {
      // only call if we have new args (skip trailing call if leading already called)
      this.config__.func.apply(this.config__.thisContext, this.lastArgs__);
      this.lastArgs__ = undefined;
    }
  }
}
