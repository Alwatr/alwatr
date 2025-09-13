import type {DebouncerConfig} from './type.ts';

/**
 * A powerful and type-safe Debouncer class.
 * 
 * It encapsulates the debouncing logic, state, and provides a rich control API.
 */
export class Debouncer<F extends AnyFunction> {
  private timerId__?: number | NodeJS.Timeout;
  private lastArgs__?: Parameters<F>;

  public constructor(private readonly config__: DebouncerConfig<F>) {
    this.config__.trailing ??= true;
  }

  /**
   * Checks if there is a pending execution scheduled.
   */
  public get isPending(): boolean {
    return this.timerId__ !== undefined;
  }

  /**
   * Triggers the debounced function with the stored `thisContext`.
   * @param args The arguments to pass to the callback.
   */
  public trigger(...args: Parameters<F>): void {
    this.lastArgs__ = args;
    const wasPending = this.isPending;

    if (wasPending) {
      clearTimeout(this.timerId__!);
    }

    if (this.config__.leading && !wasPending) {
      this.invoke__();
    }

    this.timerId__ = setTimeout(() => {
      if (this.config__.trailing && wasPending) {
        this.invoke__();
      }
      this.cleanup__();
    }, this.config__.delay);
  }

  /**
   * Cancels any pending debounced execution and cleans up internal state.
   */
  public cancel(): void {
    if (this.isPending) {
      clearTimeout(this.timerId__!);
    }
    this.cleanup__();
  }

  /**
   * Cleans up internal state by deleting timer and arguments.
   */
  private cleanup__(): void {
    delete this.timerId__;
    delete this.lastArgs__;
  }

  /**
   * Immediately executes the pending function if one exists.
   */
  public flush(): void {
    if (this.isPending) {
      this.cancel();
      this.invoke__();
    }
  }

  /**
   * The core execution logic.
   */
  private invoke__(): void {
    if (this.lastArgs__) {
      // `thisContext` is now read directly from the stored config.
      this.config__.callback.apply(this.config__.thisContext, this.lastArgs__);
    }
  }
}

/**
 * Factory function for creating a Debouncer instance for better type inference.
 * @param config Configuration for the debouncer.
 */
export function createDebouncer<F extends AnyFunction>(config: DebouncerConfig<F>): Debouncer<F> {
  return new Debouncer(config);
}
