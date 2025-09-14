import type {} from '@alwatr/type-helper';

/**
 * A single configuration object for creating a Debouncer.
 * This groups all settings for a cleaner API.
 * 
 * Key notes:
 * - `leading` and `trailing` control execution timing: leading executes immediately on first trigger, trailing after delay.
 * - If both are true, execution happens on first trigger and last trigger (after delay).
 * - `thisContext` ensures the `func` is bound to the correct `this` value, useful in class methods or event handlers.
 * - `delay` must be a positive number.
 */
export interface DebouncerConfig<F extends AnyFunction> {
  /**
   * The function to be executed after the delay.
   * Can be any function type, with type safety enforced by generics.
   */
  func: F;

  /**
   * The `this` context to be used when invoking the func.
   * If provided, it will be stored and used for all invocations.
   * Omit if the func doesn't rely on `this` or uses arrow functions.
   */
  thisContext?: ThisParameterType<F>;

  /**
   * The delay in milliseconds before the function is executed.
   * Must be a positive integer; affects performance and responsiveness.
   */
  delay: number;

  /**
   * The maximum time the `func` is allowed to be delayed before it's invoked.
   * This is useful for guaranteeing execution of a function that's continuously triggered.
   * If set, the function will be called after `maxWait` milliseconds, even if triggers are still occurring.
   */
  maxWait?: number;

  /**
   * If `true`, the function is called on the leading edge of the timeout.
   * Useful for immediate feedback (e.g., button press).
   * @default false
   */
  leading?: boolean;

  /**
   * If `true`, the function is called on the trailing edge of the timeout.
   * Ensures the last call is executed after inactivity.
   * @default true
   */
  trailing?: boolean;
}